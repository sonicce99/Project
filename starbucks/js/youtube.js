 // 2. This code loads the IFrame Player API code asynchronously.
 var tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.

//  var player;
 function onYouTubeIframeAPIReady() {
   new YT.Player('player', { // HTML ID선택자임
     height: '360',
     width: '640',
     videoId: 'LGD8IjSW-FQ', // 최초 재생할 유튜브 영상 아이디
    playerVars: {
      autoplay: true,
      loop:true,
      playlist: 'LGD8IjSW-FQ'
    },
    events: {
      onReady: function (event) {
        event.target.mute() //영상 음소거
      }
    }
   });
 }