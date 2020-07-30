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

function renderQuestionScreen(){
    const html =  `
    <header>
        <img class="banner" src="image/game-of-thrones-transparent.png" alt="Game of Thrones logo">
        <ul class="question-score">
            <li class="size-me">Question:
                <span class="question-number">0</span>/10
            </li> 
            <li class="size-me">Score: 
                <span class="score"> 0</span>
            </li>
        </ul>    
    </header>
    <section class="question-answers" id="question-answers">
        
        <div class="answers">
            <form class="radio-buttons">
                <div class="question">
                </div>
                <input type="radio" id="choice0" name="choice" class="choose" value=0>
                <label id="label0" for="choice0"></label><br>
                <input type="radio" id="choice1" name="choice" class="choose" value=1>
                <label id="label1" for="choice1"></label><br>
                <input type="radio" id="choice2" name="choice" class="choose" value=2>
                <label id="label2" for="choice2"></label><br>
                <input type="radio" id="choice3" name="choice" class="choose" value=3>
                <label id="label3" for="choice3"></label><br>
            </form>
        </div>
        <div class="btn" id="submit-answer">
        <button type="button" id="submit-answer-button">Submit</button> 
        </div>
    </section>`
    $(".question-container").html(html);
}

function renderCorrectPage(){
    const html = `
    <div class="content">
        <div class="title">
            CORRECT!!!
        </div>

        <div class="cta">
            <img class="image-correct" src="image/oberyn-jump-for-joy.jpg" alt="You got it right!">
        </div>
        
        <div class="btn">
            <button type="button" class="next-button" id="correct-next-question">Next</button>
        </div>

    </div>`
    
    $(".question-correct").html(html);
}

function renderWrongPage(){
    const html = `
        <div class="content">
            <div class="title">
                Wrong.
            </div>

            <div class="cta">
                <img class="image-wrong" src="image/got-sheeran.jpg" alt="You got it wrong.">
            </div>
            <div id="right-answer">

            </div>
            
            <div class="btn">
                <button type="button" class="next-button" id="wrong-next-question">Next</button>
            </div>
        </div>`

    $(".question-wrong").html(html);
}

function renderResults(){
    const html = `
            <div class="results-bg" >
                <div class="title">
                    YOU SCORED
                </div>
                
                <div class="final-score" id="final-score">
                    results will load here.
                </div>
                
                <div class="btn">
                    <button type="button" class="restart-button" id="restart-button">Restart</button>
                </div>

            </div>`

    $(".results").html(html);
}

function getSelectedStatus(){
    return parseInt($("input[name='choice']:checked").val()) === undefined;
}

function clickBegin(){
    $(".start-page").on("click", "button", function(event){
        $(".start-page").hide();
        displayQuestion();
        console.log("startQuizListener ran");
    });
}

function radioClicks(){
    $(".question-container").on("click", ".choose", function(event){
        console.log("raadio!!!");
        $("#submit-answer-button").prop("disabled", false);
    })
}

function clickSubmitAnswer(){
    $(".question-container").on("click", "#submit-answer", function(event){
        console.log("answer submit button clicked");
        $(".question-container").hide();
        questionResult();
    });
}

function clickNextQuestion(){
    $(".question-correct, .question-wrong").on("click", ".next-button", function(event){
        $("#submit-answer-button").prop("disabled", true);
        console.log("next question clicked");
        $(".question-correct").hide();
        $(".question-wrong").hide();
        nextQuestion();
    });
}

function clickRestart(){
    $(".results").on("click", ".restart-button", function(event){
        restart();
    });
}

function startQuizListener(){
    $(".question-container").hide();
    $(".question-correct").hide();
    $(".question-wrong").hide();
    $(".results").hide();
    
    
    clickBegin();

    radioClicks();
    
    clickSubmitAnswer();
    
    clickNextQuestion();

    clickRestart();
    
}

function displayQuestion(){
    renderQuestionScreen();
    $(".question-number").text(questionNumber + 1);
    $(".score").text(score);
    let currentIndex = STORE[questionNumber];
    $(".question").text(currentIndex.question);
    $("#label0").text(currentIndex.answers[0]);
    $("#label1").text(currentIndex.answers[1]);
    $("#label2").text(currentIndex.answers[2]);
    $("#label3").text(currentIndex.answers[3]);
    $(".question-container").show();
    $("#submit-answer-button").prop("disabled", true);
    radioClicks();
}

function questionResult(){
    if(questionNumber === STORE.length - 1){
        $("#correct-next-question, #wrong-next-question").text("See results");
    }
    if(parseInt($("input[name='choice']:checked").val()) === STORE[questionNumber].correctAnswer){
        score++;
        renderCorrectPage();
        $(".question-correct").show();
    }else{
        renderWrongPage();
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
    renderResults();
    $("#final-score").text(score + "/10");
    $(".results").show();
}

function restart(){
    score = 0;
    questionNumber = 0;
    $(".results").hide();
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