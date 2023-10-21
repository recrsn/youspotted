const progress = document.querySelector<HTMLDivElement>('.progress-bar');

if (progress) {

  document.querySelectorAll<HTMLAnchorElement>('a[data-swap]')
    .forEach(a => a.addEventListener('click', e => {
      if (!a.dataset.swap) {
        return;
      }

      const swapTarget = a.dataset.swap!;

      e.preventDefault();

      const target = document.querySelector(swapTarget) as HTMLElement;

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
              target.innerHTML = (responseDocument.querySelector(swapTarget) as HTMLElement).innerHTML;
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
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
  })
}


export function render() {
  // We do nothing here, because we just use SSG without any CSR
}
