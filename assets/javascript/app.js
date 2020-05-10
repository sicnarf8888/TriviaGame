$(document).ready(function () {
    // ----------------------------TRIVIA GAME----------------------------

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var timeRemaining = 16;
    var intervalID;
    var indexQandA = 0; //index to load a different question each round without the game reset or screen refresh
    var answered = false; //variable to stop the timer if user has clicked an answer
    var correct;
    var triviaGame = [{
        question: "What is the formation of blood cells called ?",
        answer: ["Hypochromia", "Hemoglobin", "Hematopoiesis", "Hypoxia"],
        correct: "2",
        image: ("assets/images/Hematopoiesis.jpg")
    }, {
        question: "What is the Medical term for a white blood cells?",
        answer: ["Erythrocyte", "Leukocyte", "Thrombocyte", "Xanthocyte"],
        correct: "1",
        image: ("assets//images/Leukocyte.webp")
    }, {
        question: "What is the hormone that regulates platelet production?",
        answer: ["Globulin", "Albumin", "Thrombopoietin", "Fibrinogen"],
        correct: "2",
        image: ("assets//images/Thrombopoietin.jpg")
    }, {
        question: "Which is NOT a type of granulocyte?",
        answer: ["Nuetrophil", "Basophil", "Eosinophil", "Monophil"],
        correct: "3",
        image: ("assets//images/Granulocyte.jpg")
    }, {
        question: "What Blood disorder is caused by a combination of ineffective platelet function and an abnormal blood clotting factor? ",
        answer: ["Sickle Cell Anemia", "Von Willebrand's Disease", "Thalassemia", "Erythroblastosis Fetalis"],
        correct: "2",
        image: ("assets/images/Blood disorders.png")
    }, {
        question: "What is the average life span of a red blood cell?",
        answer: ["10 days", "120 days", "25 days", "425 days"],
        correct: "1",
        image: ("assets//images/red_blood_cells_605.jpg")
    }, {
        question: "Which of these is not an anticoagulant?",
        answer: ["Heparin", "Konye", "Coumadin", "Warfarin"],
        correct: "1",
        image: ("assets//images/Anticoagulant.jpg")
    }, {
        question: "What is the medical term for nosebleed?",
        answer: ["Embolus", "Epistaxis", "Erythroblast", "Eosinophilia"],
        correct: "1",
        image: ("assets//images/Epistaxis.jpg")
    }];

    // ------------- FUNCTION DECLARATIONS ----------------------------


    function startGame() {
        console.log("game has begun");
        $('.start-button').remove();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unansweredQuestions = 0;
        loadQandA();
    }

    function loadQandA() {
        answered = false; // will allow timeRemaining to be pushed back to <h5> after round reset....else statement in function timer()
        timeRemaining = 16;
        intervalID = setInterval(timer, 1000);
        if (answered === false) {
            timer();
        }
        correct = triviaGame[indexQandA].correct;
        var question = triviaGame[indexQandA].question;
        $('.question').html(question);
        for (var i = 0; i < 4; i++) {
            var answer = triviaGame[indexQandA].answer[i];
            $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
        }

        $("h4").click(function () {
            var id = $(this).attr('id');
            if (id === correct) {
                answered = true; // stops the timer
                $('.question').text("THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
                correctAnswer();
            } else {
                answered = true; //stops the timer
                $('.question').text("YOU CHOSE: " + triviaGame[indexQandA].answer[id] + ".....HOWEVER THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
                incorrectAnswer();
            }
        });
    }

    function timer() {
        if (timeRemaining === 0) {
            answered = true;
            clearInterval(intervalID);
            $('.question').text("THE CORRECT ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
            unAnswered();
        } else if (answered === true) {
            clearInterval(intervalID);
        } else {
            timeRemaining--;
            $('.timeRemaining').text('YOU HAVE ' + timeRemaining + ' SECONDS TO CHOOSE');
        }
    }

    function correctAnswer() {
        correctAnswers++;
        $('.timeRemaining').text("YOU HAVE ANSWERED CORRECTLY!").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function incorrectAnswer() {
        incorrectAnswers++;
        $('.timeRemaining').text("YOU HAVE ANSWERED INCORRECTLY!").css({
            'color': '#3D414F'
        });
        resetRound();

    }

    function unAnswered() {
        unansweredQuestions++;
        $('.timeRemaining').text("YOU FAILED TO CHOOSE AN ANSWER").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function resetRound() {
        $('.answersAll').remove();
        $('.answers').append('<img class=answerImage width="150" height="150" src="' + triviaGame[indexQandA].image + ' ">'); // adds answer image
        indexQandA++; // increments index which will load next question when loadQandA() is called again
        if (indexQandA < triviaGame.length) {
            setTimeout(function () {
                loadQandA();
                $('.answerImage').remove();
            }, 5000); // removes answer image from previous round
        } else {
            setTimeout(function () {
                $('.question').remove();
                $('.timeRemaining').remove();
                $('.answerImage').remove();
                $('.answers').append('<h4 class= answersAll end>CORRECT ANSWERS: ' + correctAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>INCORRECT ANSWERS: ' + incorrectAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>UNANSWERED QUESTIONS: ' + unansweredQuestions + '</h4>');
                setTimeout(function () {
                    location.reload();
                }, 7000);
            }, 5000);
        }
    };

    $('.startButton').on("click", function () {
        $('.startButton');
        startGame();

    });

});