/* =========================================================
   ZYNTRA AUTHENTICATION SYSTEM
   Student stays logged in until Logout is clicked.
   ========================================================= */


/* =========================================================
   GET SAVED USER
   ========================================================= */

function getZyntraUser() {

    try {

        const savedUser =
            localStorage.getItem("zyntraUser");

        if (!savedUser) {
            return null;
        }

        const user =
            JSON.parse(savedUser);

        if (!user || typeof user !== "object") {
            return null;
        }

        return user;

    } catch (error) {

        console.error(
            "ZYNTRA login data error:",
            error
        );

        localStorage.removeItem("zyntraUser");
        localStorage.removeItem("zyntraLoggedIn");

        return null;
    }
}


/* =========================================================
   CHECK LOGIN STATUS
   ========================================================= */

function isZyntraLoggedIn() {

    const user =
        getZyntraUser();

    const loggedIn =
        localStorage.getItem("zyntraLoggedIn");

    return (
        user !== null &&
        loggedIn === "true"
    );
}


/* =========================================================
   REQUIRE LOGIN
   ========================================================= */

function requireZyntraLogin() {

    const user =
        getZyntraUser();

    const loggedIn =
        localStorage.getItem("zyntraLoggedIn");

    if (
        !user ||
        loggedIn !== "true"
    ) {

        localStorage.removeItem("zyntraUser");
        localStorage.removeItem("zyntraClass");
        localStorage.removeItem("zyntraLoggedIn");

        window.location.href =
            "login.html";

        return false;
    }

    return true;
}


/* =========================================================
   LOGOUT
   ========================================================= */

function logoutZyntra() {

    localStorage.removeItem("zyntraUser");
    localStorage.removeItem("zyntraClass");
    localStorage.removeItem("zyntraLoggedIn");

    window.location.href =
        "login.html";
}


/* =========================================================
   GET STUDENT NAME
   ========================================================= */

function getZyntraName() {

    const user =
        getZyntraUser();

    if (!user) {
        return "Student";
    }

    return (
        user.name ||
        user.fullName ||
        user.username ||
        "Student"
    );
}


/* =========================================================
   GET EMAIL
   ========================================================= */

function getZyntraEmail() {

    const user =
        getZyntraUser();

    if (!user) {
        return "";
    }

    return user.email || "";
}


/* =========================================================
   GET USERNAME
   ========================================================= */

function getZyntraUsername() {

    const user =
        getZyntraUser();

    if (!user) {
        return "";
    }

    return (
        user.username ||
        user.name ||
        ""
    );
}


/* =========================================================
   GET CLASS / GRADE
   ========================================================= */

function getZyntraGrade() {

    const user =
        getZyntraUser();

    const savedClass =
        localStorage.getItem("zyntraClass");

    if (savedClass) {
        return savedClass;
    }

    if (user) {

        return (
            user.grade ||
            user.class ||
            user.form ||
            "Form One"
        );

    }

    return "Form One";
}


/* =========================================================
   GET USER ID
   ========================================================= */

function getZyntraUserId() {

    const user =
        getZyntraUser();

    if (!user) {
        return null;
    }

    return user.id || null;
}