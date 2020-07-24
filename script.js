const STORE = [
    {
        question: "In the first episode, King Robert Baratheon says, “In my dreams, I kill him every night.” Who is he referring to?",
        answers: [
            "His son",
            "Rhaegar Targaryen",
            "Aerys Targaryen",
            "Lord Eddard Stark"
        ],
        correctAnswer: 1
            // "Rhaegar Targaryen" 
    },
    {
        question: "Who must an Unsullied kill to complete their training?",
        answers: [
            "A random citizen of Astapor",
            "Another Unsullied",
            "A newborn slave child",
            "A demon from hell"
        ],
        correctAnswer: 2
            //"A newborn slave child"
    },
    {
        question: "Who created the first White Walker?",
        answers: [
            "The Children of the Forest",
            "The Night’s Watch",
            "The First Men",
            "Snow White"
        ],
        correctAnswer: 0
            //"The Children of the Forest"
    },
    {
        question: "What is the main religion of the Seven Kingdoms?",
        answers: [
            "Drowned God",
            "Faith of the Seven",
            "Buddhism",
            "Old Gods of the Forest"
        ],
        correctAnswer: 1
            //"Faith of the Seven"
    },
    {
        question: "During the battle between Prince Oberyn Martell and The Mountain, whose name is Oberyn shouting?",
        answers: [
            "Elia",
            "Ellaria",
            "Khan",
            "Lyanna"
        ],
        correctAnswer: 0
            //"Elia"
    },
    {
        question: "Which name is given to the people who live beyond The Wall?",
        answers: [
            "Outkasts",
            "Wildling",
            "Snowmen",
            "Crannogmen"
        ],
        correctAnswer: 1
            //"Wildling"
    },
    {
        question: "How did Tywin Lannister die?",
        answers: [
            "Shot with a crossbow while taking a dump",
            "Heart attack while marrying his daughter",
            "In the Battle of the Bastards",
            "Old age"
        ],
        correctAnswer: 0
            //"Shot with a corssbow while taking a dump"
    },
    {
        question: "What is Arya Stark's sword called?",
        answers: [
            "Knife",
            "Excalibur",
            "Thread",
            "Needle"
        ],
        correctAnswer: 3
            //"Needle"
    },
    {
        question: "What does a Lannister always do?",
        answers: [
            "Pays their debts",
            "Tells the truth",
            "Washes between their toes",
            "Drinks their wine"
        ],
        correctAnswer: 0
            //"Pays their debts"
    },
    {
        question: "How did the very first episode of Game of Thrones end?",
        answers: [
            "Bran lost his last baby tooth",
            "Cersei confessed her love for her twin brother Jaime",
            "Ned got a new hot rod",
            "Jaime Lannister threw Bran Stark out of a tower at Winterfell"
        ],
        correctAnswer: 3
            //"Jaime Lannister threw Bran Stark out of a tower at Winterfell"
    },
]

let score = 0;
let questionNumber = 0;
let hasSelectedAnswer = false;

function updateQuestionNumber(){
    questionNumber++;
    console.log("questionNumber is " + questionNumber);
}

function getSelectedStatus(){
    return parseInt($("input[name='choice']:checked").val()) === undefined;
}

function startQuizListener(){
    $(".question-container").hide();
    $(".question-correct").hide();
    $(".question-wrong").hide();
    $(".results").hide();
    $("#submit-answer-button").prop("disabled", true);
    $(".start-page").on("click", "button", function(event){
        $(".start-page").hide();
        displayQuestion();
        console.log("startQuizListener ran");
    });
    
    $(".choose").on("click", function(event){
        console.log("raadio!!!");
        $("#submit-answer-button").prop("disabled", false);
    })
    $("#submit-answer").on("click", function(event){
        console.log("answer submit button clicked");
        $(".question-container").hide();
        questionResult();
    });
    $("#correct-next-question, #wrong-next-question").on("click", function(event){
        $("#submit-answer-button").prop("disabled", true);
        console.log("next question clicked");
        $(".question-correct").hide();
        $(".question-wrong").hide();
        nextQuestion();
    });
    $("#restart-button").on("click", function(event){
        restart();
    });
}

function displayQuestion(){
    $(".question-number").text(questionNumber + 1);
    $(".score").text(score);
    let currentIndex = STORE[questionNumber];
    $(".question").text(currentIndex.question);
    $("#label0").text(currentIndex.answers[0]);
    $("#label1").text(currentIndex.answers[1]);
    $("#label2").text(currentIndex.answers[2]);
    $("#label3").text(currentIndex.answers[3]);
    $(".question-container").show();
}

function questionResult(){
    if(questionNumber === STORE.length - 1){
        $("#correct-next-question, #wrong-next-question").text("See results");
    }
    if(parseInt($("input[name='choice']:checked").val()) === STORE[questionNumber].correctAnswer){
        score++;
        $(".question-correct").show();
    }
    else{
        $("#right-answer").text("The correct answer is " + STORE[questionNumber].answers[STORE[questionNumber].correctAnswer] + ", you fool.");
        $(".question-wrong").show();
    }
    $("input[name='choice']").prop('checked',false);
}

function nextQuestion(){
    if(questionNumber === STORE.length - 1){
        results();
    }else{
        updateQuestionNumber();
        displayQuestion();
    }
}

function results(){
    $("#final-score").text(score + "/10");
    $(".results").show();
}

function restart(){
    score = 0;
    questionNumber = 0;
    displayQuestion();
}

$(startQuizListener);


/*
if you cant say pseudocode step in code, keep pseudocoding deeper.
if you find yourself writing the same code over and over again, that could probably be a function

//POA (plan of action)

render start page to the DOM
-create function to render page to dom
--use $().html()
start quiz
-create function startQuiz
--listen for begin/submit button click on start page
---on click, hide start page and load first question
----locate STORE array, index 0
-----STORE[0];
------replace current question with current index
-------$().text(STORE[questionNumber])
add 1 to the question counter
-creat variable for counter (let questionNumber = 0)
-- counter++
render first question and choices
choose answer with radio buttons
unlock submit button
submit answer
-listen for submit button click
--check answer
---compare checked answer to correct answer
----if checked answer is equal to correct answer, add 1 to score counter, and render correct answer page
otherwise, render incorrect answer page
listen for next question button click
locate next question and choices
render next question and choices
repeat till done
render score and replay button page
listen for click on replay button
when restart button is clicked, restart quiz
*/