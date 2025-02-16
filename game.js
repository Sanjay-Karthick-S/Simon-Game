// alert("Hello!")
buttons = ["red", "blue", "green", "yellow"];
gamePattern = [];
gameStart = false;
level = 0;
$("h1").text("Press a key to start");
userClickedPattern = [];
$(".btn").click(function () {
    var clicked = $(this).attr("id");
    userClickedPattern.push(clicked);

    animatePress(clicked);
    playSound(clicked);
    checkAnswer(userClickedPattern.length-1);
    console.log(userClickedPattern);
});
$("body").keypress(function () {
    if (!gameStart) {




        gameStart = true;
        nextSequence();

    }
});
function checkAnswer(currentLevel) { 
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("\nsuccess!");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        console.log("wrong!");

        playSound("wrong");
        $("body").addClass("game-over").delay(200).queue(function (next) {
            $(this).removeClass('game-over');
            next();
        });
        $("h1").text("Game Over, Press any key to start again.");
        restart();
    }
}

function nextSequence() {

    $("h1").text("Level " + level);
    level++;
    userClickedPattern = [];
    var rand = Math.floor(Math.random() * 4);
    randChosenColor = buttons[rand];
    gamePattern.push(randChosenColor);
    playSound(randChosenColor);
    $("#" + randChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);



}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed").delay(100).queue(function (next) {
        $(this).removeClass('pressed');
        next();
    });

}
function restart() {
    gamePattern=[];
    level=0;
    gameStart=false;
}
