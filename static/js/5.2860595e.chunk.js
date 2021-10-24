(this["webpackJsonp@evildev/website"]=this["webpackJsonp@evildev/website"]||[]).push([[5],{48:function(e,t,r){"use strict";r.r(t),r.d(t,"Meta",(function(){return a})),r.d(t,"default",(function(){return i}));r(0);var n=r(52);function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o.apply(this,arguments)}const a={id:"euler-problem-001",title:"Solving Euler Problems in F# - 001",tags:"fsharp euler"},l={Meta:a};function i({components:e,...t}){return Object(n.a)("wrapper",o({},l,t,{components:e,mdxType:"MDXLayout"}),Object(n.a)("p",null,'In my quest to master everything there is to know about functional programming and F#, today I start working through the "Euler Problems"'),Object(n.a)("p",null,"The first problem is pretty basic, so I won't talk to much on it, but the problem we're trying to solve:"),Object(n.a)("blockquote",null,Object(n.a)("p",{parentName:"blockquote"},"If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.\nFind the sum of all the multiples of 3 or 5 below 1000.")),Object(n.a)("p",null,"This kind of problem is exactly what functional languages are designed to solve, and in a very basic one liner, we have our F# solution:"),Object(n.a)("pre",null,Object(n.a)("code",{parentName:"pre"},"let answer = [1..999] |> Seq.where(fun x -> x % 3 = 0 || x % 5 = 0) |> Seq.sum\n")))}i.isMDXComponent=!0},52:function(e,t,r){"use strict";r.d(t,"a",(function(){return b}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=o.a.createContext({}),p=function(e){var t=o.a.useContext(u),r=t;return e&&(r="function"===typeof e?e(t):i(i({},t),e)),r},s={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},f=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),f=p(r),b=n,m=f["".concat(l,".").concat(b)]||f[b]||s[b]||a;return r?o.a.createElement(m,i(i({ref:t},u),{},{components:r})):o.a.createElement(m,i({ref:t},u))}));function b(e,t){var r=arguments,n=t&&t.mdxType;if("string"===typeof e||n){var a=r.length,l=new Array(a);l[0]=f;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"===typeof e?e:n,l[1]=i;for(var u=2;u<a;u++)l[u]=r[u];return o.a.createElement.apply(null,l)}return o.a.createElement.apply(null,r)}f.displayName="MDXCreateElement"}}]);
//# sourceMappingURL=5.2860595e.chunk.js.map