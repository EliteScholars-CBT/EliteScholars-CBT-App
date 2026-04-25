// ============================================================================
// EliteScholars Service Worker
// Handles: push notifications (study reminders + challenges), offline cache
// ============================================================================

const CACHE_NAME  = 'elitescholars-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// ── Install ───────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// ── Activate ──────────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch (network-first, cache fallback) ─────────────────────────────────────
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});

// ── Push notifications ────────────────────────────────────────────────────────
self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { title: 'EliteScholars', body: event.data ? event.data.text() : '' };
  }

  const options = {
    body:    data.body    || 'Time to study! 📚',
    icon:    data.icon    || '/android-chrome-192x192.png',
    badge:   data.badge   || '/android-chrome-192x192.png',
    image:   data.image   || null,
    tag:     data.tag     || 'elitescholars',
    renotify: true,
    requireInteraction: data.requireInteraction || false,
    data: {
      url:  data.url  || '/',
      type: data.type || 'general',
      challengerName: data.challengerName || '',
    },
    actions: data.actions || [],
    vibrate: [200, 100, 200],
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'EliteScholars CBT', options)
  );
});

// ── Notification click ────────────────────────────────────────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      // Focus existing window if open
      for (const client of list) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.postMessage({ type: 'NOTIFICATION_CLICK', data: event.notification.data });
          return client.focus();
        }
      }
      // Open new window
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});

// ── Scheduled study reminder (from client) ────────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SHOW_REMINDER') {
    self.registration.showNotification('📚 Study Reminder — EliteScholars', {
      body:    event.data.body || "Don't break your streak! Time for today's practice session.",
      icon:    '/android-chrome-192x192.png',
      badge:   '/android-chrome-192x192.png',
      tag:     'study-reminder',
      renotify: true,
      vibrate: [200, 100, 200],
      data: { url: '/', type: 'reminder' },
    });
  }

  if (event.data?.type === 'SHOW_CHALLENGE') {
    const { challengerName, subject, examType } = event.data;
    self.registration.showNotification('⚔️ New Challenge!', {
      body:    `${challengerName} challenged you to a ${subject} quiz! Can you beat their score?`,
      icon:    '/android-chrome-192x192.png',
      badge:   '/android-chrome-192x192.png',
      tag:     'challenge-' + challengerName,
      renotify: true,
      requireInteraction: true,
      vibrate: [300, 100, 300, 100, 300],
      data: { url: '/', type: 'challenge', challengerName },
      actions: [
        { action: 'accept',  title: '⚔️ Accept Challenge' },
        { action: 'dismiss', title: 'Later' },
      ],
    });
  }
});
