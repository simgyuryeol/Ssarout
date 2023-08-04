(()=>{var be=Object.create;var T=Object.defineProperty;var ge=Object.getOwnPropertyDescriptor;var ue=Object.getOwnPropertyNames;var pe=Object.getPrototypeOf,me=Object.prototype.hasOwnProperty;var F=s=>T(s,"__esModule",{value:!0});var V=(s,e)=>()=>(s&&(e=s(s=0)),e);var C=(s,e)=>()=>(e||s((e={exports:{}}).exports,e),e.exports),I=(s,e)=>{F(s);for(var t in e)T(s,t,{get:e[t],enumerable:!0})},ye=(s,e,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of ue(e))!me.call(s,r)&&r!=="default"&&T(s,r,{get:()=>e[r],enumerable:!(t=ge(e,r))||t.enumerable});return s},A=s=>ye(F(T(s!=null?be(pe(s)):{},"default",s&&s.__esModule&&"default"in s?{get:()=>s.default,enumerable:!0}:{value:s,enumerable:!0})),s);var Q=C((Pe,J)=>{var W=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];function j(s){return W.indexOf(s.toUpperCase())}function $(s){return{note:s.note||0,octav:s.octav||4,length:s.length||0,start:s.start||0,lylic:s.lylic||void 0}}function we(s){let e=4,t,r=120,i=60*1e3/r,o=4,c=i,a=0;s=s.toUpperCase().replace(/\b/g,"");let m=s.length,d=0,n="",b=null,u=[];function h(){a++,t=s[a]}function M(){let l=$({note:j(t),octav:e,length:c,start:d}),y=[1],w=!1;for(h();a<m;)if(["+","#","-"].includes(t))l.note+=t!=="-"?1:-1,l.note<0?(l.octav--,l.note+=12):l.note>11&&(l.octav++,l.note-=12),h();else if(/[0-9]/.test(t)){for(n="";/[0-9]/.test(t);)n+=t,h();n.length>0&&(l.length=i*4/parseInt(n,10))}else if(t===".")y.push(y[y.length-1]/2),h();else if(/['"]/.test(t)){for(h(),n="";!/['"]/.test(t);)n+=t,h();l.lylic=n,n="",h()}else if(t==="&")w=!0,h();else break;let g=0;y.forEach(E=>{g+=E*l.length}),l.length=g,b&&b.note===l.note&&b.octav===l.octav?(b.length+=l.length,l=b):u.push(l),b=null,w&&(b=l),d+=g}function x(){for(n="",h();t!=="]";)n+=t,h();let l=n.length;if(l===0)return;let y=0,w=0;for(let g=u.length-1;g>=0;g--)if(u[g].note!==-1&&y++,y===l){w=g;break}for(let g=w,E=0;E<l&&g<u.length;g++)u[g].note!==-1&&(u[g].lylic=n[E],E++);n=""}function f(){for(n="",h();/[0-9]/.test(t);)n+=t,a++,t=s[a];r=parseInt(n,10),i=60*1e3/r,c=i*4/o,n=""}function _(){for(a++,n="";/[0-9]/.test(s[a]);)n+=s[a],a++;o=parseInt(n,10),c=i*4/o}for(;a<m;)switch(t=s[a],t){case"T":f();break;case"C":case"D":case"E":case"F":case"G":case"A":case"B":case"R":M();break;case">":e=Math.min(8,e+1),a++;break;case"<":e=Math.max(0,e-1),a++;break;case"O":a++,t=s[a],e=parseInt(t,10);break;case"L":_();break;case"[":x();break;default:a++;break}return u}J.exports={noteStrings:W,parseScore:we,getNoteIndex:j,makeNote:$}});var O=C(k=>{"use strict";Object.defineProperty(k,"__esModule",{value:!0});k.boundMethod=P;k.boundClass=X;k.default=Ee;function L(s){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?L=function(t){return typeof t}:L=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},L(s)}function P(s,e,t){var r=t.value;if(typeof r!="function")throw new TypeError("@boundMethod decorator can only be applied to methods not: ".concat(L(r)));var i=!1;return{configurable:!0,get:function(){if(i||this===s.prototype||this.hasOwnProperty(e)||typeof r!="function")return r;var c=r.bind(this);return i=!0,Object.defineProperty(this,e,{configurable:!0,get:function(){return c},set:function(m){r=m,delete this[e]}}),i=!1,c},set:function(c){r=c}}}function X(s){var e;return typeof Reflect!="undefined"&&typeof Reflect.ownKeys=="function"?e=Reflect.ownKeys(s.prototype):(e=Object.getOwnPropertyNames(s.prototype),typeof Object.getOwnPropertySymbols=="function"&&(e=e.concat(Object.getOwnPropertySymbols(s.prototype)))),e.forEach(function(t){if(t!=="constructor"){var r=Object.getOwnPropertyDescriptor(s.prototype,t);typeof r.value=="function"&&Object.defineProperty(s.prototype,t,P(s,t,r))}}),s}function Ee(){return arguments.length===1?X.apply(void 0,arguments):P.apply(void 0,arguments)}});var Z={};I(Z,{default:()=>S});var Y,S,D=V(()=>{Y=class{constructor(){this._handlers=new Map}on(e,t,r=!1){this._handlers.has(e)||this._handlers.set(e,[]),this._handlers.get(e).push({handler:t,once:r})}emit(e,...t){if(!this._handlers.has(e))return;let r=this._handlers.get(e);r.forEach(i=>{i.handler(...t)});for(let i=r.length-1;i>=0;i--)r[i].once&&r.splice(i,1)}},S=Y});var re=C((Ne,te)=>{var ke=[{title:"\uC560\uAD6D\uAC00",singer:"",author:"nobody",score:`t60 o3 l4
d'\uB3D9'g.'\uD574'f+8'\uBB3C'e'\uACFC' g'\uBC31'd'\uB450'c-'\uC0B0'd'\uC774' g'\uB9C8'a8'\uB974'b8'\uACE0'b+.'\uB2F3'b8'\uB3C4' a2'\uB85D'.r
>d.'\uD558'c8'\uB290'<b'\uB2D8'a'\uC774' g'\uBCF4'f+8'\uC6B0'e8d'\uD558'c-'\uC0AC' d'\uC6B0'g'\uB9AC'a8'\uB098'a8'\uB77C'b'\uB9CC' g2.'\uC138'r
f+.'\uBB34'g8a'\uAD81'f+'\uD654' b.'\uC0BC'>c8d'\uCC9C'<b'\uB9AC' a'\uD654'g'\uB824'f+'\uAC15'g a2.'\uC0B0'r
>d.'\uB300'c8'\uD55C'<b'\uC0AC'a'\uB78C' g'\uB300'f+8'\uD55C'e8d'\uC73C'c-'\uB85C' d'\uAE38'g'\uC774'a8'\uBCF4'a8'\uC804'b'\uD558'g2.'\uC138'r`},{title:"\uC548\uB155(sample)",singer:"\uBC15\uD61C\uACBD",author:"nobody",score:`t80 l8 o4
>c#'\uC678'<e'\uB85C'e'\uC6B4'e'\uB0A0'e16'\uB4E4'f#16'\uC774'&f#16e.'\uC5EC'
d#'\uBAA8'd#16'\uB450'd#16'\uB2E4'&d#16>c#'\uC548'<b16'\uB155'&b4rb'\uB0B4'
>c#'\uBA38'<d16'\uB9AC'd16'\uC18D'&d16 d.'\uC5D0'd'\uB208'd16'\uBB3C'e'\uB4E4'd.'\uB3C4'
c#'\uC774'c#16'\uC81C'c#16'\uB294'&c#16b'\uC548'a16'\uB155'&a4rb'\uC624'
r>c#'\uC5B4'<f#'\uC81C'f#'\uC758'f#'\uB108'f#16'\uB294'g#'\uBC14'a'\uB78C'b16'\uC744'&
b>c#16'\uD0C0'<b16&'\uACE0'b>c#16'\uBA40'<b16'\uB9AC'&b16a16f#rf#'\uD6C4'
>d'\uD68C'c#'\uB3C4'<b16'\uC5C6'a'\uC774'a16'\uBBF8'&af#'\uB828'g#16'\uC5C6'a'\uC774'a16'\uB0A0'&
a4.>c'\uC544'<b4.'\uAC00'a'\uAD7F'
a2.'\uBC14\uC774' f#16'\uC624'a'\uC624'a16'\uC624'&
a2. f#'\uC601'a'\uC6D0'
a2.'\uD788' f#16'\uC6CC'a'\uC624'a16'\uC624'&a2.r4`},{title:"\uC751\uAE09\uC2E4",singer:"Izi",author:"nobody",score:`t72 o3 l8
<b-'\uD6C4'>
g4'\uD68C'r4 b-'\uD558'a-16'\uACE0'g16'\uC788'&gf'\uC5B4'&
fd'\uC694'&d4r4. <g'\uC6B0'>
g'\uB9AC'r4a-'\uB2E4'g16'\uD22C'f16'\uB358'&fe-'\uADF8'
>cc'\uB0A0'&c4r4.<b-'\uAD1C'
>c4'\uD55C'r c'\uC790'd'\uC874'<b-'\uC2EC'g'\uB54C'a-16'\uBB38'b-16'\uC5D0'&
b-4r>d-'\uB05D'c'\uB0B4'<g'\uC790'f'\uACE0'g16'\uB9D0'a-16'\uC744'&
a-4r4a-'\uD574'b-16'\uBC84'>c16'\uB9B0'&c<b-'\uAC70'&
b-f'\uC57C'&f4r4.<b-'\uAE08'>

g4'\uBC29'r4b-'\uBCFC'a-16'\uC904'g16'\uC54C'&gf'\uC558'&
fd'\uC5B4'&d4r2
g4'\uB0A0'r4a-'\uCC3E'g16'\uAE38'f16'\uBC14'&fe-'\uB7AC'
>cc'\uC5B4'&c4r4.<b-'\uD5C8'
>c4'\uB098'r c'\uBA70'd'\uCE60'<b-'\uC774'g'\uC9C0'a-16'\uB098'b-16'\uB3C4'&
b-4 r>d-'\uC544'c'\uBB34'<g'\uC18C'f'\uC2DD'g'\uC870'
b-'\uCC28'a-r g16'\uC5C6'f16 f4'\uC5B4' r4

r e-'\uD56D'f'\uC0C1'e-16'\uB0B4'f16'\uAC8C'&fe- r. <b-16'\uB108'>
a-'\uBB34'g'\uC798'f'\uD574'e-'\uC918'&e-<b-'\uC11C'&b-4>
r4 l16f'\uC27D'gf'\uAC8C'f'\uC0DD'& l8 f f'\uAC01'g'\uD588'a-16'\uB098'a-16'\uBD10'&
a-g&g4r2
r e-'\uC774'f'\uC820'e-16'\uC54C'f16'\uC544'&fe- r. <b-16'\uB0B4'>
g'\uACE0'b-'\uC9D1'b-'\uB54C'>c'\uBB38'&c<g'\uC5D0'&g4
b-'\uD798'a-'\uB4E4'g'\uC5C8'a-'\uB358'&a-4 >g'\uB108'g'\uB97C'&
gf&f2r4

<b-'\uC774'>l16e-'\uBC14'e-'\uBCF4'&e-8f'\uC57C'f'\uC9C4'&f8g'\uC9DC'g'\uC544'&g<b-b-'\uB2C8'>c'\uC57C'&
c<b-8.&b-4r2
l8>c'\uC544'e-'\uC9C1'e-'\uB3C4'f16'\uB098'e-16'\uB97C'&e-4r a-'\uADF8'&
a-g'\uB807'f16'\uAC8C'e-16e-'\uBAB0'&e-<b-'\uB77C'&b-4

>c'\uB108'<b16'\uB97C'>c16'\uAC00'&ce-'\uC9C4'f.'\uC0AC'e-16e-4'\uB791'
<b-'\uB098'a16'\uBC16'b-16'\uC5D4'&b->d'\uC5C6'f.'\uB294'e-16e-4'\uB370'
r2c'\uC81C'd16'\uBC1C'e-16'\uB098'&e-16f.'\uB97C'
g.'\uB5A0'f16f4'\uB098'e-.'\uAC00'd16d.'\uC9C0'e-16e-2'\uB9C8'r2

r< e-'\uC5B8'f'\uC81C'e-16'\uB77C'f16'\uB3C4'&fe- r. <b-16'\uB0B4'>
a-'\uD3B8'g'\uC774'f'\uB3FC'e-'\uC900'&e-<b-'\uB108'&b-4>
r4 l16f'\uACE0'gf'\uB9C8'f'\uC6B4'& l8 f f'\uC900'g'\uBAA8'a-16'\uB974'a-16'\uACE0'&
a-g&g4r2
r e-'\uCCA0'f'\uC5C6'e-16'\uC774'f16'\uB098'&fe- r. r16
g'\uBA4B'b-'\uB300'b-'\uB85C'>c'\uD55C'&c<g'\uAC70'&g4
b-'\uC6A9'a-'\uC11C'g'\uD560'a-'\uC218'&a-4 >g'\uC5C6'g'\uB2C8'&
gf&f2r4

<b-'\uC774'>l16e-'\uBC14'e-'\uBCF4'&e-8f'\uC57C'f'\uC9C4'&f8g'\uC9DC'g'\uC544'&g<b-b-'\uB2C8'>c'\uC57C'&
c<b-8.&b-4r2
l8>c'\uC544'e-'\uC9C1'e-'\uB3C4'f16'\uB098'e-16'\uB97C'&e-4r a-'\uADF8'&
a-g'\uB807'f16'\uAC8C'e-16e-'\uBAB0'&e-<b-'\uB77C'&b-4

>c'\uB108'<b-16'\uB97C'>c16'\uAC00'&ce-'\uC9C4'f.'\uC0AC'e-16e-4'\uB791'
<b-'\uB098'a-16'\uBC16'b-16'\uC5D4'&b->d'\uC5C6'f.'\uB294'e-16e-4'\uB370'
r2c'\uC81C'd16'\uBC1C'e-16'\uB5A0'&e-f'\uB098'

g4'\uAC00'a-'\uC9C0'f'\uB9C8'&f4r4
<b-'\uB108'>e-16'\uD558'e-16'\uB098'&e- f16'\uB9CC'f16'\uC0AC'&fg16'\uB791'g16'\uD558'&g16<b-16b-16'\uB294'>c16'\uB370'&
c16<b-.&b-4r2
>c'\uC774'e-'\uB300'e-'\uB85C'f16'\uB098'e-16'\uB97C'&e-4r a-'\uB450'&
l16a-gg'\uACE0'f f'\uAC00'e-e-'\uC9C0'g'\uB9C8'&gf+g8&g4
l8 c'\uB098'<b16'\uB97C'>c16'\uBC84'&cd'\uB9AC'f.'\uC9C0'e-16e-4'\uB9C8'
<b-'\uADF8'a16'\uB0E5'b-16'\uB0A0'&b-16>b-'\uC548'a-16 a-'\uC544'g16g16'\uC918'&g4
r2 c'\uB2E4'd16'\uC2DC'e-16'\uC0AC'&e-16f.'\uB791'
g.'\uD558'f16 f4'\uAC8C' e-.'\uB3CC'd16 d4'\uC544'
f'\uC640'e-&e-4`},{title:"\uC560\uC778\uC788\uC5B4\uC694(1\uC808)",singer:"\uC774\uC740\uBBF8",author:"sample",score:`t70 o4 l8
r <b'\uC544'b'\uC9C1'b'\uB3C4'>d4.'\uB10C' d'\uD63C'
<g4.'\uC794'g16'\uAC70'b16'\uB2C8'&b4r b'\uBB3C'
e4'\uC5B4're16'\uC624'a16'\uB124'g4'\uC694' d.'\uB09C'g16'\uADF8'
g4'\uC800' f#.'\uC6C3'g16'\uC5B4'a4'\uC694'
rb'\uC0AC'b'\uB791'b'\uD558'>d4.'\uACE0'd'\uC788'
g2'\uC8E0'r.g16'\uC0AC'f#.'\uB791'g16'\uD558'
e4'\uB294'ra'\uC0AC'g4'\uB78C'f#4'\uC788'g16'\uC5B4'g.'\uC694'&g4&g4rd16'\uADF8'd16'\uB300'
e'\uB294'e16'\uB0B4'e16'\uAC00'&e4 r f#'\uC548'g16'\uC4F0'f#'\uB7EC'e16'\uC6B4'
e'\uAC74'd16'\uAC00'd16'\uBD10'&d4 r e16'\uC88B'f#16-'\uC740'&f#-16e'\uC0AC'd16'\uB78C'
l12d'\uC788'c'\uB2E4'c'\uBA70'&l8c c16'\uD55C'd16'\uBC88'&d16e'\uB9CC'e16'\uB098'&ed16'\uBCF4'<a16'\uB77C'>
c'\uB9D0'<b16'\uD558'b16'\uC8E0'&b4r4 r >d16'\uADF8'd16'\uB304'
e-'\uBAA8'e16-'\uB974'e16-'\uC8E0'&e4- r16 g'\uB0B4'g16'\uAC8C'l12g'\uB3C4'a'\uBA4B'g'\uC9C4'l8
b'\uC560'a16'\uC778'a16'\uC774'&a16g.'\uC788' f#'\uB2E4'e16'\uB294'e16'\uAC78'&e4
e'\uB108'e16'\uBB34'e16'\uC18C'&e16f#'\uC911'g16'\uD574'&g.e16'\uAF2D'&l12ef#'\uC228'g'\uACA8'l8
g4'\uB450'&g16a'\uC5C8'a16'\uC8E0'&a4 g'\uADF8'a'\uC0AC'
b2'\uB78C'>c'\uB098'c16'\uB9CC'<b16'\uBCFC'&ba16'\uC218'a16'\uC788'&
ag16'\uC5B4'g16'\uC694'&g4 >c'\uB0B4'c16'\uB208'<b.'\uC5D0'a16'\uB9CC'a16'\uBCF4'&
l12ag'\uC5EC'g'\uC694'&l16gg'\uB0B4'g'\uC785'g'\uC220'g4'\uC5D0'rg'\uC601'f##'\uC6D0'g'\uD788'l8
g.'\uB2F4'a.'\uC544'b'\uB458'b'\uAC70'a16a.'\uC57C' g16'\uAC00'a16'\uB054'&
a16b.'\uC529'r l16b'\uCC28'b'\uC624'>c8'\uB974'c'\uB294'd'\uB208'&d<b-'\uBB3C'a8l8
a16'\uB9CC'g. g'\uC54C'a16'\uACE0'b16'\uC788'&b16>e.'\uC8E0'&e4
<r4e'\uADF8'f#16'\uC0AC'g16'\uB78C'&g16g'\uADF8'f#16'\uB300'&f#.e16'\uB77C'
f#'\uB294'g4.'\uAC78'&g2`},{title:"\uAC00\uC2DC(1\uC808)",singer:"\uBC84\uC988",author:"sample",score:`t72 l8 o3
g#'\uB108'b'\uC5C6'b'\uB294'g#16'\uC9C0'>c#.'\uAE08'<b'\uB3C4'&b.>d#16'\uB208'
e.'\uBD80'd#16'\uC2E0'c#'\uD558'<g#16'\uB298'>c#16&'\uACFC'c#4r4
<g#'\uB208'b'\uBD80'b'\uC2DC'b16'\uAC8C'>c#16'\uC6C3'&c#<b'\uB294'g#'\uC0AC'f#16'\uB78C'g#16'\uB4E4'&g#2r2

g#'\uB098'b'\uC758'b'\uD5E4'g#16'\uC5B4'>c#16'\uC9D0'&c#<b'\uC744'&b.>d#16'\uBAA8'
e'\uB974'd#'\uB294'c#'\uC138'<g#16'\uC0C1'>c#16'\uC740'&c#4r4
<g#'\uC2AC'b16'\uD504'b16'\uB3C4'&bb'\uB85D'>c#'\uADF8'<b'\uB300'g#'\uB85C'f#16'\uC778'g#16'\uB370'&g#2r2

r4>c#'\uC2DC'e'\uAC04'd#'\uB9C8'd#16'\uC800'e16'\uB370'&ef#'\uB824'
<b'\uAC00'g#'\uC9C0'b'\uBABB'b16'\uD558'>c#16'\uAC8C'&c#4r4
c#16'\uB098'e16'\uB9CC'e'\uC740' e'\uB110'e16'\uBCF4'd#16'\uB0B4'&d#e'\uC9C0'd#'\uBABB'<b'\uD588'
b16'\uB098'>c#16<b'\uBD10'&b2r4
r4>c#'\uAC00'e'\uC2DC'd#'\uCC98'd#16'\uB7FC'e16'\uAE4A'&ef#'\uAC8C'
g#'\uBC15'g#16'\uD78C'f#16 f#'\uAE30'g#16'\uC5B5'g#16'\uC740'e4<r4

a'\uC544'a16'\uD30C'a16'\uB3C4'&a4 b'\uC544'b16'\uD508'b16'\uC904'&b16g#'\uBAA8'b16'\uB974'>c#2'\uACE0'<r2

b.'\uADF8'b16'\uB300'>e16'\uAE30'f#16'\uC5B5'g#'\uC774'&g#4r4
<b#.'\uC9C0'b#16'\uB09C'>e16'\uC0AC'f#16'\uB791'g#'\uC774'&g#4rf#'\uB0B4'
f#'\uC548'e'\uC744'&e d#16'\uD30C'e16'\uACE0'f#'\uB4DC'e'\uB294'rf#'\uAC00'
g#4'\uC2DC'&g#16f#16f#16'\uAC00'e16'\uB418'f#4'\uC5B4'<r4

b.'\uC81C'b16'\uBC1C'>e16'\uAC00'f#16'\uB77C'g#'\uACE0'&g#4r4
<b#.'\uC544'b#16'\uC8FC'>e16'\uAC00'f#16'\uB77C'g#'\uACE0'&g#4rf#'\uC560'
f#'\uC368'e16e16'\uB3C4'&e d#16'\uB098'e16'\uB97C'f#'\uAD34'e'\uB86D'd#'\uD788'd#16'\uB294'd#16'\uB370'e2.r4
`},{title:"\uCCB4\uB150(1\uC808)",singer:"\uBE45\uB9C8\uB9C8",author:"sample",score:`t75 o4 l16
e-8'\uD589'
d-4.'\uBCF5'c8'\uD588'c4'\uC5B4' c8'\uB108'd-'\uC640'e-'\uC758'
e-4.'\uC2DC'<b-8'\uAC04'b-4'\uB4E4'r8 a-'\uC544'b-'\uB9C8'
>c4.'\uB3C4'<a-'\uB108'b-'\uB294'>c8'\uD798'<b-8'\uB4E4'a-8.'\uC5C8'g'\uACA0'&
g8f4.'\uC9C0'r4. g'\uB108'a-'\uC758'
b-4.'\uB9C8'g'\uC74C'a-'\uC744'&a-4r8b-'\uBAB0'>c'\uB790'
d-8'\uB358'c8'\uAC74'<b-8'\uC544'a-'\uB2C8'a-'\uC57C'&a-4r8 b-'\uB098'>c'\uB3C4'
d-8'\uB290'c8'\uAF08'<b-8'\uC5C8'a-'\uC9C0'a-'\uB9CC'b-4 r8 >e-8'\uB110'
d-4'\uBCF4'&d-d-'\uB0B4'e-'\uB294'c'\uAC8C'&c4 c8'\uB110'd-'\uB5A0'e-'\uB098'
e-4'\uBCF4'&e-e-'\uB0B4'f'\uB294'<b-'\uAC8C'&b-4 r8 a-'\uC544'b-'\uC9C1'
>c4.'\uC740'<a-'\uC775'b-'\uC219'>c8'\uD558'<b-8'\uC9C0'a-8.'\uAC00'>c'\uC54A'&
c8<f4.'\uC544'r4. g'\uADF8'a-'\uB807'
b-4'\uAC8C'b->c8'\uBC16'c'\uC5D0'&c<b-a-8 r8 b-'\uD560'>c'\uC218'
d-8'\uC5C6'c8'\uB358'<b-8'\uB2C8'a-'\uAC00'a-'\uC6D0'&a-8>c'\uB9DD'<b-'\uC2A4'&b-4&
b-a-'\uB7EC'a-8'\uC6CC'r4 r4
a-8'\uC65C'>a-8'\uB9D0'g4.'\uC548'f'\uD588'f'\uB2C8'&f4 r8 f'\uC544'f'\uB2D8'
f4'\uBABB'&fg'\uD55C'e-'\uAC70'f'\uB2C8'&e4- r8 <b-'\uC870'>c'\uAE08'
c8'\uB3C4'd-'\uB0A0'd-'\uC0DD'&d-8f'\uAC01'f'\uD558'&f8g'\uC9C0'e-'\uC54A'&e-d-'\uC558'e-e-'\uB2C8'&
e-2 r4 <a-8'\uC88B'>a-8'\uC544'
g4.'\uD55C'f'\uB2E4'f'\uBA74'&f4. f8'\uC0AC'
e-8.'\uB791'e-'\uD55C'&e-b-8'\uB2E4'a- a-4'\uBA74' r8 f'\uC774'a-'\uB807'
b-8'\uAC8C'a-'\uB05D'b-'\uB0BC'&b-a-a-'\uAC70'b-'\uBA74'&b-a-a-8'\uC11C'r8 e-'\uC65C'a-'\uADF8'
>c8'\uB7F0'<b-'\uB9D0'a-'\uC744'&a-a-'\uD588'b-b-'\uB2C8'&b-4 r8 e-8'\uB110'
>d-4.'\uBBF8'c8'\uC6CC'<b-8'\uD574'a-8'\uC57C'a-'\uB9CC'gg'\uD558'b-'\uB294'&
b-4b-a-a-'\uAC70'a-'\uB2C8'&a-4 r8 a-'\uC544'g'\uB2C8'
f8.'\uBA74'>c'\uB0B4'&c<b-b-'\uD0D3'e-'\uC744'&e-4. b-'\uD574'>c'\uC57C'
d-8'\uB9CC'c'\uD558'<b-'\uB294'&b-a-'\uAC70'b-b-'\uB2C8'&b-4 r8 e-8'\uC2DC'
>d-4.'\uAC04'c8'\uC744'<b-8'\uB3CC'a-8'\uB9B4'a-'\uC218'gg'\uB9CC'b-'\uC788'&
b-4&b->c8'\uB2E4'c'\uBA74'&c<b-a-8 r8 a-'\uB2E4'g'\uC2DC'
f8.'\uC608'>c'\uC804'&c<b-b-'\uC73C'e-'\uB85C'&e-4. b-'\uB3CC'>c'\uC544'
d-8'\uAC00'c'\uACE0'<b-'\uC2F6'&b-8a-'\uC740'a-'\uB9C8'&a-8f'\uC74C'g'\uBFD0'&g8a-'\uC774'a-'\uC57C'&
a-2`},{title:"\uCC9C\uB144\uC758\uC0AC\uB791",singer:"\uBC15\uC644\uADDC",author:"sample",score:`t66 o3 l8
>c4<ef&f4rf[\uC774\uB300\uB85C\uB110]
ebbe b>c16c16&c4[\uBCF4\uB0BC\uC218\uB294\uC5C6\uB2E4\uACE0]
<a4agfre[\uBC24\uC744\uC138\uC6CC\uAC04]
df>dc c<b16b16&b4[\uC808\uD788\uAE30\uB3C4\uD588\uC9C0\uB9CC]
>c4<ef&f4 r f[\uB354\uC774\uC0C1\uB110]
ebbe b>c16c16&c16e16e16e16&[\uC0AC\uB791\uD560\uC218\uC5C6\uB2E4\uBA74\uCC28\uB77C\uB9AC]
ef16<a16&a4 r a4g#[\uB098\uB3C4\uB370\uB824]
a2.r4[\uAC00]
>f2rffg[\uB0B4\uB9C8\uC9C0\uB9C9]
fe16e16&e4r2[\uC18C\uC6D0\uC740]
l16 d8dd&d8ef&f8ed&d<b8. [\uD558\uB298\uC774\uB05D\uB0B4\uBAA8\uB978\uCC99]
>c8<b>c&cdee&e8<a8>c8e8[\uC800\uBC84\uB9B0\uB300-\uB3C4\uBD88\uAF43\uCC98]
f4 r fga8gg&g8ff&[\uB7FC\uAEBC\uC9C0\uC9C0\uC54A\uB294\uC0AC\uB791]
f8ee*e4r2[\uC73C\uB85C]
f8fg&g8a8 d8de&e8f8[\uC601\uC6D0\uD788\uB10C\uAC00\uC2B4\uC18D\uC5D0]
r8 aab8ab*b4 r8 e8[\uD0C0\uC624\uB97C\uD14C\uB2C8\uB098]
>c4c8cc&c4r8d8[\uB97C\uC704\uD574\uC11C\uB208]
<b8a8g8f8 d8ee&e4 [\uBB3C\uB3C4\uCC38\uC544\uC57C\uD588\uB358]
f8fg&g8ad&d8de&e8f8[\uADF8\uB3D9\uC548\uC5D0\uB10C\uC5BC\uB9C8\uB098]
r8aab8ab&b4r8e8[\uD798\uC774\uB4E4\uC5C8\uB2C8\uCC9C]
>c4c8cc&c4r8d8[\uB144\uC774\uAC00\uB3C4\uB098]
<b8a8g8f8 d8ee&e4[\uB108\uB97C\uC78A\uC744\uC218\uC5C6\uC5B4]
l8 ffga>c4<b.a16[\uC0AC\uB791\uD588\uAE30\uB54C\uBB38 ]
a1[\uC5D0]`},{title:"\uB9D0\uB9AC\uAF43",singer:"\uC774\uC2B9\uCCA0",author:"sample",score:`t70 o3 l8

e[\uC5BC]
>c4<b>c&c<bag[\uB9C8\uB098\uB354\uACAC\uB38C\uC57C]
b4.a16a16&a4. g16a16[\uD558\uB294\uC9C0\uC9D9\uC740]
b>d16d16&d4 d<b16>d16&de [\uC5B4\uB460\uC744\uD5E4\uB9E4\uACE0\uC788]
<b16a16g4.r4r>d[\uC5B4--\uB0B4]
c4<b>c&c<bag[\uAC00\uBC14\uB780\uAFC8\uC774\uB77C]
b4.a16a16&a4r4[\uB294\uAC83\uC740]
rd16>c16&c4&c4.d[\uC5C6\uB294\uAC78]
<b2r4re[\uAE4C\uB354]
>c4<b>c&c<bag[\uC774\uC0C1\uC740\uACAC\uB51C\uC218]
b4.a16a16&a4. g16a16[\uC5C6\uB294\uAC83\uC9C0\uCE5C]
b>d16d16&d4 d<b16>d16&de [\uB450\uB208\uC744\uB728\uB294\uAC83\uB9C8]
<b16a16g4.r4r>d[\uC800--\uAE34]
c4<b>c&c<bag[\uD55C\uC228\uC744\uB0B4\uC26C\uB294]
b4.a16a16&a4r4[\uAC83\uC870\uCC28]
r>c16c16&c4&c4.d[\uB09C\uD798\uB4E4]
<b2r2[\uC5B4]

>r4eeee<b16a16g[\uC774\uB807\uAC8C\uB09C\uC4F0-\uB7EC]
ab4b&b2[\uC9C4\uCC44\uB85C]
r4>ee16e16&ee<b16a16g&g[\uB05D\uB098\uB294\uAC74\uC544-\uB2D0]
>e4.&e3f#3g3[\uAE4C\uD56D\uC0C1]
edd<b16>g16&g4r4[\uB450\uB824\uC6E0\uC9C0\uB9CC]

dcc<bba16a16&a16g.[\uC9C0\uAE08\uB0B4\uAC00\uAC00\uC57C\uD560-]
>e-ddcc4g4[\uC138\uC0C1\uC18D\uC5D0\uB2C8\uAC00]
g2.a4[\uC788\uAE30]
f#2.r4[\uC5D0]

r4ggggg16a.[\uC9C0\uCCD0\uC4F0\uB7EC\uC9C0\uBA70]
f#eed16d16&d4 ef#[\uB418\uB3CC\uC544\uAC00\uB294\uB0B4\uC0B6]
g4r4 g.a16&ag[\uC774\uCD08\uB77C\uD574]
f#.b16&bf#16d16d4.d[\uBCF4\uC778\uB300-\uB3C4\uC8FD]
ee16d16c4 f#f#16e16&ef#[\uC5B4\uC9C4--\uB2C8\uBAA8\uC2B5\uACFC]
gab-16ag16g4.e[\uD568\uAED8\uD55C-\uB2E4\uBA74\uC774]
>c4<bge4.b&[\uC81C\uAC08\uC218\uC788\uC5B4]
b2a4[-]

r4ggggg16a.[\uC18C\uC911\uD558\uAC8C\uB0A8\uAE34]
f#eed16d16&d4 ef#[\uB108\uC758\uAFC8\uB4E4\uC744\uAEF4\uC548]
g4r4 g.a16&ag[\uC544\uB124\uAC8C\uAC00]
f#.b16&bf#16d16d4.d[\uC838\uAC00\uB824-\uD574\uC5B4]
ee16d16c4 f#f#16e16&ef#[\uB450\uC6B4--\uC138\uC0C1\uC18D\uC5D0]
gab-16ag16g4.e[\uC228\uC274\uB0A0-\uB4E4\uC774\uC774]
>c4<bge4.a&[\uC81C\uC78A\uD600\uC9C0\uB3C4]
a4.g&g2[\uB85D]`},{title:"\uADC0\uB85C",singer:"\uB098\uC5BC",author:"sample",score:`t54 l16 o3
g.a32b-.g32b-.>e-32d8r8..<g[\uD654\uB824\uD55C\uBD88\uBE5B\uC73C\uB85C\uADF8]
f#.g32a.f#32a.>e-32d4r8[\uB4B7\uBAA8\uC2B5\uB9CC\uBCF4\uC774\uBA70]
<a.b-32>c.<b-32>c.e-32d.c32r8<b-.>c32[\uC548\uB155\uC774\uB780\uB9D0\uB3C4\uC5C6\uC774\uC0AC\uB77C]
<b-8r8r16.b-32a8r4[\uC9C4\uADF8\uB300]
g.a32b-.g32b-.>e-32d8r..<g32[\uC27D\uAC8C\uD758\uB824\uC9C4\uB208\uBB3C\uB208]
f#.g32a.f#32a.>e-32d4r8[\uAC00\uC5D0\uAC00\uB4DD\uD788\uACE0\uC5EC]
<a.b-32>c.<b-32>c.e-32d.c32r16.c32<b-.>c32&[\uAC70\uB9AC\uC5D4\uC628\uD1B5\uD22C\uBA85\uD55C\uC720\uB9AC\uC54C]
c.d32&d8..c32d8r8c.d32[\uC18D--\uADF8\uB300]
e-.d32e-.d32e-.g32f8 r8 c.c32[\uB530\uB73B\uD55C\uC190\uC774\uB77C\uB3C4\uC7A1\uC544]
d.c#32d.c#32d.<b-32g8r8a.b-32 [\uBCFC\uC218\uB9CC\uC788\uC5C8\uB2E4\uBA74\uC544\uC9C1]
>c.<b-32>c.<b-32>c.e-32 dcr.c32<b-.>c32&[\uC740\uADF8\uB300\uC758\uC628\uAE30\uB0A8\uC544\uC788\uACA0\uC9C0]
c.f32'\uB9CC'd8e-32d32cd8r8 c.d32[\uBE44\uBC14]
e-.d32e-.d32e-.b-32&b-.>c32<a8a.g32[\uB78C\uC774\uBD80\uB294\uAE38\uAC00-\uC5D0\uD640\uB85C]
f#.f#32f#.d32f#.a32&a.g32r8g.a32[\uC560\uD0DC\uC6B0\uB294\uC774\uC790\uB9AC\uB450\uBEA8]
b-.g32b-.g32b-.g32b-r8>c.<b-32&[\uC5D4\uBE44\uBC14\uB78C\uB9CC\uCC28\uAC8C\uBD80\uB294]
b-.a32&a4>d4.[\uB370-]<
l8gab-b-a16g16g[\uC0AC\uB791\uD55C\uB2E8\uB9D0-\uC740]
f#ga&ar..a32[\uBABB\uD574\uB3C4\uC548]
ab->c16.c32c<b-a&[\uB155\uC774\uB780\uB9D0\uC740\uD574\uC57C]
a.b-16&b-a4r[\uC9C0-]
gab-b-ag16f#16[\uC544\uBB34\uB9D0\uB3C4\uC5C6\uC774-]
f#ga&ar..<a32[\uB5A0\uB098\uAC04\uADF8]
>a16.a32&agf#ra16f#32g32&[\uB300\uAC00\uC815\uB9D0\uBBF8\uC6CC-]
g16g16&g4[\uC694] `},{title:"\uB0AD\uB9CC\uACE0\uC591\uC774",singer:"\uCCB4\uB9AC\uD544\uD130",author:"sample",score:`t180 o4 l8
<f4>[\uB0B4]
c4.<b-&b-2>[\uB450\uB208]
cd4f&f<b-4b-[\uBC24\uC774\uBA74\uBCC4\uC774]
a4.>f&f2[\uB418\uC9C0]
r2cd4e-&[\uB098\uC758\uC9D1]
e-4fe-&e-d4c&[\uC740\uB4B7\uACE8\uBAA9]
c4r4cd4e-&[\uB2EC\uACFC\uBCC4]
e-4fe-&e-dcd[\uC774\uB728\uC9C0-\uC694]
c2r4<ff>[\uB450\uBC88]
c4.<b-&b-2>[\uB2E4\uC2E0]
cd4f&f<b-4b-[\uC0DD\uC120\uAC00\uAC8C\uD138]
a4.a>f&f4.[\uC9C0\uC54A\uC544]
r2cd4e-&[\uC11C\uB7FD\uAC8C]
e-4fe-&e-d4c&[\uC6B8\uB358\uB0A0\uB4E4]
c4r4cd4e-&[\uB098\uB294\uC678]
e-4dc&c<b->cc&[\uD1A8\uC774\uB77C-\uB124]
c2r4d4[\uC774]
b-2&b->c4<a[\uC820\uBC14-]
a4b-a&af4f&[\uB2E4\uB85C\uB5A0\uB0A0\uAEBC]
fgg2.&[\uC608\uC694]
g2r4d4[\uAC70]
b-2&b->c4<b-[\uBBF8\uB85C-]
a4b-a&afrf[\uADF8\uBB3C\uCCD0\uC11C\uBB3C]
>dc4<b-&b->c4c&[\uACE0\uAE30\uC7A1\uC73C\uB7EC]
c4r4<f4e-4[\uB098\uB294]
d2b-2[\uB0AD\uB9CC]
a2r>c4<b-[\uACE0\uC591-]
b-1&[\uC774]
b-4r4g4b-4[\uC2AC\uD508]
>d4e-d&dc<b-b-&[\uB3C4\uC2DC\uB97C\uBE44-\uCDB0]
b-4r4g4b-4[\uCDA4\uCD94]
>d4<b-b-&b->d4c[\uB294\uC791\uC740\uBCC4-]
c4r4<f4e-4[\uBE5B\uB098\uB294]
d2b-2[\uB0AD\uB9CC]
a2r>c4<b-[\uACE0\uC591-]
b-4.ag2&[\uC774--]
g4r4g4b-4[\uD640\uB85C]
>d4e-d&dc<b-b-&[\uB5A0\uB098\uAC00\uBC84-\uB9B0]
b-4r4g4b-4[\uAE4A\uACE0]
>d4<b-b-&b->d4.[\uC2AC\uD508\uB098\uC758]
c2.<b-b-&b-2[\uBC14\uB2E4\uC5EC]
`}],ee=class{constructor(){this.list=ke}getLatest(){return this.list.slice(0,20)}search(e){return e=e.trim(),this.list.filter(t=>t.title.includes(e)).slice()}save(e){e.idx?this.edit(e):this.add(e)}add(e){e.idx=this.list.length,this.list.push(e)}edit(e){let t=this.list.find(r=>r.idx===e.idx);t.author=e.author,t.score=e.score,t.singer=e.singer,t.title=e.title}};te.exports={FileModel:ee}});var ie={};I(ie,{SongList:()=>se});var qe,se,ae=V(()=>{qe=A(O());D();se=class extends S{constructor(){super();this._list=[],this._element=document.createElement("div"),this._element.classList.add("song-list"),this._element.addEventListener("click",this._clickHandler)}set list(e){this._list=e.slice(),this._update()}_clickHandler(e){let t=e.target;for(;t&&t.dataset.index===void 0;)t=t.parentElement;if(!t)return;let r=this._list[parseInt(t.dataset.index,10)];this.emit("click",r)}render(){return this._element}_update(){this._element.innerHTML="",this._list.map((e,t)=>{let r=document.createElement("div");return r.dataset.index=t.toString(),r.innerHTML=`<h2>${e.title} - ${e.singer}<small>(${e.author})</small></h2>`,r}).forEach(e=>this._element.appendChild(e))}}});var oe=C((ze,ce)=>{var Ie=O(),{EventEmitter:Se}=(D(),Z),{FileModel:Me,Model:Ke}=re(),{SongList:Te}=(ae(),ie),ne=class extends Se{constructor(){super();this._searchInput=document.createElement("input"),this._searchInput.type="search",this._searchInput.placeholder="\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uC138\uC694",this._wrapper=document.createElement("div"),this._wrapper.classList.add("sharer"),this._list=new Te,this.model=new Me,this._wrapper.appendChild(this._list.render()),this._list.on("click",this._listClick),this._list.list=this.model.getLatest()}render(){return this._wrapper}_listClick(e){this.emit("song-select",e)}};ce.exports={Sharer:ne}});var K=[0,.5,1,1.5,2,3,3.5,4,4.5,5,5.5,6],U=class{constructor(){this._canvas=document.createElement("canvas"),this._canvas.width=this._screenWidth,this._canvas.height=250,this._canvas.style.width="100%",this._notes=new Array(300).fill(-1),new ResizeObserver(this._resizeCallback).observe(this._canvas)}renderElement(){return this._canvas}_resizeCallback(){this._fitToContainer()}_fitToContainer(){let{offsetWidth:e,offsetHeight:t}=this._canvas;this._canvas.width=e,this._screenWidth=e;let r=Math.floor(e/2);this._notes.length<r?this._notes.unshift(...new Array(r-this._notes.length).fill(-1)):this._notes.length>r&&this._notes.splice(0,this._notes.length-r)}start(e){this._playScore=e.slice(),this._elapsed=-1e3}stop(){this._playScore=[]}get currentTime(){return this._elapsed}_renderNotes(e){e.save();let t=1e3/60,r=this._screenWidth,i=r/2;e.translate(i,0);let c=r*t/2,a=40/t,m=null;this._playScore.forEach(d=>{if(d.note===-1)return;let n=(d.start-this._elapsed)/t;if(n>i)return;let b=d.length/t-1;if(n+b<-i)return;let u=K[d.note]*5+(d.octav-3)*35+150+this._oct*5-2.5;d.start<=this._elapsed&&d.start+d.length-t>=this._elapsed?(m=d,e.fillStyle="orange"):e.fillStyle="blue",e.fillRect(n+a,u,b,5),d.lylic&&(e.save(),e.fillStyle="black",e.translate(n+a,u),e.scale(1,-1),e.fillText(d.lylic,0,5),e.restore())}),e.restore(),this._currentNote=m}getCurrentNote(){return this._currentNote}pushNote(e){this._notes.push(e),this._notes.shift()}update(e){this._elapsed+=e}render(){let e=this._canvas.getContext("2d");e.save(),e.font="14px monospace",e.textBaseline="top",e.clearRect(0,0,this._canvas.width,this._canvas.height);let t=["#eee","#ddd"];e.scale(1,-1),e.translate(0,-300),this._renderLines(e),e.globalAlpha=.5,e.fillStyle="blue",this._renderNotes(e),this._renderVoice(e),e.strokeStyle="yellowgreen",e.beginPath(),e.moveTo(this._screenWidth/2,0),e.lineTo(this._screenWidth/2,400),e.stroke(),e.restore(),e.font="30px monospace",e.fillText(this._oct.toString(),0,20)}_renderVoice(e){e.fillStyle="red",this._notes.forEach((t,r)=>{if(t!==-1){let i=Math.floor(t/12)-4,o=t%12;e.fillRect(r,K[o]*5+150+i*35-2.5,1,5)}})}inited(){this._inited=!0}_renderLines(e){e.strokeStyle="black",e.beginPath();for(let t=0;t<5;t++)e.moveTo(0,t*10+160),e.lineTo(this._screenWidth,t*10+160);e.stroke(),e.strokeStyle="#ddd",e.beginPath();for(let t=0;t<5;t++)e.moveTo(0,t*10+210),e.lineTo(this._screenWidth,t*10+210),e.moveTo(0,t*10+110),e.lineTo(this._screenWidth,t*10+110);e.stroke()}};var z=class{constructor(){this.events={}}on(e,t){this.events[e]||(this.events[e]=[]),this.events[e].push(t)}emit(e,...t){let r=this.events[e];r&&r.forEach(i=>{i(...t)})}};function _e(s){}var H=class extends z{constructor(e){super();this.ctx=e,this.analyser=null,this.buf=new Float32Array(2048),this.pitch=-1,this.note=0,this.octav=0,this.inited=!1}start(){if(!this.inited){let e=this.ctx.createAnalyser();this.analyser=e,this.analyser.fftSize=2048,this.getUserMedia()}}getUserMedia(){let e=navigator;e.mediaDevices===void 0&&(e.mediaDevices={}),e.mediaDevices.getUserMedia===void 0&&(e.mediaDevices.getUserMedia=function(r){let i=e.getUserMedia||e.webkitGetUserMedia||e.mozGetUserMedia||e.msGetUserMedia;return i?new Promise(function(o,c){i.call(navigator,r,o,c)}):Promise.reject(new Error("getUserMedia is not supported"))});let t={audio:!0};e.mediaDevices.getUserMedia(t).then(r=>{this.ctx.createMediaStreamSource(r).connect(this.analyser),this.inited=!0,this.emit("inited")})}update(e){if(!this.inited)return;this.analyser.getFloatTimeDomainData(this.buf);let t=this.correlate(this.buf,this.ctx.sampleRate);this.pitch=t,t===-1?this.note=-1:(this.note=_e(t),this.octav=Math.floor(this.note/12)-1),this.emit("note",this.note)}correlate(e,t){if(this.isSilentBuffer(e))return-1;let r=.2,i=this.trimBuffer(e,r),o=i.length,c=new Array(o).fill(0);for(let f=0;f<o;f++)for(let _=0;_<o-f;_++)c[f]=c[f]+i[_]*i[_+f];let a=0;for(;c[a]>c[a+1];)a++;let m=-1,d=-1;for(let f=a;f<o;f++)c[f]>m&&(m=c[f],d=f);let n=d,b=c[n-1],u=c[n],h=c[n+1],M=(b+h-2*u)/2,x=(h-b)/2;return M&&(n=n-x/(2*M)),t/n}isSilentBuffer(e){let t=e.length,r=0;for(let i=0;i<t;i++)r+=e[i]*e[i];return r=Math.sqrt(r/t),r<.01}trimBuffer(e,t=.2){let r=e.length,i=0,o=r-1,c=.2;for(let a=0;a<r/2;a++)if(Math.abs(e[a])<c){i=a;break}for(let a=1;a<r/2;a++)if(Math.abs(e[r-a])<c){o=r-a;break}return e.slice(i,o)}},R=H;var ve=[262,278,294,311,330,349,370,392,415,440,466,494],B=class{constructor(e){this._ctx=e,this._oscillator=this._ctx.createOscillator(),this._oscillator.type="sine",this._oscillator.frequency.setValueAtTime(0,this._ctx.currentTime),this._oscillator.start(),this._gain=this._ctx.createGain(),this._oscillator.connect(this._gain),this._gain.gain.value=.5,this._gain.connect(this._ctx.destination)}setVolume(e){this._gain.gain.value=e}getVolume(){return this._gain.gain.value}playTone(e){this._oscillator.frequency.setValueAtTime(e,this._ctx.currentTime)}playNote(e,t=0){let r=this._noteToFreq(e,t);this.playTone(r)}_noteToFreq(e,t){if(!e)return 0;let r=e.note+t,i=e.octav;for(;r<0;)r+=12,i--;for(;r>11;)r-=12,i++;let o=ve[r];if(i<4)for(let c=i;c<4;c++)o=o/2|0;else if(i>4)for(let c=4;c<i;c++)o*=2;return o}},G=B;var he=A(Q()),fe=A(oe());function Ce(s,e,t){let r=document.createElement(s);if(Object.keys(e).forEach(i=>{if(i==="class"){let o=e[i];Array.isArray(o)||(o=[o]),r.classList.add(...o)}else r.setAttribute(i,e[i])}),typeof t=="string"){let i=document.createTextNode(t);r.appendChild(i)}else Array.isArray(t)?t.forEach(i=>{r.appendChild(i)}):t!==void 0&&r.appendChild(t);return r}var p=Ce;D();function v(s){return p("button",{},s)}var le=class extends S{constructor(){super();this.btnPlay=v("Play"),this.btnStop=v("Stop"),this.btnSave=v("Save"),this.btnUpload=v("Upload"),this.btnKeyUp=v("Key Up"),this.btnKeyDown=v("Key Down"),this.inKey=p("input",{type:"number",value:"0"}),this.chkMelody=p("input",{type:"checkbox",checked:!0});let e=p("label",{},"play melody");e.appendChild(this.chkMelody),this.inVolume=p("input",{type:"range",min:0,max:100,value:30,step:1}),this.inScore=p("textarea",{class:"inScore"}),this.element=p("div",{class:"song-editor"},[e,this.inVolume,this.btnKeyDown,this.btnKeyUp,this.inScore,this.btnPlay,this.btnStop]),this.btnPlay.addEventListener("click",t=>{this._clickHandler("play")}),this.btnStop.addEventListener("click",t=>{this._clickHandler("stop")}),this.btnKeyDown.addEventListener("click",t=>{this._clickHandler("key-down")}),this.btnKeyUp.addEventListener("click",t=>{this._clickHandler("key-up")}),this.chkMelody.addEventListener("input",t=>{this.emit("change","melody",this.chkMelody.checked)}),this.inVolume.addEventListener("input",t=>{this.emit("change","volume",parseInt(this.inVolume.value,10)/100)})}get key(){return parseInt(this.inKey.value,10)}set key(e){this.inKey.value=e.toString()}_clickHandler(e){this.emit(e)}render(){return this.element}get score(){return this.inScore.value}set score(e){this.inScore.value=e}},de=le;var N=1e3/60,q=class{constructor(e){this.detector=null,this.drawer=null,this.player=null,this.wrapper=null,this.lastTime=0,this.elapsed=0,this.audio=null,this.inited=!1,this.key=0,this.playMusic=!0,this.sharer=new fe.Sharer,this.songEditor=new de,this.blind=null,this.drawer=new U,this.createElements(),e.appendChild(this.wrapper),requestAnimationFrame(this.loop)}createElements(){this.blind=p("div",{class:"blind"},"Click to start app");let e=p("div",{}),t=p("div",{}),r=this.drawer.renderElement();t.appendChild(r),this.drawer.start([]),e.appendChild(t),e.appendChild(this.songEditor.render()),e.appendChild(this.sharer.render()),this.wrapper=e,this.bindEvents(),document.body.appendChild(this.blind)}bindEvents(){this.sharer.on("song-select",this.songSelected.bind(this)),this.songEditor.on("play",async()=>{!this.inited||this.playSong((0,he.parseScore)(this.songEditor.score))}),this.songEditor.on("stop",this.stopSong.bind(this)),this.songEditor.on("key-up",this.keyUp.bind(this)),this.songEditor.on("key-down",this.keyDown.bind(this)),this.songEditor.on("change",(e,t)=>{switch(e){case"melody":this.toggleSound(t);break;case"volume":this.setVolume(t);break}}),this.blind.addEventListener("click",async()=>{await this.init(),this.blind.style.display="none"})}songSelected(e){this.songEditor.score=e.score}async init(){this.audio=new(window.AudioContext||window.webkitAudioContext),this.detector=new R(this.audio),this.player=new G(this.audio),this.detector.on("note",this.onNote.bind(this)),await this.detector.init(),this.inited=!0,this.drawer.inited()}playSong(e){this.drawer.start(e)}stopSong(){this.drawer.start([])}onNote(e){this.drawer.pushNote(e)}loop(e){this.lastTime===0&&(this.lastTime=e);let t=e-this.lastTime;for(this.elapsed+=t,this.lastTime=e;this.elapsed>N;)this.update(N),this.elapsed-=N;this.render(),requestAnimationFrame(this.loop.bind(this))}update(e){if(!!this.inited&&(this.detector.update(e),this.drawer.update(e),this.playMusic)){let t=this.drawer.getCurrentNote();this.player.playNote(t,this.key)}}render(){this.drawer.render()}setVolume(e){this.player.setVolume(e)}toggleSound(e){e===void 0?this.playMusic=!this.playMusic:this.playMusic=e,this.playMusic||this.player.playTone(0)}keyUp(){this.setKey(this.key+1)}keyDown(){this.setKey(this.key-1)}setKey(e){this.key=e,this.songEditor.key=e,this.drawer.octav=this.key}};var Le=document.querySelector("#app"),st=new q(Le);})();
