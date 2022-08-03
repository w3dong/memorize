const section = document.getElementById("game-board");
var playLiveCount = $("#player-live");
var playerLive = 6;
var numCorrect = 0;
var round = 0;
var backMusic = new Audio("sounds/card-bgm.mp3");
var played = false;
// set up player Live
playLiveCount.text(playerLive);
// generate cards
const getData = () => [
  {imgSrc: "images/sheep.svg", name:"sheep"},
  {imgSrc: "images/bone.svg", name:"bone"},
  {imgSrc: "images/face-smile.svg", name:"smile"},
  {imgSrc: "images/moon.svg", name:"moon"},
  {imgSrc: "images/apple.svg", name:"apple"},
  {imgSrc: "images/heart.svg", name:"heart"},

  {imgSrc: "images/sheep.svg", name:"sheep"},
  {imgSrc: "images/bone.svg", name:"bone"},
  {imgSrc: "images/face-smile.svg", name:"smile"},
  {imgSrc: "images/moon.svg", name:"moon"},
  {imgSrc: "images/apple.svg", name:"apple"},
  {imgSrc: "images/heart.svg", name:"heart"},
];

const getData1 = () => [
  {imgSrc: "images/WildSheep.svg", name:"sheep"},
  {imgSrc: "images/eye.svg", name:"eye"},
  {imgSrc: "images/crying-eye.svg", name:"cry"},
  {imgSrc: "images/angel.svg", name:"angle"},
  {imgSrc: "images/bad-apple.svg", name:"apple"},
  {imgSrc: "images/death.svg", name:"death"},

  {imgSrc: "images/WildSheep.svg", name:"sheep"},
  {imgSrc: "images/eye.svg", name:"eye"},
  {imgSrc: "images/crying-eye.svg", name:"cry"},
  {imgSrc: "images/angel.svg", name:"angle"},
  {imgSrc: "images/bad-apple.svg", name:"apple"},
  {imgSrc: "images/death.svg", name:"death"},
];

const getData2 = () => [
  {imgSrc: "images/crying-eye.svg", name:"end"},
  {imgSrc: "images/crying-eye.svg", name:"end"},
  {imgSrc: "images/crying-eye.svg", name:"end"},
  {imgSrc: "images/crying-eye.svg", name:"end"},
  {imgSrc: "images/crying-eye.svg", name:"end"},
  {imgSrc: "images/crying-eye.svg", name:"end"},
  {imgSrc: "images/crying-eye.svg", name:"end"},
   {imgSrc: "images/crying-eye.svg", name:"end"},
  {imgSrc: "images/crying-eye.svg", name:"end"},
  {imgSrc: "images/crying-eye.svg", name:"end"},
  {imgSrc: "images/crying-eye.svg", name:"end"},
  {imgSrc: "images/crying-eye.svg", name:"end"},
];

$(".test").on("click", function(){
  if ($(".toggleCard").length == 12){
    if (round < 2){
      restart();
    }
    else{
      window.location.href = "story2.html";
    }
  }
});

// randomize cards
const randomize = () => {
  var cardData = [];
  if (round == 0){
    cardData = getData();
  }
  else if(round == 1){
    cardData = getData1();
    backMusic.playbackRate = 2.0;
    $(".hint").text("He said: I'm his eve.");
    $(".hint").css("color","white");
  }
  else if(round == 2){
    cardData = getData2();
    backMusic.playbackRate = 3.0;
    $(".hint").text("But I'm not. I'm a silly, sinful, broken APPPLE!!!!");
    $(".hint").css("color","red");
  }
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
}

const cardMaker = () => {
  const cardData = randomize();
  // generate html
  cardData.forEach((item, index) => {
    const card = document.createElement("div");
    const front = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    front.classList = "front";
    back.classList = "back";
    //attach info to cardData
    front.src = item.imgSrc;
    card.setAttribute("name", item.name);
    section.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
    // when each card is flipped
    card.addEventListener("click", (e) => {
      var audio = new Audio("sounds/flip-card.mp3");
      audio.play();
      card.classList.add("toggleCard");
      const flippedCards = $(".flipped");

      checkCard(e);
      if(!card.classList.contains("match")){
        setTimeout(function() {
          card.classList.remove("toggleCard");
        }, 2000);
      }
      else{
        card.classList.add("done");
      }
    })
  });
}
const checkCard = (e) => {
  if(!played){
    backMusic.play();
    backMusic.loop = true;
    played = true;
  }

  const clicked = e.target;
  clicked.classList.add("flipped");
  const flippedCards = $(".flipped");
  // checkCard
  if (flippedCards.length == 2){
    if(flippedCards[0].getAttribute("name") == flippedCards[1].getAttribute("name")){
      console.log("matched");
      for (var i = 0; i < flippedCards.length; i++){
        flippedCards[i].classList.add("match");
        flippedCards[i].classList.remove("flipped");
      }
      if (!flippedCards[0].classList.contains("done")){
        playerLive++;
        playLiveCount.text(playerLive);
        numCorrect++;
      }
    }
    else{
      for (var i = 0; i < flippedCards.length; i++){
        flippedCards[i].classList.remove("flipped");
      }
      if (!flippedCards[0].classList.contains("done")){
        playerLive--;
        playLiveCount.text(playerLive);
      }
    }
  }
}

// restart game
function restart(){
  round++;
  numCorrect = 0;
  $(".front").remove();
  $(".card").remove();
  $(".back").remove();
  cardMaker();
}
// generate card and allow user to play
cardMaker();
