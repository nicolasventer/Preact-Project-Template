import{A as y,B as K,x as P}from"./index.chunk-kcwyeexx.js";import{ma as X,qa as G}from"./index.chunk-vhef2y2a.js";import{Ca as D}from"./index.chunk-60q5cb2e.js";var x=X(()=>K.viewportSize.value.height*0.05),T=X(()=>K.viewportSize.value.height*0.15),z=X(()=>K.viewportSize.value.height*0.5);var n=(q)=>void(P.isAboveMd.value=q),e=(q)=>void(P.isBelowXxs.value=q),o=({height:q,width:J})=>void(P.viewportSize.value={height:q,width:J}),s=(q,J)=>{if(P.consoleHeight.value=Math.max(T.value,Math.min(z.value,q)),q<=x.value)P.isConsoleDisplayed.value=!1,P.consoleHeight.value=J;else if(q>=T.value)P.isConsoleDisplayed.value=!0,P.logToSeeCount.value=0},q1=(q)=>P.logToSeeCount.value=P.logList.value.length-q-1,J1=()=>{if(P.isConsoleDisplayed.value=!P.isConsoleDisplayed.value,P.isConsoleDisplayed.value)P.logToSeeCount.value=0},P1=()=>{P.logList.value=[],P.logToSeeCount.value=0},R=(q,J)=>{P.logList.value=[...P.logList.peek(),{type:q,message:J,time:new Date().toISOString().split("T")[1]}],P.logToSeeCount.value=P.logToSeeCount.peek()+1},Q1=(q)=>P.isWakeLock.value=q,V1=(q,J,Q)=>()=>{if(J)document.startViewTransition(()=>P.colorScheme.value=q);else Q.value=!0,setTimeout(()=>{P.colorScheme.value=q,Q.value=!1},100)},Z1=(q,J)=>()=>{if(J)document.startViewTransition(()=>P.language.value=q);else y.value=!0,setTimeout(()=>{P.language.value=q,y.value=!1},100)};var{log:H,info:I,warn:v,error:_}=console,Z=(q)=>(...J)=>R(q,J.map((Q)=>typeof Q==="string"?Q:Q instanceof Error?`${Q.message}
${Q.stack}`:JSON.stringify(Q)).join(" ")),B1=(q)=>{if(q==="normal")console.log=H,console.info=I,console.warn=v,console.error=_;else if(q==="custom")console.log=Z("log"),console.info=Z("info"),console.warn=Z("warn"),console.error=Z("error");else console.log=(...J)=>(H(...J),Z("log")(...J)),console.info=(...J)=>(I(...J),Z("info")(...J)),console.warn=(...J)=>(v(...J),Z("warn")(...J)),console.error=(...J)=>(_(...J),Z("error")(...J))};var k=(q)=>q.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),O=(...q)=>q.filter((J,Q,Y)=>{return Boolean(J)&&J.trim()!==""&&Y.indexOf(J)===Q}).join(" ").trim();var N={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};var C=G(({color:q="currentColor",size:J=24,strokeWidth:Q=2,absoluteStrokeWidth:Y,className:E="",children:B,iconNode:S,...L},f)=>{return D("svg",{ref:f,...N,width:J,height:J,stroke:q,strokeWidth:Y?Number(Q)*24/Number(J):Q,className:O("lucide",E),...L},[...S.map(([b,h])=>D(b,h)),...Array.isArray(B)?B:[B]])});var V=(q,J)=>{let Q=G(({className:Y,...E},B)=>D(C,{ref:B,iconNode:J,className:O(`lucide-${k(q)}`,Y),...E}));return Q.displayName=`${q}`,Q};var p=[["circle",{cx:"12",cy:"9",r:"1",key:"124mty"}],["circle",{cx:"19",cy:"9",r:"1",key:"1ruzo2"}],["circle",{cx:"5",cy:"9",r:"1",key:"1a8b28"}],["circle",{cx:"12",cy:"15",r:"1",key:"1e56xg"}],["circle",{cx:"19",cy:"15",r:"1",key:"1a92ep"}],["circle",{cx:"5",cy:"15",r:"1",key:"5r1jwy"}]],A=V("GripHorizontal",p);var w=[["path",{d:"m5 8 6 6",key:"1wu5hv"}],["path",{d:"m4 14 6-6 2-3",key:"1k1g8d"}],["path",{d:"M2 5h12",key:"or177f"}],["path",{d:"M7 2h1",key:"1t2jsx"}],["path",{d:"m22 22-5-10-5 10",key:"don7ne"}],["path",{d:"M14 18h6",key:"1m8k6r"}]],F=V("Languages",w);var m=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 9.9-1",key:"1mm8w8"}]],$=V("LockOpen",m);var d=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],M=V("Lock",d);var u=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],U=V("Moon",u);var g=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],W=V("Sun",g);export{n as a,e as b,o as c,s as d,q1 as e,J1 as f,P1 as g,Q1 as h,V1 as i,Z1 as j,B1 as k,A as l,F as m,$ as n,M as o,U as p,W as q};

//# debugId=50B8497642F1BD0064756E2164756E21
//# sourceMappingURL=index.chunk-e3n2p4by.js.map
