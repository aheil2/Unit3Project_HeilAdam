$(document).ready(function () {
    $(":radio").change(answerQuestion);
    $("#quizForm").submit(scoreQuiz);
    $("#closeIcon").click(closePopup);
    //run modal popup function
    showPopup();
    //calculate modal box position
    function center() {
        var modal = $("#modal");
        var top = Math.max($(window).height() - modal.outerHeight(), 0) / 2;
        var left = Math.max($(window).width() - modal.outerWidth(), 0) / 2;
        modal.css("top", top + $(window).scrollTop());
        modal.css("left", left + $(window).scrollLeft());
    }
    //show modal popup and transparent overlay
    function showPopup() {
        center();
        $(window).resize(center);
        $("#overlay").show();
        $("#modal").show();
    }
    //hide modal popup and transparent overlay and show stars indent
    function closePopup() {
        $("#overlay").hide();
        $("#modal").hide();
        $(window).off("resize");
        showStars();
    }
    const POINTS_PER_QUESTION = 4;
    const TOTAL_QUESTIONS = 8;
    var currentQuestion = 1;
    //star array to make a star themed indent between paragraphs
    var stars = [];
    function showStars() {
        for (var i=0; i < TOTAL_QUESTIONS; i++) {
            stars.push(`*`);
        }
        $("#stars").text(stars.join(" "));
    }

    var answers = {
        explorer: 0,
        combat: 0,
        totalPoints: 0
    };

    //toggle first quiz question
    $("#q1").slideToggle();

    //run every time radio is clicked and adjust explorer/combat rating
    function answerQuestion() {
        var checkedRadio = $(this);
        var explorerAmount = checkedRadio.data("explorer");
        var combatAmount = checkedRadio.data("combat");
        answers.explorer += explorerAmount;
        answers.combat += combatAmount;
        answers.totalPoints += POINTS_PER_QUESTION;
        hideCurrent();
    }
    //hides question after radio clicked
    function hideCurrent() {
        $("#q" + currentQuestion).slideToggle(showNext);
    }
    //show next question until it reaches TOTAL_QUESTIONS
    function showNext() {
        if (currentQuestion === TOTAL_QUESTIONS) {
            //scroll animation for quiz button
            $("#scoreQuizButton").fadeIn(scrollDown);
        } else {
            currentQuestion++;
            $("#q" + currentQuestion).slideToggle(scrollDown);
        }
    }
    //scroll down animation for each question of quiz
    function scrollDown() {
        $("html, body").animate({scrollTop: $(document).height()}, "slow");
    }
    //calculate and display quiz results
    function scoreQuiz(event) {
        event.preventDefault();
        var score = {};
        score.percentExplorer = Math.round(answers.explorer / answers.totalPoints * 100);
        score.percentCombat = 100 - score.percentExplorer;
        score.percentExplorerText = score.percentExplorer + "%";
        score.percentCombatText = score.percentCombat + "%";
        if (score.percentExplorer > score.percentCombat) {
            score.winner = "are an Exploration Pilot!";
        } else if (score.percentExplorer < score.percentCombat) {
            score.winner = "are a Combat Pilot";
        } else {
            score.winner = "can be anything you want to be!";
        }
        $("#percentCombat").width(score.percentCombatText).text(score.percentCombatText);
        $("#percentExplorer").width(score.percentExplorerText).text(score.percentExplorerText);
        $("#description").text(`You ${score.winner}`);
        $("#scoreQuizButton").fadeOut(showResults);
    }
    //scroll animate the resuls of quiz
    function showResults() {
        $("#results").slideToggle();
    }
    //contact validation rules
    var myRules =
        {
            myName:
                {
                    required: true
                },
            myEmail:
                {
                    required: true
                },
            myComments:
                {
                    required: true
                }
        };
    //contact validation message
    var myMessages =
        {
            myName:
                {
                    required: "Please provide your name"
                },
            myEmail:
                {
                    required: "Please provide your email"
                },
            myComments:
                {
                    required: "Please provide your comments"
                }
        };
    //run validation function when user submits contact form
    $("#contactForm").validate(
        {
            submitHandler: runMyProgram,
            rules: myRules,
            messages: myMessages
        }
    );
    //validation function and text response for broken rules
    function runMyProgram() {
        var yourName = $("#myName").val();
        $("#message").text(`Thank you ${yourName} for your message!`);

    }
});

