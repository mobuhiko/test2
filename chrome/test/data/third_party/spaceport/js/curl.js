var m=!0;
(function(x,E,h){var I,J;function n(a,b){return 0==T.call(a).indexOf("[object "+b)}function U(a){function b(b){if(b in a)return b="."!=a[b].charAt(0)?(!a.path||y(a.path)?a.path:a.path+"/")+a[b]:q(a[b],a.path),r(b)}n(a,"String")&&(a=r(a),a={name:a,path:a,main:I,lib:J});a.path=a.path||"";a.h=b("lib");a.i=b("main");return a}function K(a){var b,d,c,e=[];s=a.baseUrl||"";if(a.debug)z=m,k.cache=i,k.cfg=a,k.undefine=function(a){delete i[a]};var f=a.paths;for(b in f)d=r(b.replace("!","!/")),c=t[d]={path:r(f[b])},
c.f=(c.path.match(L)||[]).length,e.push(d);f=a.packages;for(b in f)d=r(f[b].name||b),c=t[d]=U(f[b]),c.f=(c.path.match(L)||[]).length,e.push(d);M=RegExp("^("+e.sort(function(a,b){return t[a].f<t[b].f}).join("|").replace(/\//g,"\\/")+")(?=\\/|$)");o=a.pluginPath||o}function V(){}function A(a){function b(a,b){return W(a,b||V,e)}function d(a){return B(u(q(a,c)),s)}var c=a.substr(0,a.lastIndexOf("/")),e={baseName:c},f={};e.d={exports:f,module:{id:q(a,c),uri:d(a),exports:f}};z&&(b.curl=k);e.e=e.d.require=
b;b.toUrl=d;return e}function G(){}function X(a){G.prototype=a;a=new G;G.prototype=C;return a}function H(){function a(a,b){f.push([a,b])}function b(a){c(m,a)}function d(a){c(!1,a)}function c(c,e){a=c?function(a){a&&a(e)}:function(a,b){b&&b(e)};b=d=function(){throw Error("Promise already completed.");};for(var g,i=0;g=f[i++];)(g=g[c?0:1])&&g(e)}var e=this,f=[];this.c=function(b,c){a(b,c)};this.b=function(a){e.l=a;b(a)};this.a=function(a){e.n=a;d(a)}}function p(a){H.apply(this);this.name=a}function y(a){return"/"==
a.charAt(a.length-1)}function r(a){return y(a)?a.substr(0,a.length-1):a}function u(a,b){function d(a){e=a.replace(M,function(b){c=t[b]||{};f=m;return c.i&&b==a?c.i:c.h?c.h:c.path||""})}var c,e,f;b&&d(b+"!/"+a);f||d(a);return e}function B(a,b,d){return(b&&!Y.test(a)?(!b||y(b)?b:b+"/")+a:a)+(d&&!Z.test(a)?".js":"")}function $(a,b,d){var c=E.createElement("script");c.type="text/javascript";c.onload=c[N]=function(d){d=d||x.event;if("load"===d.type||aa[this.readyState])delete D[a.name],this.onload=this[N]=
this.onerror=null,b(c)};c.onerror=function(){d(Error("Syntax error or http error: "+a.url))};c.charset=a.charset||"utf-8";c.async=m;c.src=a.url;D[a.name]=c;O.insertBefore(c,O.firstChild)}function ba(a){var b,d,c,e,f=a.length;c=a[f-1];e=n(c,"Function");2==f?n(a[0],"Array")?d=a[0]:b=a[0]:3==f&&(b=a[0],d=a[1]);!d&&e&&0<c.length&&(d=["require","exports","module"]);return{name:b,j:d||[],k:e?c:function(){return c}}}function P(a,b){z&&console&&console.log("curl: resolving",a.name);var d=A(a.baseName||a.name);
Q(b.j,d,function(c){try{var e=b.k.apply(d.d.exports,c)||d.d.exports;z&&console&&console.log("curl: defined",a.name,e.toString().substr(0,50).replace(/\n/," "))}catch(f){a.a(f)}a.b(e)},a.a)}function R(a){$(a,function(){var b=v;v=C;!1!==a.m&&(b?b.g?a.a(Error(b.g.replace("${url}",a.url))):P(a,b):a.a(Error("define() not found or duplicates found: "+a.url)))},a.a)}function q(a,b){return a.replace(ca,function(a,c,e){return(e?b.substr(0,b.lastIndexOf("/")):b)+"/"})}function da(a,b){var d,c,e,f,j,F;c=a.indexOf("!");
if(0<=c){e=a.substr(0,c);f=a.substr(c+1);var g=u(e);0>g.indexOf("/")&&(g=u((!o||y(o)?o:o+"/")+g));var l=i[e];if(!l)l=i[e]=new p(e),l.url=B(g,s,m),l.baseName=g,R(l);b=A(b.baseName);b.e.toUrl=function(a){a=u(a,e);return B(a,s)};F=X(e?h.plugins&&h.plugins[e]:h)||{};var k=function(a){return q(a,b.baseName)};j=new p(a);l.c(function(g){var h;f=a.substr(c+1);f="normalize"in g?g.normalize(f,k,F):k(f);d=e+"!"+f;h=i[d];if(!h){h=new p(d);f&&!g.dynamic&&(i[d]=h);var l=h.b;l.resolve=l;l.reject=h.a;g.load(f,b.e,
l,F)}h.c(j.b,j.a)},j.a)}else if(f=d=q(a,b.baseName),j=i[f],!j)j=i[f]=new p(f),j.url=B(u(f),s,m),R(j);return j}function Q(a,b,d,c){for(var e=[],f=a.length,j=f,h=!1,g=0;g<j&&!h;g++)(function(a,g){g in b.d?(e[a]=b.d[g],f--):g?da(g,b).c(function(b){e[a]=b;0==--f&&(h=m,d(e))},function(a){h=m;c(a)}):f--})(g,a[g]);0==f&&!h&&d(e)}function W(a,b,d){if(n(a,"String")){d=(d=i[a])&&d.l;if(d===C)throw Error("Module is not already resolved: "+a);return d}Q(a,d,function(a){b.b?b.b(a):b.apply(null,a)},function(a){if(b.a)b.a(a);
else throw a;})}function k(){var a=ea.call(arguments),b,d;n(a[0],"Object")&&(h=a.shift(),K(h));b=[].concat(a[0]);a=a[1];d=A("");var c=new H,e={};e.then=function(a,b){c.c(function(b){a&&a.apply(null,b)},function(a){if(b)b(a);else throw a;});return e};e.next=function(a,b){var h=c;c=new H;h.c(function(){d.e(a,c,d)},function(a){c.a(a)});b&&c.c(function(a){b.apply(this,a)});return e};a&&e.then(a);d.e(b,c,d);return e}function S(){var a=ba(arguments),b=a.name;if(null==b)if(v!==C)v={g:"Multiple anonymous defines found in ${url}."};
else{var d;if(!n(x.opera,"Opera"))for(var c in D)if("interactive"==D[c].readyState){d=c;break}if(!(b=d))v=a}if(null!=b)(d=i[b])||(d=i[b]=new p(b)),d.m=!1,"resolved"in d||P(d,a,A(b))}var O=E.head||E.getElementsByTagName("head")[0],s,o="curl/plugin",t={},i={},v,D={},T={}.toString,C,ea=[].slice,Y=/^\/|^[^:]+:\/\//,ca=/^(\.)(\.)?(\/|$)/,L=/\//,Z=/\?/,M,aa={loaded:1,interactive:1,complete:1},N="onreadystatechange";I="./lib/main";J="./lib";var z;n(h,"Function")||K(h);var w;w=h.apiName||"curl";(h.apiContext||
x)[w]=k;i[w]=new p(w);i[w].b(k);x.define=k.define=S;k.version="0.5.4";S.amd={plugins:m,jQuery:m}})(this,document,this.curl||{});
