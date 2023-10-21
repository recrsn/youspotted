const chokidar = require('chokidar');
const fs = require('fs').promises;
const path = require('path');
const postcss = require('postcss');
const tailwindcss = require("tailwindcss");
const config = require("./tailwind.config");
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");
const nesting = require("tailwindcss/nesting");
const cssnano = require("cssnano");
const { optimize } = require("svgo");
const mustache = require('mustache');

const context = require('./context');
const workbox = require('workbox-build');


const htmlFiles = [];
const templates = {};

function loadTemplates() {
    return fs.readdir('src/_partials')
}

function dest(path) {
    return path.replace(/^src/, 'build');
}

function templateName(path) {
    return path.replace(/^src\/_partials\//, '').replace(/\.mustache$/, '');
}

async function processTemplate(src) {
    const name = templateName(src);
    console.log(`[TEMPLATE] ${src} -> ${name}`);
    const html = await fs.readFile(src, 'utf-8');
    templates[name] = html;

    await Promise.all(htmlFiles.map((htmlFile) => processHtml(htmlFile, dest(htmlFile))));
}

async function processSvg(src, dest) {
    console.log(`[SVG] ${src} -> ${dest}`);

    const svgoOptions = {
        path: src,
    }

    if (src.startsWith('src/assets/themed')) {
        svgoOptions.plugins = [
            'preset-default',
            {
                name: "addAttributesToSVGElement",
                params: {
                    attributes: [
                        {
                            stroke: "#6366f1",
                        },
                        {
                            fill: "#6366f1",
                        },
                        {
                            color: "#6366f1"
                        }
                    ]
                }
            }
        ]
    }

    const svg = await fs.readFile(src, 'utf-8');
    const result = optimize(svg, svgoOptions);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, result.data);
}


async function processCss(src, dest) {
    console.log(`[CSS] ${src} -> ${dest}`);
    const css = await fs.readFile(src, 'utf-8');
    const result = await postcss([
        tailwindcss(config),
        postcssImport,
        nesting,
        autoprefixer,
        cssnano
    ]).process(css, { from: src, to: dest })
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, result.css);
}

async function processHtml(src, dest) {
    htmlFiles.push(src);

    console.log(`[HTML] ${src} -> ${dest}`);

    const html = await fs.readFile(src, 'utf-8');
    const result = mustache.render(html, context, templates);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, result);
}

async function copy(src, dest) {
    console.log(`[COPY] ${src} -> ${dest}`);
    const parent = path.dirname(dest);
    await fs.mkdir(parent, { recursive: true })
    await fs.copyFile(src, dest);
}

async function processFile(src) {
    const destPath = dest(src);
    if (src.endsWith('.css')) {
        await processCss(src, destPath);
    } else if (src.endsWith('.svg')) {
        await processSvg(src, destPath);
    } else if (src.endsWith('.html')) {
        await processHtml(src, destPath);
        // re-process index.css for Tailwind
        await processCss('src/index.css', 'build/index.css');
    } else if (src.endsWith('.mustache')) {
        await processTemplate(src);
    } else {
        await copy(src, destPath);
    }
}

async function clean() {
    await fs.rm('build', { recursive: true, force: true });
}

async function fsReadDirRecursive(src) {
    const files = [];
    const entries = await fs.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
        const filePath = path.join(src, entry.name);
        if (entry.isDirectory()) {
            files.push(...await fsReadDirRecursive(filePath));
        } else {
            files.push(filePath);
        }
    }
    return files;
}

async function processUnlinked(src) {
    console.log(`[DELETE] ${src}`);

    if (src.endsWith('.mustache')) {
        delete templates[templateName(src)];
        await Promise.all(htmlFiles.map(async (htmlFile) => {
            await processHtml(htmlFile, dest(htmlFile));
        }));
        return
    }

    if (src.endsWith('.html')) {
        htmlFiles.splice(htmlFiles.indexOf(src), 1);
    }
    await fs.unlink(dest(src));
}

loadTemplates().then((files) => {
    Promise.all(files.map(file => processTemplate(`src/_partials/${file}`)));
}).then(async () => {
    if (process.argv[2] === 'watch') {
        console.log('Watching for changes...');
        chokidar.watch('src')
            .on('add', processFile)
            .on('change', processFile)
            .on('unlink', processUnlinked);
    } else {
        await clean();
        const files = await fsReadDirRecursive('src',);
        for (const file of files) {
            await processFile(file);
        }

        console.log('Generating service worker...');

        workbox.generateSW({
            globDirectory: 'build/',
            globPatterns: [
                '**/*.{webp,svg,png,css,html,js}'
            ],
            swDest: 'build/sw.js',
            ignoreURLParametersMatching: [
                /^utm_/,
                /^fbclid$/
            ]
        });

        console.log('Done!');
    }
}).catch(console.error);
