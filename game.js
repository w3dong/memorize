// buttons
var buttonColours = ["red", "blue", "green", "yellow"];
// pattern that user need to follow
var gamePattern = [];
// users' input pattern (should match with game pattern to win)
var userClickedPattern = [];
// game level
var level = 0;
// check if game start
var started = false;
// check if user has failed at least once
var failed = false;
// timer variables
var hour = 6;
var minute = 5;
var second = 6;
var afternoon = "PM";
// music timing - play for 60s
var time = 1;

// when any key is pressed and game have not started, start game
$("*").keypress(function(event) {
  if (!started) {
    started = true;
    // play next sequence
    nextSequence();
    // update level
    $("#level-title").text("level " + level);
    // add timer if this is first round and user have not failed once
    // play audio for clock
    if(!failed){
      addTimer();
      playClock();
      playAudio("clock");
    }
  }
});

// record & check user's clicked button & play sound & animation
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playAudio(userChosenColour);
  animatePress(userChosenColour);
  if (userClickedPattern.length == gamePattern.length) {
    checkAnswer();
  }
});
// randomly generate next button sequence, update level, clear user's sequence
function nextSequence() {
  var randomNum = Math.floor(Math.random() * 4);
  var randomColor = buttonColours[randomNum];

  $("#" + randomColor).fadeOut(90).fadeIn(90).fadeOut(90).fadeIn(90);
  playAudio(randomColor);

  level++;
  $("#level-title").text("level " + level);

  gamePattern.push(randomColor);
  userClickedPattern = [];
}
// play audio correspondingly
function playAudio(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// generate animation when button is pressed
function animatePress(currColor) {
  $("#" + currColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currColor).removeClass("pressed");
  }, 100);
}

// play sound & animation effect when user lose game
function gameFail() {
  failed = true;
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  playAudio("wrong");
  $("#level-title").text("You Failed. Press A Key to try again");
  // reset game values
  restart();
}

function gameSucceed(){
  window.location.replace("storystart.html");
}

// check if user's click button match game pattern
function checkAnswer() {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] != gamePattern[i]) {
      gameFail();
    }
  }
  if(level == 6){
    gameSucceed();
  }
  // if user does not failed on this round (started = true)
  if (started) {
    // after 1s, play next sequence
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}
// reset needed game variables
function restart() {
  // reset value if time not run out but user fail
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  // reset time variables and failed boolean if time also run out
  if(minute == 6 && second == 7){
    hour = 6;
    minute = 5;
    second = 6;
    failed = false;
  }
}

// show leading 0 for number when it's less than 10
function showZero(num) {
  return (num < 10) ? ("0" + num) : num;
}
// update minute when second == 60
function update(){
  second ++;
  if(second == 60){
    second = 0;
    minute ++;
  }
}

// set a timer
function addTimer() {
  // set a timer for 1 min
  var timer = window.setInterval(function() {
    $("#digital-clock").text(showZero(hour) + " : " + showZero(minute) + " : " + showZero(second) + " " + afternoon);
    update();
    if(minute == 6 && second == 7){
       clearInterval(timer);
       gameFail();
       $("#digital-clock").addClass("game-over");
    }
  }, 1000);
}

// play clock mp3 for a round of game (1min)
function playClock(){
  var clock = window.setInterval(function() {
    playAudio("clock");
    time ++;
    if(time == 6){
       clearInterval(clock);
    }
  }, 10000);
}
