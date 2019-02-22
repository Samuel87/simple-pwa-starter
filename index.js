// Register service worker to control making site work offline
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then(function() { console.log('Service Worker Registered'); });
}

window.addEventListener('online', function(e) {
    // re-sync data with server
    console.log("You went online");
}, false);

window.addEventListener('offline', function(e) {
    // queue up events for server
    console.log("You went offline");
}, false);

if (navigator.onLine) {
    console.log('you are online')
} else {
    console.log('you are offline')
}

// Handle install prompt on desktop
let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    addBtn.style.display = 'block';

    addBtn.addEventListener('click', (e) => {
        addBtn.style.display = 'none';
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choice) => {
            if (choice.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }

            deferredPrompt = null;
        });
    });
});
