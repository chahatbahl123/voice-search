(function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=1)})([,function(){(function(a){'use strict';function b(){let a=document.head||document.getElementsByTagName('head')[0],b=document.createElement('style');b.type='text/css',b.styleSheet?b.styleSheet.cssText=g:b.appendChild(document.createTextNode(g)),a.appendChild(b)}function c(){var a;return a=document.createElement('i'),a.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path></svg>`,a.classList.add('icon'),a}function d(a){let d=document.createElement('div'),f=c(),g=document.createElement('dialog'),h=document.querySelector(this.agent.target)||document.body;g.innerHTML='<p class="vs-head"> Listening ... </p>',e.mic=d,e.dialog=g,b(),d.classList.add('vs'),this.agent.bgColor&&(d.style.backgroundColor=this.agent.bgColor),this.agent.borderColor&&(d.style.borderColor=this.agent.borderColor),g.appendChild(f.cloneNode(!0)),d.appendChild(g),d.appendChild(f),h.appendChild(d),d.style.opacity='1',d.addEventListener('click',a)}function e(a){this.agent=new f,Object.assign(this.agent,k,a),this.agent.onresult=l.bind(this.agent),this.agent.onspeechend=h.bind(this.agent),this.agent.onerror=i.bind(this.agent),this.agent.onnomatch=j.bind(this.agent),this.agent.onstart=function(){e.dialog.showModal()},this.agent.onsoundstart=function(){console.log('Sound Started')},this.agent.onsoundend=function(){console.log('Sound ended')},this.agent.onaudiostart=function(){console.log('Audio Started')},this.agent.onaudioend=function(){console.log('Audio ended')},d.call(this,this.start.bind(this))}var f=a.SpeechRecognition||a.webkitSpeechRecognition;if(!f)return!1;const g=`@keyframes listening{0%{box-shadow:0 0 50px #afabab}10%{box-shadow:0 0 45px #afabab}20%{box-shadow:0 0 43px #afabab}30%{box-shadow:0 0 40px #afabab}40%{box-shadow:0 0 30px #afabab}50%{box-shadow:0 0 27px #afabab}60%{box-shadow:0 0 25px #afabab}70%{box-shadow:0 0 20px #afabab}80%{box-shadow:0 0 15px #afabab}90%{box-shadow:0 0 10px #afabab}100%{box-shadow:0 0 0 #afabab}}.vs{opacity:0;transition:opacity .5s ease;position:absolute;right:10px;top:10px;box-sizing:border-box;text-align:center;color:#fff}.vs .icon{display:inline-block;width:50px;height:50px;color:#fff}.vs dialog .icon{animation-duration:1s;animation-iteration-count:infinite;animation-name:listening;box-shadow:0 0 50px #afabab;width:66px;background-color:#f78f26;border-radius:50%;color:#fff;height:66px;padding-top:16px}.vs .icon path{fill:#434343}.vs dialog .icon path{fill:#fff}.vs dialog{width:93vw;padding:40px 0;top:70px;border:transparent;background-color:#f2f2f2}.vs .vs-head{font-size:1em;text-transform:capitalize}.vs dialog::backdrop{background-color:rgba(0,0,0,.83)}@media (max-width:767px){.main-header .top-search-input .search-containter{right:56px;top:10px;transition:right .5s ease}.main-header.show-close-btn .close-search{right:121px;top:10px;background-position:-49px -199px}}`,h=function(){e.dialog.querySelector('.icon').style.animationName='none',this.stop()},i=function(a){console.log('Speech recognition error detected: '+a.error+' message '+a.message),this.stop()},j=function(){console.log('Could not recognise the speech, try again...'),this.stop()},k={lang:'en-US',continuous:!1,maxAlternatives:1,interimResults:!1,dictionary:{},mic:'icon',bgColor:'#fff'},l=function(a){var b,c=a.results[0][0].transcript.toLowerCase();a.stopImmediatePropagation(),e.dialog.querySelector('.vs-head').innerHTML=`Looking for '${c}'`,b=this.dictionary[c]?this.dictionary[c]:this.baseUrl+'?q='+encodeURI(c),window.location=b};e.prototype.start=function(){e.mic.style.animationName='listening',this.agent.start()},e.prototype.stop=function(){e.mic.style.animationName='none',this.agent.stop()},e.prototype.abort=function(){e.mic.style.animationName='none',this.agent.abort()},a.Recognition=e})(window)}]);
//# sourceMappingURL=vs.target.js.map