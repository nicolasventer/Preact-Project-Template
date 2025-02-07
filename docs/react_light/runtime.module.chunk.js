var Se=Object.defineProperty;var be=(e,t,n)=>t in e?Se(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var te=(e,t,n)=>be(e,typeof t!="symbol"?t+"":t,n);import{_ as Z,a as we,b as Ee,r as N,d as b,c as fe,E as T,w as _e}from"./index.js";const $e=(e,t,n)=>{const r=e[t];return r?typeof r=="function"?r():Promise.resolve(r):new Promise((f,u)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(u.bind(null,new Error("Unknown variable dynamic import: "+t+(t.split("/").length!==n?". Note that variables only represent file names one level deep.":""))))})},Ae=e=>e.default,je=()=>Z(()=>import("./Users.chunk.js"),[],import.meta.url).then(Ae);let M=[];const O=()=>M.length?Promise.resolve(M):je().then(e=>M=e),D=e=>({data:e,error:null,response:new Response,status:200,headers:void 0}),I=e=>({data:null,error:{value:e,status:404},response:new Response,status:404,headers:void 0}),De=e=>e,Le={en:{test:{dynamic_english:"Mocked dynamic_english"}},fr:{test:{dynamic_english:"francais_dynamique fictif"}}},ke={status:{get:()=>Promise.resolve(D("Server is mocked"))},"dyn-dict":({language:e})=>({get:()=>Promise.resolve(D(Le[e]))}),user:Object.assign(({email:e})=>({get:()=>O().then(t=>{const n=t.find(r=>r.email===e);return n?D(n):I("User not found")}),delete:()=>O().then(t=>{const n=t.findIndex(r=>r.email===e);return n===-1?I("User not found"):(t.splice(n,1),D("User deleted"))})}),De({post:e=>O().then(t=>t.find(r=>r.email===e.email)?I("User already exists"):(t.push(e),D(e))),put:e=>O().then(t=>{const n=t.findIndex(r=>r.email===e.email);return n===-1?I("User not found"):(t[n]=e,D(e))})})),users:{get:()=>O().then(e=>D(e)),find:{post:e=>O().then(t=>{if(!e)return D(t);const n=t.filter(r=>!(e.name&&r.name!==e.name||e.email&&r.email!==e.email||e.permissions&&!e.permissions.every(f=>r.permissions.includes(f))));return D(n)})}}},xe=3e3,Re="localhost",Oe=`http://${Re}:${xe}`;var J=class extends Error{constructor(t,n){super(n+""),this.status=t,this.value=n}},Pe=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,Ce=/(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT(?:\+|-)\d{4}\s\([^)]+\)/,Ne=/^(?:(?:(?:(?:0?[1-9]|[12][0-9]|3[01])[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:19|20)\d{2})|(?:(?:19|20)\d{2}[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:0?[1-9]|[12][0-9]|3[01]))))(?:\s(?:1[012]|0?[1-9]):[0-5][0-9](?::[0-5][0-9])?(?:\s[AP]M)?)?$/,Te=e=>e.trim().length!==0&&!Number.isNaN(Number(e)),ce=e=>{if(typeof e!="string")return null;let t=e.replace(/"/g,"");if(Pe.test(t)||Ce.test(t)||Ne.test(t)){let n=new Date(t);if(!Number.isNaN(n.getTime()))return n}return null},Ue=e=>{let t=e.charCodeAt(0),n=e.charCodeAt(e.length-1);return t===123&&n===125||t===91&&n===93},Ie=e=>JSON.parse(e,(t,n)=>ce(n)||n),z=e=>{if(!e)return e;if(Te(e))return+e;if(e==="true")return!0;if(e==="false")return!1;let t=ce(e);if(t)return t;if(Ue(e))try{return Ie(e)}catch{}return e},Fe=e=>{let t=e.data.toString();return t==="null"?null:z(t)},qe=class{constructor(e){te(this,"ws");this.url=e,this.ws=new WebSocket(e)}send(e){return Array.isArray(e)?(e.forEach(t=>this.send(t)),this):(this.ws.send(typeof e=="object"?JSON.stringify(e):e.toString()),this)}on(e,t,n){return this.addEventListener(e,t,n)}off(e,t,n){return this.ws.removeEventListener(e,t,n),this}subscribe(e,t){return this.addEventListener("message",e,t)}addEventListener(e,t,n){return this.ws.addEventListener(e,r=>{if(e==="message"){let f=Fe(r);t({...r,data:f})}else t(r)},n),this}removeEventListener(e,t,n){return this.off(e,t,n),this}close(){return this.ws.close(),this}},Me=["get","post","put","delete","patch","options","head","connect","subscribe"],de=["localhost","127.0.0.1","0.0.0.0"],Q=typeof FileList>"u",ne=e=>Q?e instanceof Blob:e instanceof FileList||e instanceof File,Je=e=>{if(!e)return!1;for(let t in e)if(ne(e[t])||Array.isArray(e[t])&&e[t].find(ne))return!0;return!1},H=e=>Q?e:new Promise(t=>{let n=new FileReader;n.onload=()=>{let r=new File([n.result],e.name,{lastModified:e.lastModified,type:e.type});t(r)},n.readAsArrayBuffer(e)}),k=(e,t,n={},r={})=>{if(Array.isArray(e)){for(let f of e)if(!Array.isArray(f))r=k(f,t,n,r);else{let u=f[0];if(typeof u=="string")r[u.toLowerCase()]=f[1];else for(let[s,l]of u)r[s.toLowerCase()]=l}return r}if(!e)return r;switch(typeof e){case"function":if(e instanceof Headers)return k(e,t,n,r);let f=e(t,n);return f?k(f,t,n,r):r;case"object":if(e instanceof Headers)return e.forEach((u,s)=>{r[s.toLowerCase()]=u}),r;for(let[u,s]of Object.entries(e))r[u.toLowerCase()]=s;return r;default:return r}};async function*He(e){let t=e.body;if(!t)return;let n=t.getReader(),r=new TextDecoder;try{for(;;){let{done:f,value:u}=await n.read();if(f)break;let s=r.decode(u);yield z(s)}}finally{n.releaseLock()}}var C=(e,t,n=[],r)=>new Proxy(()=>{},{get(f,u){return C(e,t,u==="index"?n:[...n,u],r)},apply(f,u,[s,l]){if(!s||l||typeof s=="object"&&Object.keys(s).length!==1||Me.includes(n.at(-1))){let d=[...n],v=d.pop(),i="/"+d.join("/"),{fetcher:a=fetch,headers:p,onRequest:h,onResponse:A,fetch:E}=t,_=v==="get"||v==="head"||v==="subscribe";p=k(p,i,l);let X=_?s==null?void 0:s.query:l==null?void 0:l.query,U="";if(X){let o=(j,$)=>{U+=(U?"&":"?")+`${encodeURIComponent(j)}=${encodeURIComponent($)}`};for(let[j,$]of Object.entries(X)){if(Array.isArray($)){for(let y of $)o(j,y);continue}if(typeof $=="object"){o(j,JSON.stringify($));continue}o(j,`${$}`)}}if(v==="subscribe"){let o=e.replace(/^([^]+):\/\//,e.startsWith("https://")?"wss://":e.startsWith("http://")||de.find(j=>e.includes(j))?"ws://":"wss://")+i+U;return new qe(o)}return(async()=>{var ee;let o={method:v==null?void 0:v.toUpperCase(),body:s,...E,headers:p};o.headers={...p,...k(_?s==null?void 0:s.headers:l==null?void 0:l.headers,i,o)};let j=_&&typeof s=="object"?s.fetch:l==null?void 0:l.fetch;if(o={...o,...j},_&&delete o.body,h){Array.isArray(h)||(h=[h]);for(let m of h){let c=await m(i,o);typeof c=="object"&&(o={...o,...c,headers:{...o.headers,...k(c.headers,i,o)}})}}if(_&&delete o.body,Je(s)){let m=new FormData;for(let[c,S]of Object.entries(o.body)){if(Q){m.append(c,S);continue}if(S instanceof File){m.append(c,await H(S));continue}if(S instanceof FileList){for(let L=0;L<S.length;L++)m.append(c,await H(S[L]));continue}if(Array.isArray(S)){for(let L=0;L<S.length;L++){let q=S[L];m.append(c,q instanceof File?await H(q):q)}continue}m.append(c,S)}o.body=m}else typeof s=="object"?(o.headers["content-type"]="application/json",o.body=JSON.stringify(s)):s!=null&&(o.headers["content-type"]="text/plain");if(_&&delete o.body,h){Array.isArray(h)||(h=[h]);for(let m of h){let c=await m(i,o);typeof c=="object"&&(o={...o,...c,headers:{...o.headers,...k(c.headers,i,o)}})}}let $=e+i+U,y=await((r==null?void 0:r.handle(new Request($,o)))??a($,o)),g=null,P=null;if(A){Array.isArray(A)||(A=[A]);for(let m of A)try{let c=await m(y.clone());if(c!=null){g=c;break}}catch(c){c instanceof J?P=c:P=new J(422,c);break}}if(g!==null)return{data:g,error:P,response:y,status:y.status,headers:y.headers};switch((ee=y.headers.get("Content-Type"))==null?void 0:ee.split(";")[0]){case"text/event-stream":g=He(y);break;case"application/json":g=await y.json();break;case"application/octet-stream":g=await y.arrayBuffer();break;case"multipart/form-data":let m=await y.formData();g={},m.forEach((c,S)=>{g[S]=c});break;default:g=await y.text().then(z)}return(y.status>=300||y.status<200)&&(P=new J(y.status,g),g=null),{data:g,error:P,response:y,status:y.status,headers:y.headers}})()}return typeof s=="object"?C(e,t,[...n,Object.values(s)[0]],r):C(e,t,n)}}),Ve=(e,t={})=>typeof e=="string"?(t.keepDomain||(e.includes("://")||(e=(de.find(n=>e.includes(n))?"http://":"https://")+e),e.endsWith("/")&&(e=e.slice(0,-1))),C(e,t)):(typeof window<"u"&&console.warn("Elysia instance server found on client side, this is not recommended for security reason. Use generic type instead."),C("http://e.ly",t,[],e));const We=we.isMockEnabled?ke:Ve(Oe).api;var V={exports:{}},W={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var re;function Ge(){if(re)return W;re=1;var e=Ee();function t(a,p){return a===p&&(a!==0||1/a===1/p)||a!==a&&p!==p}var n=typeof Object.is=="function"?Object.is:t,r=e.useState,f=e.useEffect,u=e.useLayoutEffect,s=e.useDebugValue;function l(a,p){var h=p(),A=r({inst:{value:h,getSnapshot:p}}),E=A[0].inst,_=A[1];return u(function(){E.value=h,E.getSnapshot=p,d(E)&&_({inst:E})},[a,h,p]),f(function(){return d(E)&&_({inst:E}),a(function(){d(E)&&_({inst:E})})},[a]),s(h),h}function d(a){var p=a.getSnapshot;a=a.value;try{var h=p();return!n(a,h)}catch{return!0}}function v(a,p){return p()}var i=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?v:l;return W.useSyncExternalStore=e.useSyncExternalStore!==void 0?e.useSyncExternalStore:i,W}var se;function Be(){return se||(se=1,V.exports=Ge()),V.exports}var pe=Be(),Ze=N.version.split(".").map(Number)[0],Ke=[],Ye=Symbol.for(Ze>=19?"react.transitional.element":"react.element"),x,he=Symbol.dispose||Symbol.for("Symbol.dispose");function G(e,t){var n=t.effect.S();return x=t,ze.bind(t,e,n)}function ze(e,t){t(),x=e}var ie,K,oe=function(){},Qe=((ie={o:0,effect:{s:void 0,c:function(){},S:function(){return oe},d:function(){}},subscribe:function(){return oe},getSnapshot:function(){return 0},S:function(){},f:function(){}})[he]=function(){},ie),Xe=Promise.prototype.then.bind(Promise.resolve());function et(){K||(K=Xe(tt))}function tt(){var e;K=void 0,(e=x)==null||e.f()}function nt(e){et();var t=N.useRef();t.current==null&&(typeof window>"u"?t.current=Qe:t.current=function(r){var f,u,s,l,d=0,v=T(function(){u=this});return u.c=function(){d=d+1|0,l&&l()},(f={o:r,effect:u,subscribe:function(i){return l=i,function(){d=d+1|0,l=void 0,v()}},getSnapshot:function(){return d},S:function(){if(x!=null){var i=x.o,a=this.o;i==0&&a==0||i==0&&a==1?(x.f(),s=G(void 0,this)):i==1&&a==0||i==2&&a==0||(s=G(x,this))}else s=G(void 0,this)},f:function(){var i=s;s=void 0,i==null||i()}})[he]=function(){this.f()},f}(e));var n=t.current;return pe.useSyncExternalStore(n.subscribe,n.getSnapshot,n.getSnapshot),n.S(),n}Object.defineProperties(fe.prototype,{$$typeof:{configurable:!0,value:Ye},type:{configurable:!0,value:function(e){var t=e.data,n=nt(1);try{return t.value}finally{n.f()}}},props:{configurable:!0,get:function(){return{data:this}}},ref:{configurable:!0,value:null}});function yt(e){return N.useMemo(function(){return b(e)},Ke)}const ye="template_globalState",me={en:{test:{}},fr:{test:{}}},rt=()=>{const e=JSON.parse(localStorage.getItem(ye)??"{}");return{colorScheme:b(e.colorScheme??"dark"),language:b(e.language??"en"),isConsoleDisplayed:b(e.isConsoleDisplayed??!1),consoleHeight:b(e.consoleHeight??300),logList:b([]),logToSeeCount:b(0),tr:b({}),trDynDict:b(me),isWakeLock:b(!1)}},F=rt(),w=F,mt={get v(){return w.tr.value}},vt=e=>t=>{var n,r;return((r=(n=w.trDynDict.value[w.language.value])==null?void 0:n[e])==null?void 0:r[t])??t},ae=b(!1);T(()=>(ae.value=!0,void Promise.all([$e(Object.assign({"./tr/en.js":()=>Z(()=>import("./en.chunk.js"),[],import.meta.url),"./tr/fr.js":()=>Z(()=>import("./fr.chunk.js"),[],import.meta.url)}),`./tr/${w.language.value}.js`,3),We["dyn-dict"]({language:w.language.value}).get().catch(()=>({data:me.en}))]).then(([{default:e},t])=>{F.tr.value=e,F.trDynDict.value={...F.trDynDict.value,[w.language.value]:t.data},ae.value=!1})));const st=_e(()=>({colorScheme:w.colorScheme.value,language:w.language.value,isConsoleDisplayed:w.isConsoleDisplayed.value,consoleHeight:w.consoleHeight.value}));T(()=>localStorage.setItem(ye,JSON.stringify(st.value)));T(()=>void document.body.classList.toggle("dark",w.colorScheme.value==="dark"));var it=N.version.split(".").map(Number)[0],ot=Symbol.for(it>=19?"react.transitional.element":"react.element"),R,ve=Symbol.dispose||Symbol.for("Symbol.dispose");function B(e,t){var n=t.effect.S();return R=t,at.bind(t,e,n)}function at(e,t){t(),R=e}var ue,Y,le=function(){},ut=((ue={o:0,effect:{s:void 0,c:function(){},S:function(){return le},d:function(){}},subscribe:function(){return le},getSnapshot:function(){return 0},S:function(){},f:function(){}})[ve]=function(){},ue),lt=Promise.prototype.then.bind(Promise.resolve());function ft(){Y||(Y=lt(ct))}function ct(){var e;Y=void 0,(e=R)==null||e.f()}function ge(e){ft();var t=N.useRef();t.current==null&&(typeof window>"u"?t.current=ut:t.current=function(r){var f,u,s,l,d=0,v=T(function(){u=this});return u.c=function(){d=d+1|0,l&&l()},(f={o:r,effect:u,subscribe:function(i){return l=i,function(){d=d+1|0,l=void 0,v()}},getSnapshot:function(){return d},S:function(){if(R!=null){var i=R.o,a=this.o;i==0&&a==0||i==0&&a==1?(R.f(),s=B(void 0,this)):i==1&&a==0||i==2&&a==0||(s=B(R,this))}else s=B(void 0,this)},f:function(){var i=s;s=void 0,i==null||i()}})[ve]=function(){this.f()},f}(e));var n=t.current;return pe.useSyncExternalStore(n.subscribe,n.getSnapshot,n.getSnapshot),n.S(),n}Object.defineProperties(fe.prototype,{$$typeof:{configurable:!0,value:ot},type:{configurable:!0,value:function(e){var t=e.data,n=ge(1);try{return t.value}finally{n.f()}}},props:{configurable:!0,get:function(){return{data:this}}},ref:{configurable:!0,value:null}});function gt(e){return ge(e)}export{vt as a,F as g,ae as i,gt as k,mt as t,yt as u};
