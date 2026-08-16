/* =====================================================
   CODEKIDS - CODING AWARENESS PROGRAM
   VERSION 2
===================================================== */


/* ================= NAVIGATION ================= */

function goTo(id) {

    const section =
        document.getElementById(id);

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* ================= TEXT TO SPEECH ================= */

function speak(text) {

    if (!("speechSynthesis" in window)) {

        alert(
            "Text-to-Speech is not supported by your browser."
        );

        return;
    }

    window.speechSynthesis.cancel();

    const voice =
        new SpeechSynthesisUtterance(text);

    voice.rate = 0.9;

    voice.pitch = 1;

    voice.volume = 1;

    window.speechSynthesis.speak(voice);

}


/* ================= LESSONS ================= */

function runLesson(type) {

    const output =
        document.getElementById(
            "lessonOutput"
        );


    if (type === "print") {

        output.innerHTML =
            `
            <strong>Output:</strong>
            Hello World! 🎉
            `;

        speak("Hello World!");

    }

}


/* ================= INPUT EXAMPLE ================= */

function inputExample() {

    const name =
        prompt("What is your name?");


    if (!name) {

        return;

    }


    const output =
        document.getElementById(
            "lessonOutput"
        );


    output.innerHTML =
        `
        <strong>Output:</strong>
        Hello ${name}! 👋
        `;


    speak(
        "Hello " + name
    );

}


/* ================= LOOP EXAMPLE ================= */

function loopExample() {

    const output =
        document.getElementById(
            "lessonOutput"
        );


    output.innerHTML =
        `
        <strong>Output:</strong><br><br>

        1️⃣ Hi<br>
        2️⃣ Hi<br>
        3️⃣ Hi<br>
        4️⃣ Hi<br>
        5️⃣ Hi
        `;


    speak(
        "The loop printed Hi five times."
    );

}


/* ================= PLAYGROUND ================= */

function runCode() {

    const code =
        document.getElementById(
            "codeBox"
        ).value.trim();


    const output =
        document.getElementById(
            "output"
        );


    /*
       This simple playground understands
       print("something")
    */


    const match =
        code.match(
            /print\s*\(\s*["'](.*?)["']\s*\)/
        );


    if (match) {

        output.innerText =
            match[1];


        speak(
            match[1]
        );

    }

    else {

        output.innerText =
            'Try this example:\n\nprint("Hello Students!")';

    }

}


/* ================= GAME ================= */

function game(correct) {

    const result =
        document.getElementById(
            "gameResult"
        );


    if (correct) {

        result.innerHTML =
            "🎉 Correct! The answer is <b>Hello! Shrusti</b>.";

        result.style.color =
            "#159b59";


        speak(
            "Correct! The answer is Hello! Shrushti."
        );

    }

    else {

        result.innerHTML =
            "❌ Not correct. Try again!";

        result.style.color =
            "#e04b4b";


        speak(
            "Not correct. Try again."
        );

    }

}


/* =====================================================
   QUIZ
===================================================== */


/* ================= QUIZ QUESTIONS ================= */

const questions = [

    {
        q:
            "Which programming language are we learning?",

        options:
            [
                "Java",
                "Python",
                "C++",
                "PHP"
            ],

        answer: 1
    },


    {
        q:
            "Which function displays output in Python?",

        options:
            [
                "input()",
                "show()",
                "print()",
                "output()"
            ],

        answer: 2
    },


    {
        q:
            "Which symbol is used for comments in Python?",

        options:
            [
                "//",
                "#",
                "$",
                "@"
            ],

        answer: 1
    },


    {
        q:
            "Which one stores text?",

        options:
            [
                "String",
                "Integer",
                "Float",
                "Boolean"
            ],

        answer: 0
    },


    {
        q:
            "Which statement is used for decision making?",

        options:
            [
                "if",
                "for",
                "print",
                "input"
            ],

        answer: 0
    },


    {
        q:
            "Which statement can repeat instructions?",

        options:
            [
                "if",
                "for",
                "print",
                "input"
            ],

        answer: 1
    },


    {
        q:
            "What does input() do?",

        options:
            [
                "Shows output",
                "Takes user input",
                "Repeats code",
                "Deletes code"
            ],

        answer: 1
    },


    {
        q:
            "Which is a correct Python variable?",

        options:
            [
                "age = 10",
                "10 = age",
                "age == 10",
                "variable age"
            ],

        answer: 0
    },


    {
        q:
            "What is coding?",

        options:
            [
                "Giving instructions to a computer",
                "Watching videos",
                "Drawing",
                "Playing games"
            ],

        answer: 0
    },


    {
        q:
            "What can coding improve?",

        options:
            [
                "Logical thinking",
                "Problem solving",
                "Creativity",
                "All of these"
            ],

        answer: 3
    }

];


/* ================= QUIZ VARIABLES ================= */

let current = 0;

let totalScore = 0;

let selected = false;


/* ================= LOAD QUIZ ================= */

function loadQuiz() {

    const box =
        document.getElementById(
            "quiz"
        );


    if (!box) {

        return;

    }


    const question =
        questions[current];


    let html = `

        <div class="question-number">

            Question
            ${current + 1}
            of
            ${questions.length}

        </div>


        <div class="question">

            ${question.q}

        </div>

    `;


    question.options.forEach(
        function(option, index) {

            html += `

                <button
                    class="option"
                    onclick="chooseAnswer(${index})">

                    ${option}

                </button>

            `;

        }
    );


    box.innerHTML =
        html;


    selected = false;


    /*
       Change button text on last question
    */

    const nextButton =
        document.getElementById(
            "next"
        );


    if (nextButton) {

        if (
            current ===
            questions.length - 1
        ) {

            nextButton.innerText =
                "Finish Quiz 🏆";

        }

        else {

            nextButton.innerText =
                "Next Question →";

        }

    }


    /*
       Clear old score message
    */

    const score =
        document.getElementById(
            "score"
        );


    if (score) {

        score.innerHTML = "";

    }

}


/* ================= CHOOSE ANSWER ================= */

function chooseAnswer(index) {

    if (selected) {

        return;

    }


    selected = true;


    const correct =
        questions[current].answer;


    const buttons =
        document.querySelectorAll(
            ".option"
        );


    if (index === correct) {

        totalScore++;


        buttons[index].style.background =
            "#baf5d0";

        buttons[index].style.color =
            "#126b3d";


        speak(
            "Correct answer!"
        );

    }

    else {

        buttons[index].style.background =
            "#ffd0d0";

        buttons[index].style.color =
            "#9b2525";


        buttons[correct].style.background =
            "#baf5d0";

        buttons[correct].style.color =
            "#126b3d";


        speak(
            "Incorrect. The correct answer is " +
            questions[current].options[correct]
        );

    }

}


/* ================= NEXT QUESTION ================= */

function nextQuestion() {

    if (!selected) {

        alert(
            "Please select an answer first."
        );

        return;

    }


    current++;


    if (
        current <
        questions.length
    ) {

        loadQuiz();

    }

    else {

        finishQuiz();

    }

}


/* ================= FINISH QUIZ ================= */

function finishQuiz() {

    const quiz =
        document.getElementById(
            "quiz"
        );


    quiz.innerHTML = `

        <div style="text-align:center;">

            <div style="font-size:60px;">
                🏆
            </div>

            <h2>
                Quiz Completed!
            </h2>

            <p style="font-size:24px;">
                Your Score:
                <strong>
                    ${totalScore}/${questions.length}
                </strong>
            </p>

        </div>

    `;


    const next =
        document.getElementById(
            "next"
        );


    if (next) {

        next.style.display =
            "none";

    }


    let message;


    if (totalScore >= 8) {

        message =
            "🌟 Excellent! You are a Coding Star!";

    }

    else if (totalScore >= 5) {

        message =
            "🚀 Good job! Keep practicing!";

    }

    else {

        message =
            "💪 Keep learning and try again!";

    }


    const score =
        document.getElementById(
            "score"
        );


    if (score) {

        score.innerHTML =
            message;

    }


    speak(
        "Quiz completed. Your score is " +
        totalScore +
        " out of " +
        questions.length +
        ". " +
        message
    );

}


/* ================= RESET QUIZ ================= */

function resetQuiz() {

    current = 0;

    totalScore = 0;

    selected = false;


    const next =
        document.getElementById(
            "next"
        );


    if (next) {

        next.style.display =
            "block";

    }


    loadQuiz();

}


/* =====================================================
   CERTIFICATE
===================================================== */

function certificate() {

    const name =
        document.getElementById(
            "studentName"
        ).value.trim();


    const message =
        document.getElementById(
            "certificateMessage"
        );


    if (!name) {

        message.innerText =
            "⚠️ Please enter your name.";

        message.style.color =
            "#e04b4b";

        return;

    }


    message.innerHTML =
        `
        🎉 Congratulations
        <strong>${name}</strong>!
        <br>
        You have successfully completed
        the Coding Awareness Program.
        `;


    message.style.color =
        "#159b59";


    speak(
        "Congratulations " +
        name +
        ". You have successfully completed the Coding Awareness Program."
    );

}


/* =====================================================
   DARK MODE
===================================================== */

const themeButton =
    document.getElementById(
        "themeBtn"
    );


if (themeButton) {

    themeButton.addEventListener(
        "click",
        function() {

            document.body.classList.toggle(
                "dark"
            );


            if (
                document.body.classList.contains(
                    "dark"
                )
            ) {

                this.innerText =
                    "☀️";

            }

            else {

                this.innerText =
                    "🌙";

            }

        }
    );

}


/* =====================================================
   START WEBSITE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadQuiz();

    }
);