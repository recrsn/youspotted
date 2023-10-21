if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
        .then(function (registration) {
            console.log('Service worker registration succeeded:', registration);
        })
        .catch(function (error) {
            console.log('Service worker registration failed:', error);
        });
}
