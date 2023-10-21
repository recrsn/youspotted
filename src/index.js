(function () {
    const progress = document.querySelector('.progress-bar');
    document.querySelectorAll('a[data-swap]')
        .forEach(a => a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.dataset.swap);

            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', e => {
                switch (request.readyState) {
                    case 1:
                        progress.style.transform = 'scaleX(.25)';
                        break;
                    case 2:
                        progress.style.transform = 'scaleX(.5)'
                        break;
                    case 3:
                        progress.style.transform = 'scaleX(.75)'
                        break;
                    case 4:
                        if (request.status === 200) {
                            progress.style.transform = 'scaleX(1)';
                            let responseDocument = new DOMParser().parseFromString(request.responseText, 'text/html');
                            target.innerHTML = responseDocument.querySelector(a.dataset.swap).innerHTML;
                            document.title = responseDocument.title;

                            history.pushState({}, '', a.href);

                            setTimeout(() => {
                                progress.style.transform = 'scaleX(0)';
                            }, 500);
                        } else {
                            target.innerHTML = `<h1>Error ${request.status}</h1>`;
                        }
                        break;
                    default:
                        break;

                }


            })
            request.addEventListener('progress', e => {
                if (e.lengthComputable) {
                    progress.style.transform = `scaleX(${0.75 + ((e.loaded / e.total) * 0.25)})`;
                }
            });
            request.open('GET', a.href);
            request.send();
        }));
})();