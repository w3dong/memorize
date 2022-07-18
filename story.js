var evelines = [
  "Sometimes it's good to forget, but sometimes it might not.",
  "But I'm here to help you MEMORIZE if you wish so.",
  "Good Luck, and remember: the Key is to memorize."
]
var lineNum = 0;

$(".conversation1").on("click", function(){
  if(lineNum >= evelines.length){
     window.location.replace("simon-game.html");
  }
  $("#chat-box").text(evelines[lineNum]);
  lineNum++;
  if(lineNum == 2){
    $(".game-img").attr("src","images/eve-eye-open.png");
  }

});
