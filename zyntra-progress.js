/* =========================================================
   ZYNTRA PROGRESS SYSTEM
   ========================================================= */

const ZYNTRA_PROGRESS_KEY = "zyntraProgress";


/* =========================================================
   GET CURRENT USERNAME
   ========================================================= */

function getZyntraUsername(){

    const savedUser =
        localStorage.getItem("zyntraUser");

    if(!savedUser){
        return "Student";
    }

    try{

        const user =
            JSON.parse(savedUser);

        if(user.username){
            return String(user.username);
        }

        if(user.email){
            return String(user.email);
        }

        if(user.name){
            return String(user.name);
        }

    }
    catch(error){

        return savedUser;

    }

    return "Student";
}


/* =========================================================
   DEFAULT PROGRESS
   ========================================================= */

function getDefaultZyntraProgress(){

    return {

        xp: 0,

        completedChallenges: 0,

        streak: 0,

        lastStudyDate: "",

        achievements: [],

        subjects: {

            Chemistry: 0,

            Physics: 0,

            Mathematics: 0

        },

        completedLessons: []

    };

}


/* =========================================================
   GET PROGRESS
   ========================================================= */

function getZyntraProgress(){

    const saved =
        localStorage.getItem(ZYNTRA_PROGRESS_KEY);

    if(!saved){

        const defaultProgress =
            getDefaultZyntraProgress();

        localStorage.setItem(
            ZYNTRA_PROGRESS_KEY,
            JSON.stringify(defaultProgress)
        );

        return defaultProgress;

    }

    try{

        const progress =
            JSON.parse(saved);

        const defaults =
            getDefaultZyntraProgress();

        return {

            ...defaults,

            ...progress,

            subjects: {

                ...defaults.subjects,

                ...(progress.subjects || {})

            }

        };

    }
    catch(error){

        console.error(
            "Could not read ZYNTRA progress:",
            error
        );

        return getDefaultZyntraProgress();

    }

}


/* =========================================================
   SAVE PROGRESS
   ========================================================= */

function saveZyntraProgress(progress){

    localStorage.setItem(
        ZYNTRA_PROGRESS_KEY,
        JSON.stringify(progress)
    );

}


/* =========================================================
   TODAY
   ========================================================= */

function getZyntraToday(){

    const now =
        new Date();

    return now.toISOString().split("T")[0];

}


/* =========================================================
   UPDATE STREAK
   ========================================================= */

function updateZyntraStreak(progress){

    const today =
        getZyntraToday();

    if(!progress.lastStudyDate){

        progress.streak = 1;

        progress.lastStudyDate = today;

        return;

    }

    if(progress.lastStudyDate === today){

        return;

    }

    const previous =
        new Date(progress.lastStudyDate);

    const current =
        new Date(today);

    const difference =
        Math.floor(
            (current - previous)
            / (1000 * 60 * 60 * 24)
        );

    if(difference === 1){

        progress.streak =
            (progress.streak || 0) + 1;

    }
    else{

        progress.streak = 1;

    }

    progress.lastStudyDate = today;

}


/* =========================================================
   ACHIEVEMENTS
   ========================================================= */

function updateZyntraAchievements(progress){

    if(!Array.isArray(progress.achievements)){

        progress.achievements = [];

    }


    function addAchievement(id){

        if(!progress.achievements.includes(id)){

            progress.achievements.push(id);

        }

    }


    if(progress.xp >= 50){

        addAchievement("xp_50");

    }


    if(progress.xp >= 100){

        addAchievement("xp_100");

    }


    if(progress.completedChallenges >= 10){

        addAchievement("questions_10");

    }


    if(progress.completedChallenges >= 25){

        addAchievement("questions_25");

    }


    if(progress.streak >= 3){

        addAchievement("streak_3");

    }


    if(progress.streak >= 7){

        addAchievement("streak_7");

    }

}


/* =========================================================
   COMPLETE OLD-STYLE CHALLENGE
   ========================================================= */

function completeZyntraChallenge(
    subject,
    completionKey
){

    const progress =
        getZyntraProgress();

    const username =
        getZyntraUsername();


    const storageKey =
        "zyntraChallenge_" +
        subject +
        "_" +
        completionKey +
        "_" +
        username;


    if(localStorage.getItem(storageKey)){

        return false;

    }


    localStorage.setItem(
        storageKey,
        "completed"
    );


    progress.xp =
        (progress.xp || 0) + 10;


    progress.completedChallenges =
        (progress.completedChallenges || 0) + 1;


    if(!progress.subjects[subject]){

        progress.subjects[subject] = 0;

    }


    progress.subjects[subject] =
        Math.min(
            100,
            progress.subjects[subject] + 5
        );


    updateZyntraStreak(progress);

    updateZyntraAchievements(progress);

    saveZyntraProgress(progress);


    return true;

}


/* =========================================================
   COMPLETE QUESTION
   ========================================================= */

function completeZyntraQuestion(
    subject,
    lessonKey,
    questionIndex,
    totalQuestions
){

    const progress =
        getZyntraProgress();

    const username =
        getZyntraUsername();


    const storageKey =
        "zyntraQuestion_" +
        subject +
        "_" +
        lessonKey +
        "_" +
        questionIndex +
        "_" +
        username;


    /*
       Prevent the same question from giving XP
       more than once.
    */

    if(localStorage.getItem(storageKey)){

        return false;

    }


    localStorage.setItem(
        storageKey,
        "completed"
    );


    /*
       Each question = 2 XP
    */

    progress.xp =
        (progress.xp || 0) + 2;


    progress.completedChallenges =
        (progress.completedChallenges || 0) + 1;


    updateZyntraStreak(progress);

    updateZyntraAchievements(progress);


    /*
       Update Physics progress
    */

    if(subject === "Physics"){

        updatePhysicsSubjectProgress(progress);

    }


    saveZyntraProgress(progress);


    return true;

}


/* =========================================================
   COUNT COMPLETED QUESTIONS
   ========================================================= */

function countCompletedQuestions(
    subject,
    lessonKey,
    totalQuestions
){

    const username =
        getZyntraUsername();

    let completed = 0;


    for(
        let i = 0;
        i < totalQuestions;
        i++
    ){

        const key =
            "zyntraQuestion_" +
            subject +
            "_" +
            lessonKey +
            "_" +
            i +
            "_" +
            username;


        if(localStorage.getItem(key)){

            completed++;

        }

    }


    return completed;

}


/* =========================================================
   TOPIC PROGRESS
   ========================================================= */

function calculateTopicProgress(
    subject,
    lessonKey,
    totalQuestions
){

    const completed =
        countCompletedQuestions(
            subject,
            lessonKey,
            totalQuestions
        );


    if(totalQuestions <= 0){

        return 0;

    }


    return Math.round(
        (completed / totalQuestions) * 100
    );

}


/* =========================================================
   PHYSICS SUBJECT PROGRESS
   ========================================================= */

function updatePhysicsSubjectProgress(progress){

    const topics = [

        "motion",

        "forces",

        "electricity",

        "energy",

        "waves",

        "light"

    ];


    let totalPercentage = 0;


    topics.forEach(topic => {

        totalPercentage +=
            calculateTopicProgress(
                "Physics",
                topic,
                5
            );

    });


    const overall =
        Math.round(
            totalPercentage / topics.length
        );


    progress.subjects.Physics =
        overall;

}


/* =========================================================
   GET PHYSICS TOPIC PROGRESS
   ========================================================= */

function getZyntraTopicProgress(
    subject,
    lessonKey,
    totalQuestions
){

    return calculateTopicProgress(
        subject,
        lessonKey,
        totalQuestions
    );

}


/* =========================================================
   GET COMPLETED QUESTION COUNT
   ========================================================= */

function getZyntraCompletedQuestionCount(){

    const username =
        getZyntraUsername();


    const topics = [

        "motion",

        "forces",

        "electricity",

        "energy",

        "waves",

        "light"

    ];


    let total = 0;


    topics.forEach(topic => {

        total +=
            countCompletedQuestions(
                "Physics",
                topic,
                5
            );

    });


    return total;

}


/* =========================================================
   GLOBAL EXPORTS
   ========================================================= */

window.getZyntraUsername =
    getZyntraUsername;

window.getZyntraProgress =
    getZyntraProgress;

window.saveZyntraProgress =
    saveZyntraProgress;

window.completeZyntraChallenge =
    completeZyntraChallenge;

window.completeZyntraQuestion =
    completeZyntraQuestion;

window.countCompletedQuestions =
    countCompletedQuestions;

window.calculateTopicProgress =
    calculateTopicProgress;

window.updatePhysicsSubjectProgress =
    updatePhysicsSubjectProgress;

window.getZyntraTopicProgress =
    getZyntraTopicProgress;

window.getZyntraCompletedQuestionCount =
    getZyntraCompletedQuestionCount;