import{a as Y,b as w,c as B,d as F,h as L}from"../index.chunk-xbbpf251.js";import{l as W,m as S,n as X,o as P}from"../index.chunk-9wvg95c2.js";import{p as c}from"../index.chunk-a5kvyax8.js";import{w as A}from"../index.chunk-ffff2m0n.js";import"../index.chunk-dabrcv1f.js";import"../index.chunk-6z6fnnwj.js";import{I as k,M as G}from"../index.chunk-rnr8y5f9.js";import{T as I}from"../index.chunk-tpcrygn3.js";import"../index.chunk-w7btrm6m.js";var K=G(!1);document.addEventListener("keydown",(f)=>{if(f.key==="z"&&f.altKey)K.value=!K.value});var y=G({x:0,y:0}),Z=G(0),O=G(!1),U=G(!1),_=(f)=>{f.stopPropagation(),y.value="clientX"in f?{x:f.clientX,y:f.clientY}:{x:f.touches[0].clientX,y:f.touches[0].clientY},Z.value=A.consoleHeight.value,O.value=!0,document.body.addEventListener("mousemove",M),document.body.addEventListener("mouseup",N),document.body.addEventListener("touchmove",M),document.body.addEventListener("touchend",N)},M=(f)=>{if(f.stopPropagation(),!O.value)return;let q=f instanceof MouseEvent?f.clientY:f.touches[0].clientY,J=Z.value+y.value.y-q;Y(J,Z.value)},N=(f)=>{f.stopPropagation(),O.value=!1,document.body.removeEventListener("mousemove",M),document.body.removeEventListener("mouseup",N),document.body.removeEventListener("touchmove",M),document.body.removeEventListener("touchend",N)},$=!1,m=(f)=>{if($)return null;if(f.message.length<100)return null;return $=!0,console.info("Press Alt+Z to toggle wrap"),null},h=({resizable:f=!0})=>k(P,{positionAbsolute:!0,heightFull:!0,widthFull:!0,justifyContent:"flex-end",style:{top:0,zIndex:200,pointerEvents:"none",margin:"-2px 0"},children:[A.isConsoleDisplayed.value&&k(I,{children:[f&&k("div",{onMouseDown:_,onMouseEnter:()=>U.value=!0,onMouseLeave:()=>U.value=!1,onTouchStart:_,style:{cursor:"ns-resize",backgroundColor:U.value||O.value?"grey":void 0,borderRadius:0,display:"flex",justifyContent:"center",pointerEvents:"auto",borderBottom:0,userSelect:"none",border:"1px solid black"},children:"---"},void 0,!1,void 0,this),k("div",{style:{height:f?A.consoleHeight.value:"100%",pointerEvents:"auto",overflow:"auto",border:"1px solid black"},children:A.logList.value.map((q,J)=>{let Q=A.logList.value.length-J<=A.logToSeeCount.value;return k(X,{gap:8,style:{padding:"4px 8px",background:Q?"lightblue":void 0,cursor:Q?"pointer":void 0},alignItems:"baseline",onClick:()=>Q&&w(J),children:[k("div",{style:{whiteSpace:"pre",fontFamily:"consolas",color:q.type==="error"?"red":q.type==="warn"?"yellow":q.type==="info"?"blue":"gray"},children:`[${q.type}]`.padEnd(7)},void 0,!1,void 0,this),k("div",{style:{whiteSpace:"pre",fontFamily:"consolas"},children:["[",q.time,"]"]},void 0,!0,void 0,this),k("div",{style:{whiteSpace:"pre",fontFamily:"consolas",textWrap:K.value?"wrap":"nowrap",overflowWrap:K.value?"anywhere":void 0},children:[m(q),q.message]},void 0,!0,void 0,this)]},J,!0,void 0,this)})},void 0,!1,void 0,this)]},void 0,!0,void 0,this),k(X,{gap:12,style:{background:"white"},children:[k("button",{onClick:B,style:{pointerEvents:"auto",flex:1},children:"Console"},void 0,!1,void 0,this),A.logToSeeCount.value!==0&&k("div",{style:{color:"red"},children:A.logToSeeCount.value},void 0,!1,void 0,this),k("button",{onClick:F,style:{pointerEvents:"auto"},children:"Clear"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this);L("both");var V=()=>k(W,{children:[k(S,{},void 0,!1,void 0,this),k(h,{},void 0,!1,void 0,this),k(c,{subPath:"/"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);export{V as MainLayout};

//# debugId=CFE714B12E73F50E64756E2164756E21
//# sourceMappingURL=index.lazy.chunk-8fm5vhbr.js.map
