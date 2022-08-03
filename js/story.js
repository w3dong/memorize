
var musicPlay = false;
var storyPlay = false;
var story2Play = false;
var evelines = [
  "Sometimes it's good to forget, but sometimes it might not.",
  "But I'm here to help you MEMORIZE if you wish so.",
  "Good Luck, and remember: the Key is to memorize."
]

var meLines = [
  "Yes, I memorize",
  "It was a evening, while I was at my cousins' house, waiting for my parents to drive me home",
  "Getting bored, I played the simon game board I brought",
  "When I finished, I looked over the clock. It was exactly 06:06:06pm.",
  "'Just a coincidence.' I thought, switching to another card game to kill the time before my parents came.",

  "Yes, I memorize",
  "It was a evening, when I got bored of the game again, looking for something new to play with",
  "when I realized someone is LOOKING at me for all this whole time",
  "smiled and invited me to play game for fun",
  "while it wasn't fun at all."
]

var evelineNum = 0;
var mylineNum = 0;

$(".start").on("click", function() {
  if(!musicPlay){
    play("start", true);
  }
  musicPlay = true;
});


$(".conversation1").on("click", function() {
  if (evelineNum >= evelines.length) {
    window.location.replace("simon-game.html");
  }
  $("#chat-box").text(evelines[evelineNum]);
  play("beep", false);
  evelineNum++;
  if (evelineNum == 2) {
    $(".game-img").attr("src", "images/eve-eye-open.png");
  }
  if (!storyPlay){
    play("aveyond",true);
  }
  storyPlay = true;
});


$(".conversation2").on("click", function() {
  if (mylineNum == 5) {
    window.location.replace("card-game.html");
  }
  $("#chat-box").text(meLines[mylineNum]);
  play("break",false);
  if(!story2Play){
    play("themeworry",true);
    story2Play = true;
  }

  mylineNum++;
  if (mylineNum == 2) {
    $("body").addClass("evening");
  }
  else if (mylineNum == 3) {
      $(".game-img").removeClass("invisible");
      $(".game-img").attr("src", "images/simon-game.png");
  }
  else if (mylineNum == 4) {
    $(".game-img").attr("src", "images/clock.png");
    $("body").removeClass("evening");
    $("body").addClass("night");
  }
});

$(".conversation3").on("click", function() {
  $("#chat-box").text(meLines[mylineNum]);
  mylineNum++;
  play("break",false);
});

function play(name, loop){
  var audio = new Audio("sounds/"+ name + ".mp3");
  audio.play();
  if(loop){
    audio.loop = true;
  }
}
