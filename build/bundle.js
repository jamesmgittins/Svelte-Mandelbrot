var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function i(t){t.forEach(e)}function s(t){return"function"==typeof t}function o(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function r(t,e){t.appendChild(e)}function a(t,e,n){t.insertBefore(e,n||null)}function c(t){t.parentNode.removeChild(t)}function u(t){return document.createElement(t)}function l(){return t=" ",document.createTextNode(t);var t}function h(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function f(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function d(t){return""===t?null:+t}function p(t,e){t.value=null==e?"":e}let m;function g(t){m=t}function $(t){(function(){if(!m)throw new Error("Function called outside component initialization");return m})().$$.on_mount.push(t)}const b=[],x=[],v=[],y=[],w=Promise.resolve();let _=!1;function k(t){v.push(t)}let M=!1;const E=new Set;function C(){if(!M){M=!0;do{for(let t=0;t<b.length;t+=1){const e=b[t];g(e),W(e.$$)}for(g(null),b.length=0;x.length;)x.pop()();for(let t=0;t<v.length;t+=1){const e=v[t];E.has(e)||(E.add(e),e())}v.length=0}while(b.length);for(;y.length;)y.pop()();_=!1,M=!1,E.clear()}}function W(t){if(null!==t.fragment){t.update(),i(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(k)}}const A=new Set;function D(t,e){-1===t.$$.dirty[0]&&(b.push(t),_||(_=!0,w.then(C)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function F(o,r,a,u,l,h,f=[-1]){const d=m;g(o);const p=r.props||{},$=o.$$={fragment:null,ctx:null,props:h,update:t,not_equal:l,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:[]),callbacks:n(),dirty:f,skip_bound:!1};let b=!1;if($.ctx=a?a(o,p,((t,e,...n)=>{const i=n.length?n[0]:e;return $.ctx&&l($.ctx[t],$.ctx[t]=i)&&(!$.skip_bound&&$.bound[t]&&$.bound[t](i),b&&D(o,t)),e})):[],$.update(),b=!0,i($.before_update),$.fragment=!!u&&u($.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);$.fragment&&$.fragment.l(t),t.forEach(c)}else $.fragment&&$.fragment.c();r.intro&&((x=o.$$.fragment)&&x.i&&(A.delete(x),x.i(v))),function(t,n,o){const{fragment:r,on_mount:a,on_destroy:c,after_update:u}=t.$$;r&&r.m(n,o),k((()=>{const n=a.map(e).filter(s);c?c.push(...n):i(n),t.$$.on_mount=[]})),u.forEach(k)}(o,r.target,r.anchor),C()}var x,v;g(d)}class j{constructor(t,e){this.stripeData=[],this.ctx=t.getContext("2d"),this.canvasHeight=t.height,this.stripeWidth=t.width/e,this.stripes=e,this.workers=[];for(let t=0;t<e;t++){let t=new Worker("./js/mandelworker.js");t.addEventListener("message",(t=>this.processMessage(t))),this.workers.push(t)}}processMessage(t){this.stripeData[t.data.stripe]=t.data.data,this.animationFrame&&cancelAnimationFrame(this.animationFrame),this.animationFrame=requestAnimationFrame((()=>this.draw()))}draw(){for(let t=0;t<this.stripes;t++)this.stripeData[t]&&this.ctx.putImageData(new ImageData(this.stripeData[t],this.stripeWidth,this.canvasHeight),t*this.stripeWidth,0)}drawMandelbrot(t,e,n,i,s){let o=Math.abs(e-t)/this.stripes;for(let e=0;e<this.stripes;e++)this.workers[e].postMessage({width:this.stripeWidth,height:this.canvasHeight,xmin:t+e*o,xmax:t+(e+1)*o,ymin:n,ymax:i,iterations:s,stripe:e})}}function H(e){let n,s,o,m,g,$,b,x,v,y,w,_,k,M,E;return{c(){n=u("div"),s=u("label"),s.textContent="Iterations",o=l(),m=u("input"),g=l(),$=u("button"),$.textContent="Redraw",b=l(),x=u("div"),v=u("button"),v.textContent="Zoom -",y=l(),w=u("button"),w.textContent="Zoom +",_=l(),k=u("canvas"),f(s,"for","iterations"),f(m,"type","number"),f(m,"name","iterations"),f($,"class","svelte-1up0m0g"),f(n,"class","svelte-1up0m0g"),f(v,"class","svelte-1up0m0g"),f(w,"class","svelte-1up0m0g"),f(x,"class","svelte-1up0m0g"),f(k,"class","svelte-1up0m0g")},m(t,i){a(t,n,i),r(n,s),r(n,o),r(n,m),p(m,e[1]),r(n,g),r(n,$),a(t,b,i),a(t,x,i),r(x,v),r(x,y),r(x,w),a(t,_,i),a(t,k,i),e[8](k),M||(E=[h(m,"input",e[5]),h($,"click",e[2]),h(v,"click",e[6]),h(w,"click",e[7]),h(k,"click",e[9])],M=!0)},p(t,[e]){2&e&&d(m.value)!==t[1]&&p(m,t[1])},i:t,o:t,d(t){t&&c(n),t&&c(b),t&&c(x),t&&c(_),t&&c(k),e[8](null),M=!1,i(E)}}}function I(t,e,n){let i,s,o=-2,r=1,a=-1,c=1,u={x:(r+o)/2,y:(c+a)/2},l=500;function h(){s.drawMandelbrot(o,r,a,c,l)}function f(t){let e=(t.offsetX-i.clientWidth/2)/i.clientWidth,n=(t.offsetY-i.clientHeight/2)/i.clientHeight,s=Math.abs(r-o),l=Math.abs(c-a);o+=e*s,r+=e*s,a+=n*l,c+=n*l,u={x:(r+o)/2,y:(c+a)/2},h()}function p(t){let e=t?.9:1.1,n=Math.abs(r-o)/2,i=Math.abs(c-a)/2;o=u.x-n*e,r=u.x+n*e,a=u.y-i*e,c=u.y+i*e,h()}$((()=>{n(0,i.width=900,i),n(0,i.height=600,i),s=new j(i,10),h()}));return[i,l,h,f,p,function(){l=d(this.value),n(1,l)},t=>p(!1),t=>p(!0),function(t){x[t?"unshift":"push"]((()=>{i=t,n(0,i)}))},t=>f(t)]}return new class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(i(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),F(this,t,I,H,o,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
