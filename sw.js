/* MCQ Master service worker: makes the app installable and fully usable offline.
   - App files (html/css/js): network first (so updates arrive), cached copy when offline.
   - Question files (q-*.js): all downloaded once when the app is installed, then served from the cache.
   Deploying new questions: change "v" in q-manifest.js. A new data cache is built and the old one deleted. */
self.window=self;                       // q-manifest.js does window.MANIFEST=...
importScripts('q-manifest.js');
const MAN=self.MANIFEST||{v:0,cats:[],p:'q-'};
const SHELL='mcq-shell-v2',DATA='mcq-data-'+MAN.v;
const SHELL_FILES=['./','index.html','script.js','style.css','q-manifest.js','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png','apple-touch-icon.png'];
function shardUrls(){
 const ks=new Set();(MAN.cats||[]).forEach(c=>c.s.forEach(s=>s.k.forEach(k=>ks.add(k.k))));
 return [...ks].map(k=>(MAN.p===undefined?'data/':MAN.p)+k+'.js?v='+MAN.v);
}
self.addEventListener('install',e=>{
 e.waitUntil((async()=>{
  await (await caches.open(SHELL)).addAll(SHELL_FILES);
  const d=await caches.open(DATA);
  // best effort: one missing question file must not break the install
  await Promise.all(shardUrls().map(u=>d.add(u).catch(()=>{})));
  await self.skipWaiting();
 })());
});
self.addEventListener('activate',e=>{
 e.waitUntil((async()=>{
  for(const k of await caches.keys())if(k.startsWith('mcq-')&&k!==SHELL&&k!==DATA)await caches.delete(k);
  await self.clients.claim();
 })());
});
const isData=u=>{const f=u.pathname.split('/').pop();return f.endsWith('.js')&&f!=='q-manifest.js'&&(MAN.p===undefined?u.pathname.includes('/data/'):f.startsWith(MAN.p))};
async function dataFetch(req,url){
 const c=await caches.open(DATA),hit=await c.match(req);
 if(hit)return hit;
 try{
  const res=await fetch(req);
  if(res.ok&&!url.searchParams.has('r'))c.put(req,res.clone());
  return res;
 }catch(err){
  const any=await c.match(req,{ignoreSearch:true});
  if(any)return any;
  throw err;
 }
}
async function shellFetch(req){
 const c=await caches.open(SHELL),nav=req.mode==='navigate';
 try{
  const res=await Promise.race([fetch(req),new Promise((_,rej)=>setTimeout(()=>rej(new Error('slow')),4000))]);
  if(res&&res.ok)c.put(nav?'index.html':req,res.clone());
  return res;
 }catch(err){
  const hit=await c.match(nav?'index.html':req,{ignoreSearch:true});
  if(hit)return hit;
  throw err;
 }
}
self.addEventListener('fetch',e=>{
 const req=e.request;if(req.method!=='GET')return;
 const url=new URL(req.url);if(url.origin!==location.origin)return;
 e.respondWith(isData(url)?dataFetch(req,url):shellFetch(req));
});
