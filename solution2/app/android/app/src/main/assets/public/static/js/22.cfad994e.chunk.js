/*! For license information please see 22.cfad994e.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[22],{5022:(e,t,n)=>{n.r(t),n.d(t,{createSwipeBackGesture:()=>c});var r=n(1811),a=n(9507),s=n(7909);const c=(e,t,n,c,i)=>{const o=e.ownerDocument.defaultView,u=(0,a.i)(e),h=e=>u?-e.deltaX:e.deltaX;return(0,s.createGesture)({el:e,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:e=>(e=>{const{startX:t}=e;return u?t>=o.innerWidth-50:t<=50})(e)&&t(),onStart:n,onMove:e=>{const t=h(e)/o.innerWidth;c(t)},onEnd:e=>{const t=h(e),n=o.innerWidth,a=t/n,s=(e=>u?-e.velocityX:e.velocityX)(e),c=s>=0&&(s>.2||t>n/2),l=(c?1-a:a)*n;let d=0;if(l>5){const e=l/Math.abs(s);d=Math.min(e,540)}i(c,a<=0?.01:(0,r.h)(0,a,.9999),d)}})}}}]);
//# sourceMappingURL=22.cfad994e.chunk.js.map