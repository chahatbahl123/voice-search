/**
 * ***********************************
 * *********** Recognition ***********
 * ***********************************
 */

/**
 * Usage
 * const reco = new Recognition({
 *      baseUrl: 'https://www.google.co.in/search'
 * });
 */


(function(root) {
  "use strict";

  var WebSpeechRecognition = root.SpeechRecognition || root.webkitSpeechRecognition;

  if(!WebSpeechRecognition){
    return false;
  }

  const styles = `
    @keyframes listening{
      0%{box-shadow: 0px 0px 50px #afabab;}
      10%{box-shadow: 0px 0px 45px #afabab;}
      20%{box-shadow: 0px 0px 43px #afabab;}
      30%{box-shadow: 0px 0px 40px #afabab;}
      40%{box-shadow: 0px 0px 30px #afabab;}
      50%{box-shadow: 0px 0px 27px #afabab;}
      60%{box-shadow: 0px 0px 25px #afabab;}
      70%{box-shadow: 0px 0px 20px #afabab;}
      80%{box-shadow: 0px 0px 15px #afabab;}
      90%{box-shadow: 0px 0px 10px #afabab;}
      100%{box-shadow: 0px 0px 0px #afabab;}
    }
    .vs{position:fixed;right:10px;bottom:10px;border-radius:50%;background:#f68c24;box-sizing:border-box;text-align:center;color:#fff;border:0 solid #fff;animation-duration:1s;animation-iteration-count:infinite;}
    .vs .icon{
      display: inline-block;
      border-radius: 50%;
      width: 66px;
      height: 66px;
      background: -webkit-radial-gradient(#dd7e20, #ffa449);
      color: #fff;
      box-shadow: 0px 0px 5px #000;
    }
    .vs dialog .icon{animation-duration:1s;animation-iteration-count:infinite;animation-name: listening;box-shadow: 0px 0px 50px #afabab;}
    .vs .icon path{fill:#fff}
    .vs dialog{width: 93vw;padding: 50px 0;top: 70px;border: transparent;background-color: #f2f2f2;}
    .vs .vs-head{font-weight: 700;font-size: 1.25em;}
    .vs dialog::backdrop{background-color:rgba(0, 0, 0, 0.83)}
`;

  const onspeechend = function() {
    Recognition.mic.style.animationName = 'none';
    this.stop();
  };

  const onerror = function(event) {
    console.log('Speech recognition error detected: ' + event.error + " message " + event.message);
    this.stop();
  };

  const onnomatch = function() {
    console.log('Could not recognise the speech, try again...')
    this.stop();
  };

  function addStyle() {
    let head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');
      style.type = 'text/css';
      if (style.styleSheet) {
        style.styleSheet.cssText = styles;
      } else {
        style.appendChild(document.createTextNode(styles));
      }
      head.appendChild(style);
  }

  function iconFactory(type, options){
    var icon;
    switch (type) {
      case 'fontawesome':
        icon = document.createElement('i');
        icon.className = 'fa fa-microphone';
        icon.style = iconStyle;
        break;
      case 'icon': {
          icon = document.createElement('img');
          icon.src = options.icon;
          icon.style = imgStyle;
        }
        break;
      default: {
        icon = document.createElement('i');
        icon.classList.add('icon');
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="54" height="58" viewBox="0 -4 24 24"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path></svg>'
      }
    }
    return icon;
  }

  function decorate(handler) {
    let container = document.createElement('div');
    let icon = iconFactory(this.agent.mic, this.agent);
    let dialog = document.createElement('dialog');
    let header = '<p style="font-weight: 700;font-size: 1.25em;" class="vs-head"> Listening ... </p>';


    dialog.innerHTML = header;

    Recognition.mic = container;
    Recognition.dialog = dialog;

    addStyle();
    
    /*container.style = containerStyle; */
    container.classList.add('vs');

    if(this.agent.bgColor){
      container.style.backgroundColor = this.agent.bgColor;
    }

    if(this.agent.borderColor){
      container.style.borderColor = this.agent.borderColor;
    }

    dialog.appendChild(icon.cloneNode(true));

    container.appendChild(dialog);
    container.appendChild(icon);
    document.body.appendChild(container);

    container.addEventListener('click', handler);
  }

  const defaults = {
    lang: 'en-US',
    continuous: false,
    maxAlternatives: 1,
    interimResults: false,
    dictionary: {},
    mic: 'icon',
    bgColor: '#fff'
  }

  const onresult = function(event) {
    var keyword = event.results[0][0].transcript.toLowerCase();
    var url;

    event.stopImmediatePropagation();

    Recognition.dialog.querySelector('.vs-head').innerHTML = `Looking for ${keyword} ...`;

    if (this.dictionary[keyword]) {
      url = dictionary[keyword];
    } else {
      url = this.baseUrl + "?q=" + encodeURI(keyword);
    }
    window.location = url;
  };

  function Recognition(options) {
    this.agent = new WebSpeechRecognition();

    Object.assign(this.agent, defaults, options);

    this.agent.onresult = onresult.bind(this.agent);
    this.agent.onspeechend = onspeechend.bind(this.agent);
    this.agent.onerror = onerror.bind(this.agent);
    this.agent.onnomatch = onnomatch.bind(this.agent);
    this.agent.onstart = function(){console.log("I am starting"); Recognition.dialog.showModal();};
    this.agent.onsoundstart = function(){console.log("Sound Started")};
    this.agent.onsoundend = function(){console.log("Sound ended")};
    this.agent.onaudiostart = function(){console.log("Audio Started")};
    this.agent.onaudioend = function(){console.log("Audio ended")};

    decorate.call(this, this.start.bind(this));
  };

  Recognition.prototype.start = function() {
    Recognition.mic.style.animationName = 'listening';
    this.agent.start();
  };

  Recognition.prototype.stop = function() {
    Recognition.mic.style.animationName = 'none';
    this.agent.stop();
  };

  Recognition.prototype.abort = function() {
    Recognition.mic.style.animationName = 'none';
    this.agent.abort();
  };

  root.Recognition = Recognition;

}(window));
