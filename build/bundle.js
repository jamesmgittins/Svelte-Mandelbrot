var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function s(t){t.forEach(e)}function r(t){return"function"==typeof t}function o(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(e,n,s){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const s=e.subscribe(...n);return s.unsubscribe?()=>s.unsubscribe():s}(n,s))}function l(t,e){t.appendChild(e)}function a(t,e,n){t.insertBefore(e,n||null)}function c(t){t.parentNode.removeChild(t)}function u(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function h(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function d(){return f(" ")}function p(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function g(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function m(t){return""===t?null:+t}function b(t,e){t.value=null==e?"":e}function v(t,e){for(let n=0;n<t.options.length;n+=1){const s=t.options[n];if(s.__value===e)return void(s.selected=!0)}}let x;function w(t){x=t}function $(t){(function(){if(!x)throw new Error("Function called outside component initialization");return x})().$$.on_mount.push(t)}const y=[],k=[],_=[],C=[],I=Promise.resolve();let M=!1;function E(t){_.push(t)}let F=!1;const R=new Set;function W(){if(!F){F=!0;do{for(let t=0;t<y.length;t+=1){const e=y[t];w(e),A(e.$$)}for(w(null),y.length=0;k.length;)k.pop()();for(let t=0;t<_.length;t+=1){const e=_[t];R.has(e)||(R.add(e),e())}_.length=0}while(y.length);for(;C.length;)C.pop()();M=!1,F=!1,R.clear()}}function A(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(E)}}const D=new Set;function Q(t,e){-1===t.$$.dirty[0]&&(y.push(t),M||(M=!0,I.then(W)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function H(o,i,l,a,u,h,f=[-1]){const d=x;w(o);const p=i.props||{},g=o.$$={fragment:null,ctx:null,props:h,update:t,not_equal:u,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:[]),callbacks:n(),dirty:f,skip_bound:!1};let m=!1;if(g.ctx=l?l(o,p,((t,e,...n)=>{const s=n.length?n[0]:e;return g.ctx&&u(g.ctx[t],g.ctx[t]=s)&&(!g.skip_bound&&g.bound[t]&&g.bound[t](s),m&&Q(o,t)),e})):[],g.update(),m=!0,s(g.before_update),g.fragment=!!a&&a(g.ctx),i.target){if(i.hydrate){const t=function(t){return Array.from(t.childNodes)}(i.target);g.fragment&&g.fragment.l(t),t.forEach(c)}else g.fragment&&g.fragment.c();i.intro&&((b=o.$$.fragment)&&b.i&&(D.delete(b),b.i(v))),function(t,n,o){const{fragment:i,on_mount:l,on_destroy:a,after_update:c}=t.$$;i&&i.m(n,o),E((()=>{const n=l.map(e).filter(r);a?a.push(...n):s(n),t.$$.on_mount=[]})),c.forEach(E)}(o,i.target,i.anchor),W()}var b,v;w(d)}class P{constructor(t,e){this.stripeIters=[],this.minIters=[],this.workerQueue=[],this.workerProcessing=[],this.drawingComplete=[],this.colorsRgb=[],this.ctx=t.getContext("2d"),this.canvasHeight=t.height,this.stripeWidth=t.width/e,this.stripes=e,this.workers=[];for(let t=0;t<e;t++){let t=new Worker("./js/mandelworker.js");t.addEventListener("message",(t=>this.processMessage(t))),this.workers.push(t)}}processMessage(t){this.stripeIters[t.data.stripe]=t.data.iters,this.minIters[t.data.stripe]=t.data.minIters,this.animationFrame&&cancelAnimationFrame(this.animationFrame),this.animationFrame=requestAnimationFrame((()=>this.drawWithColor())),this.workerProcessing[t.data.stripe]=!1,this.processQueue(t.data.stripe)}drawWithColor(){let t=3;for(let e=0;e<this.stripes;e++)this.minIters[e]&&this.minIters[e]<t&&(t=this.minIters[e]);for(let e=0;e<this.stripes;e++)this.stripeIters[e]&&(this.ctx.putImageData(this.getImageData(e,t),e*this.stripeWidth,0),this.drawingComplete[e]=!0)}getImageData(t,e){let n,s=new Uint8ClampedArray(4*this.stripeWidth*this.canvasHeight),r=3/(3-e);for(let o=0;o<this.stripeIters[t].length;o++){let i=4*o,l=(this.stripeIters[t][o]-e)*r;n=l<1?j(this.colorsRgb[3],this.colorsRgb[2],l):l<2?j(this.colorsRgb[2],this.colorsRgb[1],l-1):j(this.colorsRgb[1],this.colorsRgb[0],l-2),s[i]=n.r,s[i+1]=n.g,s[i+2]=n.b,s[i+3]=255}return new ImageData(s,this.stripeWidth,this.canvasHeight)}drawMandelbrot(t,e,n,s,r){let o=Math.abs(e-t)/this.stripes;for(let e=0;e<this.stripes;e++)this.workerQueue[e]={width:this.stripeWidth,height:this.canvasHeight,xmin:t+e*o,xmax:t+(e+1)*o,ymin:n,ymax:s,iterations:r,stripe:e,colors:this.colors},this.processQueue(e)}processQueue(t){!this.workerProcessing[t]&&this.workerQueue[t]&&(this.workers[t].postMessage(this.workerQueue[t]),this.workerQueue[t]=!1,this.workerProcessing[t]=!0)}isComplete(){for(let t=0;t<this.stripes;t++)if(!this.drawingComplete[t])return!1;return!0}destroy(){for(let t=0;t<this.stripes;t++)this.workers[t].terminate()}setColors(t){this.colors=t,this.colorsRgb=[];for(var e=0;e<t.length;e++)this.colorsRgb.push((n=t[e],s=void 0,(s=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n))?{r:parseInt(s[1],16),g:parseInt(s[2],16),b:parseInt(s[3],16)}:null));var n,s}}function j(t,e,n){return{r:t.r+(e.r-t.r)*n,g:t.g+(e.g-t.g)*n,b:t.b+(e.b-t.b)*n}}const L=[];const O=function(e,n=t){let s;const r=[];function i(t){if(o(e,t)&&(e=t,s)){const t=!L.length;for(let t=0;t<r.length;t+=1){const n=r[t];n[1](),L.push(n,e)}if(t){for(let t=0;t<L.length;t+=2)L[t][0](L[t+1]);L.length=0}}}return{set:i,update:function(t){i(t(e))},subscribe:function(o,l=t){const a=[o,l];return r.push(a),1===r.length&&(s=n(i)||t),o(e),()=>{const t=r.indexOf(a);-1!==t&&r.splice(t,1),0===r.length&&(s(),s=null)}}}}(!1),q=["1280x720","1600x900","1920x1080","2560x1440","3200x1800","3840x2160","5120x2880","7860x4320"];function N(t,e,n){const s=t.slice();return s[23]=e[n],s}function S(t,e,n){const s=t.slice();return s[26]=e[n],s[27]=e,s[28]=n,s}function B(t){let e,n,r;function o(){t[9].call(e,t[27],t[28])}return{c(){e=h("input"),g(e,"type","color")},m(s,i){a(s,e,i),b(e,t[26]),n||(r=[p(e,"input",o),p(e,"change",t[5])],n=!0)},p(n,s){t=n,1&s&&b(e,t[26])},d(t){t&&c(e),n=!1,s(r)}}}function U(e){let n,s,r,o,i=e[23]+"";return{c(){n=h("option"),s=f(i),r=d(),n.__value=o=e[23],n.value=n.__value},m(t,e){a(t,n,e),l(n,s),l(n,r)},p:t,d(t){t&&c(n)}}}function Z(e){let n,s,r;return{c(){n=h("button"),n.textContent="Download",g(n,"class","svelte-1t5shnu")},m(t,o){a(t,n,o),s||(r=p(n,"click",e[8]),s=!0)},p:t,d(t){t&&c(n),s=!1,r()}}}function z(e){let n,s,r,o,i;return{c(){n=h("button"),n.textContent="Download",s=d(),r=h("span"),r.textContent="Please wait...",n.disabled=!0,g(n,"class","svelte-1t5shnu")},m(t,l){a(t,n,l),a(t,s,l),a(t,r,l),o||(i=p(n,"click",e[8]),o=!0)},p:t,d(t){t&&c(n),t&&c(s),t&&c(r),o=!1,i()}}}function T(e){let n,r,o,i,f,x,w,$,y,k,_,C,I,M,F,R,W,A,D,Q,H,P,j,L,O=e[0],T=[];for(let t=0;t<O.length;t+=1)T[t]=B(S(e,O,t));let X=q,Y=[];for(let t=0;t<X.length;t+=1)Y[t]=U(N(e,X,t));function G(t,e){return t[4]?z:Z}let J=G(e),K=J(e);return{c(){n=h("div"),r=h("label"),r.textContent="Colors",o=d();for(let t=0;t<T.length;t+=1)T[t].c();i=d(),f=h("div"),x=h("label"),x.textContent="Iterations",w=d(),$=h("input"),y=d(),k=h("span"),_=d(),C=h("select");for(let t=0;t<Y.length;t+=1)Y[t].c();I=d(),K.c(),M=d(),F=h("div"),R=h("span"),R.textContent="Click image to re-center",W=d(),A=h("button"),A.textContent="Zoom -",D=d(),Q=h("button"),Q.textContent="Zoom +",H=d(),P=h("canvas"),g(r,"for","colors"),g(n,"class","svelte-1t5shnu"),g(x,"for","iterations"),g($,"type","number"),g($,"name","iterations"),g(k,"class","divider svelte-1t5shnu"),void 0===e[3]&&E((()=>e[11].call(C))),g(f,"class","svelte-1t5shnu"),g(A,"class","svelte-1t5shnu"),g(Q,"class","svelte-1t5shnu"),g(F,"class","svelte-1t5shnu"),g(P,"class","svelte-1t5shnu")},m(t,s){a(t,n,s),l(n,r),l(n,o);for(let t=0;t<T.length;t+=1)T[t].m(n,null);a(t,i,s),a(t,f,s),l(f,x),l(f,w),l(f,$),b($,e[2]),l(f,y),l(f,k),l(f,_),l(f,C);for(let t=0;t<Y.length;t+=1)Y[t].m(C,null);v(C,e[3]),l(f,I),K.m(f,null),a(t,M,s),a(t,F,s),l(F,R),l(F,W),l(F,A),l(F,D),l(F,Q),a(t,H,s),a(t,P,s),e[14](P),j||(L=[p($,"input",e[10]),p($,"change",e[5]),p(C,"change",e[11]),p(A,"click",e[12]),p(Q,"click",e[13]),p(P,"click",e[15])],j=!0)},p(t,[e]){if(33&e){let s;for(O=t[0],s=0;s<O.length;s+=1){const r=S(t,O,s);T[s]?T[s].p(r,e):(T[s]=B(r),T[s].c(),T[s].m(n,null))}for(;s<T.length;s+=1)T[s].d(1);T.length=O.length}if(4&e&&m($.value)!==t[2]&&b($,t[2]),0&e){let n;for(X=q,n=0;n<X.length;n+=1){const s=N(t,X,n);Y[n]?Y[n].p(s,e):(Y[n]=U(s),Y[n].c(),Y[n].m(C,null))}for(;n<Y.length;n+=1)Y[n].d(1);Y.length=X.length}8&e&&v(C,t[3]),J===(J=G(t))&&K?K.p(t,e):(K.d(1),K=J(t),K&&(K.c(),K.m(f,null)))},i:t,o:t,d(t){t&&c(n),u(T,t),t&&c(i),t&&c(f),u(Y,t),K.d(),t&&c(M),t&&c(F),t&&c(H),t&&c(P),e[14](null),j=!1,s(L)}}}function X(t,e,n){let s;i(t,O,(t=>n(4,s=t)));let r,o,l=["#000000","#6200FF","#FFE100","#FF0000"],a=-2,c=1,u=-1,h=1,f={x:(c+a)/2,y:(h+u)/2},d=500,p="1920x1080";function g(){o.setColors(l),o.drawMandelbrot(a,c,u,h,d)}function b(t){let e=(t.offsetX-r.clientWidth/2)/r.clientWidth,n=(t.offsetY-r.clientHeight/2)/r.clientHeight,s=Math.abs(c-a),o=Math.abs(h-u);a+=e*s,c+=e*s,u+=n*o,h+=n*o,f={x:(c+a)/2,y:(h+u)/2},g()}function v(t){let e=t?.9:1.1,n=Math.abs(c-a)/2,s=Math.abs(h-u)/2;a=f.x-n*e,c=f.x+n*e,u=f.y-s*e,h=f.y+s*e,g()}$((()=>{n(1,r.width=900,r),n(1,r.height=600,r),o=new P(r,10),g()}));return[l,r,d,p,s,g,b,v,function(){O.set(!0),function(t,e,n,s,r,o){let i=parseInt(r.split("x")[0]),l=parseInt(r.split("x")[1]),a=i/l,c=document.createElement("canvas");c.width=i,c.height=l;let u=Math.abs(n-e)/(2*a),h=t.y-u,f=t.y+u,d=new P(c,10);d.setColors(o),d.drawMandelbrot(e,n,h,f,s);let p=setInterval((()=>{if(d.isComplete()){clearInterval(p),d.destroy();let t=c.toDataURL("image/png");t=t.replace(/^data:image\/[^;]*/,"data:application/octet-stream"),t=t.replace(/^data:application\/octet-stream/,"data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=mandelbrot.png");let e=document.createElement("a");e.href=t,e.download="mandelbrot.png",document.body.append(e),e.click(),e.remove(),O.set(!1)}}),200)}(f,a,c,d,p,l)},function(t,e){t[e]=this.value,n(0,l)},function(){d=m(this.value),n(2,d)},function(){p=function(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}(this),n(3,p)},t=>v(!1),t=>v(!0),function(t){k[t?"unshift":"push"]((()=>{r=t,n(1,r)}))},t=>b(t)]}return new class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),H(this,t,X,T,o,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
