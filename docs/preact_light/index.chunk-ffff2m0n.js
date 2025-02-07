import{y as G}from"./index.chunk-dabrcv1f.js";import{M as d,N as g,O as P}from"./index.chunk-rnr8y5f9.js";import{X as ie,_ as ne}from"./index.chunk-w7btrm6m.js";var ae=(e)=>e.default,fe=()=>import("./data/Users.chunk-rqy1y6f9.js").then(ae),H=[],F=()=>H.length?Promise.resolve(H):fe().then((e)=>H=e),m=(e)=>({data:e,error:null,response:new Response,status:200,headers:void 0}),B=(e)=>({data:null,error:{value:e,status:404},response:new Response,status:404,headers:void 0}),oe=(e)=>e,le={en:{test:{dynamic_english:"Mocked dynamic_english"}},fr:{test:{dynamic_english:"francais_dynamique fictif"}}},Q={status:{get:()=>Promise.resolve(m("Server is mocked"))},"dyn-dict":({language:e})=>({get:()=>Promise.resolve(m(le[e]))}),user:Object.assign(({email:e})=>({get:()=>F().then((t)=>{let r=t.find((s)=>s.email===e);if(!r)return B("User not found");return m(r)}),delete:()=>F().then((t)=>{let r=t.findIndex((s)=>s.email===e);if(r===-1)return B("User not found");return t.splice(r,1),m("User deleted")})}),oe({post:(e)=>F().then((t)=>{if(t.find((s)=>s.email===e.email))return B("User already exists");return t.push(e),m(e)}),put:(e)=>F().then((t)=>{let r=t.findIndex((s)=>s.email===e.email);if(r===-1)return B("User not found");return t[r]=e,m(e)})})),users:{get:()=>F().then((e)=>m(e)),find:{post:(e)=>F().then((t)=>{if(!e)return m(t);let r=t.filter((s)=>{if(e.name&&s.name!==e.name)return!1;if(e.email&&s.email!==e.email)return!1;if(e.permissions&&!e.permissions.every((o)=>s.permissions.includes(o)))return!1;return!0});return m(r)})}}};var V="http://localhost:3000";var O=class extends Error{constructor(e,t){super(t+"");this.status=e,this.value=t}},ce=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,he=/(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT(?:\+|-)\d{4}\s\([^)]+\)/,ue=/^(?:(?:(?:(?:0?[1-9]|[12][0-9]|3[01])[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:19|20)\d{2})|(?:(?:19|20)\d{2}[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:0?[1-9]|[12][0-9]|3[01]))))(?:\s(?:1[012]|0?[1-9]):[0-5][0-9](?::[0-5][0-9])?(?:\s[AP]M)?)?$/,de=(e)=>e.trim().length!==0&&!Number.isNaN(Number(e)),X=(e)=>{if(typeof e!="string")return null;let t=e.replace(/"/g,"");if(ce.test(t)||he.test(t)||ue.test(t)){let r=new Date(t);if(!Number.isNaN(r.getTime()))return r}return null},pe=(e)=>{let t=e.charCodeAt(0),r=e.charCodeAt(e.length-1);return t===123&&r===125||t===91&&r===93},ye=(e)=>JSON.parse(e,(t,r)=>{return X(r)||r}),x=(e)=>{if(!e)return e;if(de(e))return+e;if(e==="true")return!0;if(e==="false")return!1;let t=X(e);if(t)return t;if(pe(e))try{return ye(e)}catch{}return e},S=(e)=>{let t=e.data.toString();return t==="null"?null:x(t)};var Le=typeof FileList>"u";var we=class{constructor(e){this.url=e,this.ws=new WebSocket(e)}ws;send(e){return Array.isArray(e)?(e.forEach((t)=>this.send(t)),this):(this.ws.send(typeof e=="object"?JSON.stringify(e):e.toString()),this)}on(e,t,r){return this.addEventListener(e,t,r)}off(e,t,r){return this.ws.removeEventListener(e,t,r),this}subscribe(e,t){return this.addEventListener("message",e,t)}addEventListener(e,t,r){return this.ws.addEventListener(e,(s)=>{if(e==="message"){let o=S(s);t({...s,data:o})}else t(s)},r),this}removeEventListener(e,t,r){return this.off(e,t,r),this}close(){return this.ws.close(),this}},Ae=["get","post","put","delete","patch","options","head","connect","subscribe"],Y=["localhost","127.0.0.1","0.0.0.0"],D=typeof FileList>"u",I=(e)=>D?e instanceof Blob:e instanceof FileList||e instanceof File,me=(e)=>{if(!e)return!1;for(let t in e)if(I(e[t])||Array.isArray(e[t])&&e[t].find(I))return!0;return!1},Z=(e)=>D?e:new Promise((t)=>{let r=new FileReader;r.onload=()=>{let s=new File([r.result],e.name,{lastModified:e.lastModified,type:e.type});t(s)},r.readAsArrayBuffer(e)}),$=(e,t,r={},s={})=>{if(Array.isArray(e)){for(let o of e)if(!Array.isArray(o))s=$(o,t,r,s);else{let c=o[0];if(typeof c=="string")s[c.toLowerCase()]=o[1];else for(let[n,j]of c)s[n.toLowerCase()]=j}return s}if(!e)return s;switch(typeof e){case"function":if(e instanceof Headers)return $(e,t,r,s);let o=e(t,r);return o?$(o,t,r,s):s;case"object":if(e instanceof Headers)return e.forEach((c,n)=>{s[n.toLowerCase()]=c}),s;for(let[c,n]of Object.entries(e))s[c.toLowerCase()]=n;return s;default:return s}};async function*ve(e){let t=e.body;if(!t)return;let r=t.getReader(),s=new TextDecoder;try{for(;;){let{done:o,value:c}=await r.read();if(o)break;let n=s.decode(c);yield x(n)}}finally{r.releaseLock()}}var J=(e,t,r=[],s)=>new Proxy(()=>{},{get(o,c){return J(e,t,c==="index"?r:[...r,c],s)},apply(o,c,[n,j]){if(!n||j||typeof n=="object"&&Object.keys(n).length!==1||Ae.includes(r.at(-1))){let k=[...r],L=k.pop(),v="/"+k.join("/"),{fetcher:re=fetch,headers:W,onRequest:y,onResponse:N,fetch:se}=t,E=L==="get"||L==="head"||L==="subscribe";W=$(W,v,j);let K=E?n?.query:j?.query,q="";if(K){let i=(A,w)=>{q+=(q?"&":"?")+`${encodeURIComponent(A)}=${encodeURIComponent(w)}`};for(let[A,w]of Object.entries(K)){if(Array.isArray(w)){for(let f of w)i(A,f);continue}if(typeof w=="object"){i(A,JSON.stringify(w));continue}i(A,`${w}`)}}if(L==="subscribe"){let i=e.replace(/^([^]+):\/\//,e.startsWith("https://")?"wss://":e.startsWith("http://")||Y.find((A)=>e.includes(A))?"ws://":"wss://")+v+q;return new we(i)}return(async()=>{let i={method:L?.toUpperCase(),body:n,...se,headers:W};i.headers={...W,...$(E?n?.headers:j?.headers,v,i)};let A=E&&typeof n=="object"?n.fetch:j?.fetch;if(i={...i,...A},E&&delete i.body,y){Array.isArray(y)||(y=[y]);for(let l of y){let a=await l(v,i);typeof a=="object"&&(i={...i,...a,headers:{...i.headers,...$(a.headers,v,i)}})}}if(E&&delete i.body,me(n)){let l=new FormData;for(let[a,u]of Object.entries(i.body)){if(D){l.append(a,u);continue}if(u instanceof File){l.append(a,await Z(u));continue}if(u instanceof FileList){for(let b=0;b<u.length;b++)l.append(a,await Z(u[b]));continue}if(Array.isArray(u)){for(let b=0;b<u.length;b++){let U=u[b];l.append(a,U instanceof File?await Z(U):U)}continue}l.append(a,u)}i.body=l}else typeof n=="object"?(i.headers["content-type"]="application/json",i.body=JSON.stringify(n)):n!=null&&(i.headers["content-type"]="text/plain");if(E&&delete i.body,y){Array.isArray(y)||(y=[y]);for(let l of y){let a=await l(v,i);typeof a=="object"&&(i={...i,...a,headers:{...i.headers,...$(a.headers,v,i)}})}}let w=e+v+q,f=await(s?.handle(new Request(w,i))??re(w,i)),h=null,C=null;if(N){Array.isArray(N)||(N=[N]);for(let l of N)try{let a=await l(f.clone());if(a!=null){h=a;break}}catch(a){a instanceof O?C=a:C=new O(422,a);break}}if(h!==null)return{data:h,error:C,response:f,status:f.status,headers:f.headers};switch(f.headers.get("Content-Type")?.split(";")[0]){case"text/event-stream":h=ve(f);break;case"application/json":h=await f.json();break;case"application/octet-stream":h=await f.arrayBuffer();break;case"multipart/form-data":let l=await f.formData();h={},l.forEach((a,u)=>{h[u]=a});break;default:h=await f.text().then(x)}return(f.status>=300||f.status<200)&&(C=new O(f.status,h),h=null),{data:h,error:C,response:f,status:f.status,headers:f.headers}})()}return typeof n=="object"?J(e,t,[...r,Object.values(n)[0]],s):J(e,t,r)}}),z=(e,t={})=>typeof e=="string"?(t.keepDomain||(e.includes("://")||(e=(Y.find((r)=>e.includes(r))?"http://":"https://")+e),e.endsWith("/")&&(e=e.slice(0,-1))),J(e,t)):(typeof window<"u"&&console.warn("Elysia instance server found on client side, this is not recommended for security reason. Use generic type instead."),J("http://e.ly",t,[],e));var _=G.isMockEnabled?Q:z(V).api;var R="template_globalState",ee={en:{test:{}},fr:{test:{}}},te=()=>{let e=JSON.parse(localStorage.getItem(R)??"{}");return{colorScheme:d(e.colorScheme??"dark"),language:d(e.language??"en"),isConsoleDisplayed:d(e.isConsoleDisplayed??!1),consoleHeight:d(e.consoleHeight??300),logList:d([]),logToSeeCount:d(0),tr:d({}),trDynDict:d(ee),isWakeLock:d(!1)}},T=te(),p=T,je={get v(){return p.tr.value}};var be=(e)=>(t)=>p.trDynDict.value[p.language.value]?.[e]?.[t]??t,M=d(!1);P(()=>(M.value=!0,void Promise.all([import(`./tr/${p.language.value}.js`),_["dyn-dict"]({language:p.language.value}).get().catch(()=>({data:ee.en}))]).then(([{default:e},t])=>{T.tr.value=e,T.trDynDict.value={...T.trDynDict.value,[p.language.value]:t.data},M.value=!1})));var $e=g(()=>({colorScheme:p.colorScheme.value,language:p.language.value,isConsoleDisplayed:p.isConsoleDisplayed.value,consoleHeight:p.consoleHeight.value}));P(()=>localStorage.setItem(R,JSON.stringify($e.value)));P(()=>void document.body.classList.toggle("dark",p.colorScheme.value==="dark"));var ge=T,et=M;
export{T as s,je as t,be as u,M as v,ge as w,et as x};

//# debugId=6A13A84E0C03981264756E2164756E21
//# sourceMappingURL=index.chunk-ffff2m0n.js.map
