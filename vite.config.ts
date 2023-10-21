import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import { UserConfig } from 'vite'
import svgr from "vite-plugin-svgr";
import { VitePWA } from 'vite-plugin-pwa'


const config: UserConfig = {
  plugins: [
    react(),
    svgr(),
    vike({ prerender: true }),
    VitePWA({ registerType: 'autoUpdate' })
  ]
}

export default config
