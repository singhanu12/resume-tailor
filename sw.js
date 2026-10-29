const C='rt-v5',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||u.host==='generativelanguage.googleapis.com')return;
 const same=u.origin===location.origin,cdn=/cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net/.test(u.host);if(!same&&!cdn)return;
 const put=n=>{if(n.ok){const c=n.clone();caches.open(C).then(x=>x.put(r,c))}return n};
 e.respondWith(same?fetch(r,{cache:'no-cache'}).then(put).catch(()=>caches.match(r,{ignoreSearch:true}).then(h=>h||caches.match('index.html')))
  :caches.match(r).then(h=>h||fetch(r).then(put)))});
