//global variables

var questionCount = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;
var countdown = 0;

//question bank

var quiz = {
    "questionBank": [{
        "question": "... The Wu-Tang Clan?",
        "options": ["Redman", "Method Man", "GZA", "Ghostface Killah"],
        "answer": "Redman",
        "answerInfo": "Redman released two collaboration albums with Method Man"
    }, {
        "question": "... A Tribe Called Quest?",
        "options": ["Q-Tip", "Jarobi White", "Phife Dawg", "Busta Rhyhmes"],
        "answer": "Busta Rhyhmes",
        "answerInfo": "Busta was featured on the song 'Oh My God' by ATCQ"
    }, {
        "question": "... The Beatles?",
        "options": ["John Lennon", "Bob Dylan", "Ringo Starr", "George Harrison"],
        "answer": "Bob Dylan",
        "answerInfo": "Bob Dylan introduced The Beatles to cannabis"
    }, {
        "question": "... The Supremes?",
        "options": ["Patti Labelle", "Diana Ross", "Mary Wilson", "Florence Ballard"],
        "answer": "Patti Labelle",
        "answerInfo": "Was part of Labelle"
    }, {
        "question": "... Run-D.M.C?",
        "options": ["Joseph Simmons", "Darryl McDaniels", "Jason Mizell", "James Todd Smith"],
        "answer": "James Todd Smith",
        "answerInfo": "James Todd Smith a.k.a. LL Cool J"
    }, {
        "question": "... Destiny's Child?",
        "options": ["Beyoncé Knowles", "Serena Williams", "Michelle Williams", "Kelly Rowland"],
        "answer": "Serena Williams",
        "answerInfo": "Serena Williams is a pro tennis player"
    }, {
        "question": "...the Fugees?",
        "options": ["Lauryn Hill", "Nas", "Pras", "Wyclef Jean"],
        "answer": "Nas",
        "answerInfo": "Nas was a member of The Firm"
    }, {
        "question": "...The Strokes?",
        "options": ["Julian Casablancas", "Nick Valensi", "Nikolai Fraiture", "Albert Hammond"],
        "answer": "Albert Hammond",
        "answerInfo": "Alber Hammond is Albert Hammond Jr.'s father"
    }, {
        "question": "...N-Sync?",
        "options": ["Lance Bass", "Chris Kirkpatrick", "Joey Fatone", "Jeff Timmons"],
        "answer": "Jeff Timmons",
        "answerInfo": "Jeff Timmons was part of 98 degrees"
    }, {
        "question": "...the Beastie Boys?",
        "options": ["Vanilla Ice", "Ad-Rock", "MCA", "Mike D"],
        "answer": "Vanilla Ice",
        "answerInfo": "Ice Ice Baby"
    }]
}

$('.results').hide();
$('#multipleChoice').hide();
//functions

//start game fucntion
function start() {
    askQuestion(questionCount);
    //timer
    counter = setInterval(nextQuestion, 1000);
}
//start game event listener
$('.start').on('click', function() {
    $('.start').hide();
    questionCount = 0, correctAnswers = 0, wrongAnswers = 0, unanswered = 0, countdown = 11;
    start();
});

//function to display questions 
function askQuestion(questionCount) {
    countdown = 11;
    $('#multipleChoice').show();
    if (questionCount < 10) {
        //display question and choices
        $('#quizQuestion').html(quiz.questionBank[questionCount].question);
        $('#a').html(quiz.questionBank[questionCount].options[0]);
        $('#b').html(quiz.questionBank[questionCount].options[1]);
        $('#c').html(quiz.questionBank[questionCount].options[2]);
        $('#d').html(quiz.questionBank[questionCount].options[3]);
    } else {
        results();
        clearInterval(counter);
    }

}
//functiion to check answer
function checkAnswer(guessed) {
    if (guessed === quiz.questionBank[questionCount].answer) {
        return true;
    } else {
        return false;
    }
}

//event listener for answers
$('.list-group-item').on('click', function() {

    if (checkAnswer($(this).html()) === true) {
        correctAnswers++;
        questionCount++;
        askQuestion(questionCount);
        $('#information').html(quiz.questionBank[questionCount].answerInfo);
        console.log(" # of Correct Answers: " + correctAnswers);
    } else if (checkAnswer($(this).html()) === false) {
        wrongAnswers++;
        questionCount++;
        askQuestion(questionCount);
        $('#information').html(quiz.questionBank[questionCount].answerInfo);
        console.log(" # of Incorrect Answers: " + wrongAnswers);
    }
});

//results function
function results() {
    $('#quizQuestion').hide();
    $('.choices').hide();
    $('#timer').hide();
    $('#information').hide();
    $('.results').show();
    $('#correct').html("Correctly Answered " + correctAnswers);
    $('#wrong').html("Wrongly Answered " + wrongAnswers);
    $('#unanswered').html("Unanswered " + unanswered);
}

//function for next question / timer
function nextQuestion() {
    countdown--;

    //displays timer 
    $('#timer').html('<h4>Time Remaining: ' + countdown + ' seconds</h4>');

    //when timer hits 0, countdown is stopped
    if (countdown === 0) {
        unanswered++;
        $('#information').html(quiz.questionBank[questionCount].answerInfo);
        //moves to next question
        questionCount++;

        //displays results when at the end
        if (questionCount == 10) {
            results();
        } else {
            //go to next question
            askQuestion(questionCount);
            //resets timer
            countdown = 11;
            counter = setInterval(nextQuestion, 1000);
        }

    }
}

//reset function
function reset() {
    questionCount = 0, correctAnswers = 0, wrongAnswers = 0, unanswered = 0, countdown = 11;
    start()
    $('#quizQuestion').show();
    $('.choices').show();
    $('#timer').show();
    $('#information').show();
    $('.results').hide();
}

//reset button
$('#reset').on('click', function() {
    reset()
});
