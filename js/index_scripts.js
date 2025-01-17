/*
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/.
 * Copyright (c) 2016 Julian Garnier
 */

window.onload = function() {

  var messagesEl = document.querySelector('.messages');
  var typingSpeed = 20;
  var loadingText = '<b>•</b><b>•</b><b>•</b>';
  var messageIndex = 0;

  var getCurrentTime = function() {
    var date = new Date();
    var hours =  date.getHours();
    var minutes =  date.getMinutes();
    var current = hours + (minutes * .01);
    if (current >= 5 && current < 19) return 'Have a nice day🌞.<br>-Jiamin';
    if (current >= 19 && current < 22) return 'Have a nice evening❤️.<br>-Jiamin';
    if (current >= 22 || current < 5) return 'Have a good night🌛.<br>-Jiamin';
  }

  var messages = [
    'Hey there 👋. How are you doing? I\'m <a target="_blank" href="http://jiaminhe.com" >Jiamin He. </a>',
    // 'Hey there 👋. How are you doing? I\'m <a target="_blank" href="http://jiaminhe.com" >Jiamin He. </a><br><a target="_blank" href=" ">Interesting facts of me</a> ',
    'I am a Problem Solver + Idea Creator + Action Doer. </br> I\'m currently working at <a target="_blank" href="https://www.csail.mit.edu/"> MIT-CSAIL </a>, focusing on Human-Computer Interaction and Personal Fabrication.👇<br> You can contact me at <a href="mailto:jiaminhe@mit.edu">jiaminhe@mit.edu</a>',
    'Want to know more about me? <a target="_blank" href="http://jiaminhe.com/projects" >My Projects</a> + <a target="_blank" href="https://github.com/jiamin-he" >My Github</a> + <a target="_blank" href="https://www.linkedin.com/in/he-jiamin-4bb418125/" >My LinkedIn</a> + <a target="_blank" href="https://jiamin-he.github.io/files/Jiamin_He_Resume_2018.pdf" >My CV</a> + <a target="_blank" href="http://jiaminhe.com/blog/" >My Blog</a>.',
    
    // 'Hey there 👋. How are you doing? I\'m <a target="_blank" href="http://jiaminhe.com" >Jiamin He. </a><br><a target="_blank" href=" ">Interesting facts of me</a> ',
    // 'I am a Problem Solver + Idea Creator + Action Doer. I\'m currently working at MIT-CSAIL...👇<br><a target="_blank" href="https://twitter.com/juliangarnier">twitter.com/juliangarnier</a><br><a target="_blank" href="https://codepen.io/juliangarnier">codepen.io/juliangarnier</a><br><a target="_blank" href="https://github.com/juliangarnier">github.com/juliangarnier</a><br> You can contact me at <a href="mailto:hejiamin1995@gmail.com">hejiamin1995@gmail.com</a>',
    // 'I like...(life,hobbies,social network)<br>links<br><a target="_blank" href="http://jiaminhe.com/about">about me</a><br><a target="_blank" href="http://jiaminhe.com/blog">blog</a>',
    // 'Hey there 👋. How are you doing? I\'m <a target="_blank" href="http://jiaminhe.com" >Jiamin He. </a><br><a target="_blank" href=" ">Interesting facts of me</a> ',
    // 'I do...(work)(link to github.) I\'m currently ...👇<br><a target="_blank" href="https://twitter.com/juliangarnier">twitter.com/juliangarnier</a><br><a target="_blank" href="https://codepen.io/juliangarnier">codepen.io/juliangarnier</a><br><a target="_blank" href="https://github.com/juliangarnier">github.com/juliangarnier</a><br> You can contact me at <a href="mailto:hejiamin1995@gmail.com">hejiamin1995@gmail.com</a>',
    // 'I like...(life,hobbies,social network)<br>links<br><a target="_blank" href="http://jiaminhe.com/about">about me</a><br><a target="_blank" href="http://jiaminhe.com/blog">blog</a>',


//     '',
    getCurrentTime(),
  ]

  var getFontSize = function() {
    return parseInt(getComputedStyle(document.body).getPropertyValue('font-size'));
  }

  var pxToRem = function(px) {
    return px / getFontSize() + 'rem';
  }

  var createBubbleElements = function(message, position) {
    var bubbleEl = document.createElement('div');
    var messageEl = document.createElement('span');
    var loadingEl = document.createElement('span');
    bubbleEl.classList.add('bubble');
    bubbleEl.classList.add('is-loading');
    bubbleEl.classList.add('cornered');
    bubbleEl.classList.add(position === 'right' ? 'right' : 'left');
    messageEl.classList.add('message');
    loadingEl.classList.add('loading');
    messageEl.innerHTML = message;
    loadingEl.innerHTML = loadingText;
    bubbleEl.appendChild(loadingEl);
    bubbleEl.appendChild(messageEl);
    bubbleEl.style.opacity = 0;
    return {
      bubble: bubbleEl,
      message: messageEl,
      loading: loadingEl
    }
  }

  var getDimentions = function(elements) {
    return dimensions = {
      loading: {
        w: '4rem',
        h: '2.25rem'
      },
      bubble: {
        w: pxToRem(elements.bubble.offsetWidth + 4),
        h: pxToRem(elements.bubble.offsetHeight)
      },
      message: {
        w: pxToRem(elements.message.offsetWidth + 4),
        h: pxToRem(elements.message.offsetHeight)
      }
    }
  }

  var sendMessage = function(message, position) {
    var loadingDuration = (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed/3) ;
    var elements = createBubbleElements(message, position);
    messagesEl.appendChild(elements.bubble);
    messagesEl.appendChild(document.createElement('br'));
    var dimensions = getDimentions(elements);
    elements.bubble.style.width = '0rem';
    elements.bubble.style.height = dimensions.loading.h;
    elements.message.style.width = dimensions.message.w;
    elements.message.style.height = dimensions.message.h;
    elements.bubble.style.opacity = 1;
    var bubbleOffset = elements.bubble.offsetTop + elements.bubble.offsetHeight;
    if (bubbleOffset > messagesEl.offsetHeight) {
      var scrollMessages = anime({
        targets: messagesEl,
        scrollTop: bubbleOffset,
        duration: 200
      });
    }
    var bubbleSize = anime({
      targets: elements.bubble,
      width: ['0rem', dimensions.loading.w],
      marginTop: ['2.5rem', 0],
      marginLeft: ['-2.5rem', 0],
      duration: 200,
      easing: 'easeOutElastic'
    });
    var loadingLoop = anime({
      targets: elements.bubble,
      scale: [1.05, .95],
      duration: 200,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad'
    });
    var dotsStart = anime({
      targets: elements.loading,
      translateX: ['-2rem', '0rem'],
      scale: [.5, 1],
      duration: 100,
      delay: 15,
      easing: 'easeOutElastic',
    });
    var dotsPulse = anime({
      targets: elements.bubble.querySelectorAll('b'),
      scale: [1, 1.25],
      opacity: [.5, 1],
      duration: 200,
      loop: true,
      direction: 'alternate',
      delay: function(i) {return (i * 100) + 35}
    });
    setTimeout(function() {
      loadingLoop.pause();
      dotsPulse.restart({
        opacity: 0,
        scale: 0,
        loop: false,
        direction: 'forwards',
        update: function(a) {
          if (a.progress >= 65 && elements.bubble.classList.contains('is-loading')) {
            elements.bubble.classList.remove('is-loading');
            anime({
              targets: elements.message,
              opacity: [0, 1],
              duration: 100,
            });
          }
        }
      });
      bubbleSize.restart({
        scale: 1,
        width: [dimensions.loading.w, dimensions.bubble.w ],
        height: [dimensions.loading.h, dimensions.bubble.h ],
        marginTop: 0,
        marginLeft: 0,
        begin: function() {
          if (messageIndex < messages.length) elements.bubble.classList.remove('cornered');
        }
      })
    }, loadingDuration - 15);
  }

  var sendMessages = function() {
    var message = messages[messageIndex];
    if (!message) return;
    sendMessage(message);
    ++messageIndex;
    setTimeout(sendMessages, (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed/3) + anime.random(100, 300));
  }

  sendMessages();

}
