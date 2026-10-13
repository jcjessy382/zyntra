
// ======================================================
// ZYNTRA BACKEND SERVER
// AUTOMATIC FOLDER VIDEO UPLOAD
// COMMUNITY
// USER AUTHENTICATION
// ADMIN AUTHENTICATION
// ZYNTRA AI
// STUDENT PROGRESS TRACKING
// ======================================================

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(cors());

app.use(
    express.json({
        limit: "25mb"
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "25mb"
    })
);

// ======================================================
// PROJECT PATHS
// ======================================================

const projectFolder = path.join(__dirname, "..");

const communityFile = path.join(
    __dirname,
    "community.json"
);

const usersFile = path.join(
    __dirname,
    "users.json"
);

const videosFile = path.join(
    __dirname,
    "videos.json"
);

const progressFile = path.join(
    __dirname,
    "progress.json"
);

const videosFolder = path.join(
    __dirname,
    "videos"
);

const autoUploadFolder = path.join(
    __dirname,
    "videos-to-upload"
);

// ======================================================
// SUBJECTS
// ======================================================

const allowedSubjects = [
    "Mathematics",
    "Chemistry",
    "Physics",
    "Biology",
    "Computer-Studies",
    "English"
];

// ======================================================
// VIDEO EXTENSIONS
// ======================================================

const allowedVideoExtensions = [
    ".mp4",
    ".webm",
    ".ogg",
    ".mov"
];

// ======================================================
// FOLDER FUNCTIONS
// ======================================================

function ensureFolder(folder) {

    if (!fs.existsSync(folder)) {

        fs.mkdirSync(
            folder,
            {
                recursive: true
            }
        );
    }
}

ensureFolder(videosFolder);
ensureFolder(autoUploadFolder);

allowedSubjects.forEach(
    (subject) => {

        ensureFolder(
            path.join(
                videosFolder,
                subject
            )
        );

        ensureFolder(
            path.join(
                autoUploadFolder,
                subject
            )
        );
    }
);

// ======================================================
// JSON DATABASE FUNCTIONS
// ======================================================

function ensureJSONFile(
    file,
    defaultData
) {

    if (!fs.existsSync(file)) {

        fs.writeFileSync(
            file,
            JSON.stringify(
                defaultData,
                null,
                2
            ),
            "utf8"
        );
    }
}

function readJSON(
    file,
    fallback
) {

    try {

        if (!fs.existsSync(file)) {
            return fallback;
        }

        const data =
            fs.readFileSync(
                file,
                "utf8"
            );

        if (!data.trim()) {
            return fallback;
        }

        return JSON.parse(data);

    } catch (error) {

        console.error(
            "JSON read error:",
            error.message
        );

        return fallback;
    }
}

function writeJSON(
    file,
    data
) {

    fs.writeFileSync(
        file,
        JSON.stringify(
            data,
            null,
            2
        ),
        "utf8"
    );
}

// ======================================================
// CREATE DATABASE FILES
// ======================================================

ensureJSONFile(
    communityFile,
    {
        posts: []
    }
);

ensureJSONFile(
    usersFile,
    {
        users: []
    }
);

ensureJSONFile(
    videosFile,
    {
        videos: []
    }
);

ensureJSONFile(
    progressFile,
    {
        students: []
    }
);

// ======================================================
// STATIC WEBSITE
// ======================================================

app.use(
    express.static(projectFolder)
);

// ======================================================
// VIDEO FILES
// ======================================================

app.use(
    "/videos",
    express.static(videosFolder)
);

// ======================================================
// HOME
// ======================================================

app.get(
    "/",
    (req, res) => {

        res.send(`
            <!DOCTYPE html>

            <html>

            <head>

                <title>ZYNTRA Backend</title>

                <style>

                    body{
                        background:#070711;
                        color:white;
                        font-family:Arial,sans-serif;
                        text-align:center;
                        padding:60px;
                    }

                    h1{
                        color:#8b5cf6;
                    }

                    p{
                        color:#bbb;
                    }

                </style>

            </head>

            <body>

                <h1>
                    ZYNTRA Backend is running! 🤖
                </h1>

                <p>
                    Server:
                    http://localhost:${PORT}
                </p>

                <p>
                    Automatic Video Import: ENABLED
                </p>

                <p>
                    ZYNTRA AI: CONFIGURED
                </p>

                <p>
                    Student Progress: ENABLED
                </p>

            </body>

            </html>
        `);
    }
);

// ======================================================
// USER REGISTRATION
// ======================================================

app.post(
    "/api/register",
    (req, res) => {

        try {

            const name =
                String(
                    req.body.name || ""
                ).trim();

            const username =
                String(
                    req.body.username || ""
                ).trim();

            const email =
                String(
                    req.body.email || ""
                )
                .trim()
                .toLowerCase();

            const password =
                String(
                    req.body.password || ""
                );

            const studentClass =
                String(
                    req.body.class ||
                    req.body.studentClass ||
                    ""
                ).trim();

            if (
                !name ||
                !username ||
                !email ||
                !password
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please fill in all required fields."

                });
            }

            if (
                password.length < 4
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Password must be at least 4 characters."

                });
            }

            const database =
                readJSON(
                    usersFile,
                    {
                        users: []
                    }
                );

            if (
                !Array.isArray(
                    database.users
                )
            ) {

                database.users = [];
            }

            const emailExists =
                database.users.some(
                    user =>
                        String(
                            user.email || ""
                        )
                        .toLowerCase() ===
                        email
                );

            if (emailExists) {

                return res.status(409).json({

                    success: false,

                    message:
                        "Email already exists."

                });
            }

            const usernameExists =
                database.users.some(
                    user =>
                        String(
                            user.username || ""
                        )
                        .toLowerCase() ===
                        username.toLowerCase()
                );

            if (usernameExists) {

                return res.status(409).json({

                    success: false,

                    message:
                        "Username already exists."

                });
            }

            const user = {

                id:
                    crypto
                        .randomBytes(12)
                        .toString("hex"),

                name,

                username,

                email,

                password,

                class:
                    studentClass,

                createdAt:
                    new Date().toISOString()

            };

            database.users.push(user);

            writeJSON(
                usersFile,
                database
            );

            // ------------------------------------------
            // CREATE INITIAL PROGRESS
            // ------------------------------------------

            const progressDatabase =
                readJSON(
                    progressFile,
                    {
                        students: []
                    }
                );

            if (
                !Array.isArray(
                    progressDatabase.students
                )
            ) {

                progressDatabase.students = [];
            }

            const initialProgress =
                createDefaultProgress(
                    user.id,
                    user.username
                );

            const progressExists =
                progressDatabase.students.some(
                    student =>
                        String(student.userId) ===
                        String(user.id)
                );

            if (!progressExists) {

                progressDatabase.students.push(
                    initialProgress
                );

                writeJSON(
                    progressFile,
                    progressDatabase
                );
            }

            return res.json({

                success: true,

                message:
                    "Account created successfully.",

                user: {

                    id:
                        user.id,

                    name:
                        user.name,

                    username:
                        user.username,

                    email:
                        user.email,

                    class:
                        user.class

                }

            });

        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Registration failed."

            });
        }
    }
);

// ======================================================
// LOGIN
// ======================================================

app.post(
    "/api/login",
    (req, res) => {

        try {

            const identifier =
                String(
                    req.body.email ||
                    req.body.username ||
                    req.body.identifier ||
                    ""
                )
                .trim()
                .toLowerCase();

            const password =
                String(
                    req.body.password || ""
                );

            if (
                !identifier ||
                !password
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please enter your email/username and password."

                });
            }

            const database =
                readJSON(
                    usersFile,
                    {
                        users: []
                    }
                );

            if (
                !Array.isArray(
                    database.users
                )
            ) {

                database.users = [];
            }

            const user =
                database.users.find(
                    item => {

                        const email =
                            String(
                                item.email || ""
                            )
                            .toLowerCase();

                        const username =
                            String(
                                item.username || ""
                            )
                            .toLowerCase();

                        return (
                            email === identifier ||
                            username === identifier
                        );
                    }
                );

            if (!user) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Invalid email/username or password."

                });
            }

            if (
                String(user.password) !==
                password
            ) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Invalid email/username or password."

                });
            }

            // ------------------------------------------
            // MAKE SURE PROGRESS EXISTS
            // ------------------------------------------

            const progressDatabase =
                readJSON(
                    progressFile,
                    {
                        students: []
                    }
                );

            if (
                !Array.isArray(
                    progressDatabase.students
                )
            ) {

                progressDatabase.students = [];
            }

            const progressExists =
                progressDatabase.students.some(
                    student =>
                        String(student.userId) ===
                        String(user.id)
                );

            if (!progressExists) {

                progressDatabase.students.push(
                    createDefaultProgress(
                        user.id,
                        user.username
                    )
                );

                writeJSON(
                    progressFile,
                    progressDatabase
                );
            }

            return res.json({

                success: true,

                message:
                    "Login successful.",

                user: {

                    id:
                        user.id,

                    name:
                        user.name,

                    username:
                        user.username,

                    email:
                        user.email,

                    class:
                        user.class

                }

            });

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Login failed."

            });
        }
    }
);

// ======================================================
// ADMIN AUTHENTICATION
// ======================================================

const adminSessions =
    new Map();

function createAdminToken() {

    return crypto
        .randomBytes(32)
        .toString("hex");
}

function requireAdmin(
    req,
    res,
    next
) {

    const authorization =
        req.headers.authorization || "";

    if (
        !authorization.startsWith(
            "Bearer "
        )
    ) {

        return res.status(401).json({

            success: false,

            message:
                "Admin login required."

        });
    }

    const token =
        authorization.substring(7);

    if (
        !adminSessions.has(token)
    ) {

        return res.status(403).json({

            success: false,

            message:
                "You are not authorized."

        });
    }

    next();
}

// ======================================================
// ADMIN LOGIN
// ======================================================

app.post(
    "/api/admin/login",
    (req, res) => {

        try {

            const email =
                String(
                    req.body.email || ""
                )
                .trim()
                .toLowerCase();

            const password =
                String(
                    req.body.password || ""
                );

            const adminEmail =
                String(
                    process.env.ADMIN_EMAIL || ""
                )
                .trim()
                .toLowerCase();

            const adminPassword =
                String(
                    process.env.ADMIN_PASSWORD || ""
                );

            if (
                !adminEmail ||
                !adminPassword
            ) {

                return res.status(500).json({

                    success: false,

                    message:
                        "Admin credentials are not configured in .env."

                });
            }

            if (
                email !== adminEmail ||
                password !== adminPassword
            ) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Invalid admin credentials."

                });
            }

            const token =
                createAdminToken();

            adminSessions.set(
                token,
                {
                    email: adminEmail,
                    createdAt: Date.now()
                }
            );

            return res.json({

                success: true,

                message:
                    "Admin login successful.",

                token

            });

        } catch (error) {

            console.error(
                "Admin login error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Admin login failed."

            });
        }
    }
);

// ======================================================
// ADMIN STATUS
// ======================================================

app.get(
    "/api/admin/status",
    (req, res) => {

        const authorization =
            req.headers.authorization || "";

        if (
            !authorization.startsWith(
                "Bearer "
            )
        ) {

            return res.json({

                success: true,

                loggedIn: false

            });
        }

        const token =
            authorization.substring(7);

        return res.json({

            success: true,

            loggedIn:
                adminSessions.has(token)

        });
    }
);

// ======================================================
// ADMIN LOGOUT
// ======================================================

app.post(
    "/api/admin/logout",
    (req, res) => {

        const authorization =
            req.headers.authorization || "";

        if (
            authorization.startsWith(
                "Bearer "
            )
        ) {

            const token =
                authorization.substring(7);

            adminSessions.delete(
                token
            );
        }

        return res.json({

            success: true,

            message:
                "Admin logged out."

        });
    }
);

// ======================================================
// COMMUNITY - GET POSTS
// ======================================================

app.get(
    "/api/community/posts",
    (req, res) => {

        try {

            const database =
                readJSON(
                    communityFile,
                    {
                        posts: []
                    }
                );

            if (
                !Array.isArray(
                    database.posts
                )
            ) {

                database.posts = [];
            }

            return res.json({

                success: true,

                posts:
                    database.posts

            });

        } catch (error) {

            console.error(
                "Community GET error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Could not load community posts."

            });
        }
    }
);

// ======================================================
// COMMUNITY - CREATE POST
// ======================================================

app.post(
    "/api/community/posts",
    (req, res) => {

        try {

            const content =
                String(
                    req.body.content ||
                    req.body.text ||
                    ""
                ).trim();

            const category =
                String(
                    req.body.category ||
                    "All"
                ).trim();

            const username =
                String(
                    req.body.username ||
                    "You"
                ).trim();

            if (!content) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Post cannot be empty."

                });
            }

            const database =
                readJSON(
                    communityFile,
                    {
                        posts: []
                    }
                );

            if (
                !Array.isArray(
                    database.posts
                )
            ) {

                database.posts = [];
            }

            const post = {

                id:
                    crypto
                        .randomBytes(12)
                        .toString("hex"),

                username,

                content,

                category,

                likes: [],

                comments: [],

                saves: [],

                shares: 0,

                createdAt:
                    new Date().toISOString()

            };

            database.posts.unshift(
                post
            );

            writeJSON(
                communityFile,
                database
            );

            return res.json({

                success: true,

                message:
                    "Post created.",

                post

            });

        } catch (error) {

            console.error(
                "Community post error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Could not create post."

            });
        }
    }
);

// ======================================================
// COMMUNITY - LIKE
// ======================================================

app.post(
    "/api/community/posts/:id/like",
    (req, res) => {

        try {

            const postId =
                req.params.id;

            const username =
                String(
                    req.body.username ||
                    "You"
                ).trim();

            const database =
                readJSON(
                    communityFile,
                    {
                        posts: []
                    }
                );

            const post =
                database.posts.find(
                    item =>
                        item.id === postId
                );

            if (!post) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Post not found."

                });
            }

            if (
                !Array.isArray(
                    post.likes
                )
            ) {

                post.likes = [];
            }

            const index =
                post.likes.indexOf(
                    username
                );

            if (index === -1) {

                post.likes.push(
                    username
                );

            } else {

                post.likes.splice(
                    index,
                    1
                );
            }

            writeJSON(
                communityFile,
                database
            );

            return res.json({

                success: true,

                liked:
                    post.likes.includes(
                        username
                    ),

                likes:
                    post.likes.length

            });

        } catch (error) {

            console.error(
                "Like error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Could not update like."

            });
        }
    }
);

// ======================================================
// COMMUNITY - COMMENT
// ======================================================

app.post(
    "/api/community/posts/:id/comment",
    (req, res) => {

        try {

            const postId =
                req.params.id;

            const username =
                String(
                    req.body.username ||
                    "You"
                ).trim();

            const text =
                String(
                    req.body.text ||
                    req.body.comment ||
                    ""
                ).trim();

            if (!text) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Comment cannot be empty."

                });
            }

            const database =
                readJSON(
                    communityFile,
                    {
                        posts: []
                    }
                );

            const post =
                database.posts.find(
                    item =>
                        item.id === postId
                );

            if (!post) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Post not found."

                });
            }

            if (
                !Array.isArray(
                    post.comments
                )
            ) {

                post.comments = [];
            }

            const comment = {

                id:
                    crypto
                        .randomBytes(10)
                        .toString("hex"),

                username,

                text,

                createdAt:
                    new Date().toISOString()

            };

            post.comments.push(
                comment
            );

            writeJSON(
                communityFile,
                database
            );

            return res.json({

                success: true,

                comment,

                comments:
                    post.comments

            });

        } catch (error) {

            console.error(
                "Comment error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Could not add comment."

            });
        }
    }
);

// ======================================================
// COMMUNITY - SAVE
// ======================================================

app.post(
    "/api/community/posts/:id/save",
    (req, res) => {

        try {

            const postId =
                req.params.id;

            const username =
                String(
                    req.body.username ||
                    "You"
                ).trim();

            const database =
                readJSON(
                    communityFile,
                    {
                        posts: []
                    }
                );

            const post =
                database.posts.find(
                    item =>
                        item.id === postId
                );

            if (!post) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Post not found."

                });
            }

            if (
                !Array.isArray(
                    post.saves
                )
            ) {

                post.saves = [];
            }

            const index =
                post.saves.indexOf(
                    username
                );

            if (index === -1) {

                post.saves.push(
                    username
                );

            } else {

                post.saves.splice(
                    index,
                    1
                );
            }

            writeJSON(
                communityFile,
                database
            );

            return res.json({

                success: true,

                saved:
                    post.saves.includes(
                        username
                    ),

                saves:
                    post.saves.length

            });

        } catch (error) {

            console.error(
                "Save error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Could not update saved post."

            });
        }
    }
);

// ======================================================
// COMMUNITY - SHARE
// ======================================================

app.post(
    "/api/community/posts/:id/share",
    (req, res) => {

        try {

            const postId =
                req.params.id;

            const database =
                readJSON(
                    communityFile,
                    {
                        posts: []
                    }
                );

            const post =
                database.posts.find(
                    item =>
                        item.id === postId
                );

            if (!post) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Post not found."

                });
            }

            post.shares =
                Number(
                    post.shares || 0
                ) + 1;

            writeJSON(
                communityFile,
                database
            );

            return res.json({

                success: true,

                shares:
                    post.shares

            });

        } catch (error) {

            console.error(
                "Share error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Could not share post."

            });
        }
    }
);

// ======================================================
// VIDEO DATABASE
// ======================================================

function getVideoDatabase() {

    const database =
        readJSON(
            videosFile,
            {
                videos: []
            }
        );

    if (
        !Array.isArray(
            database.videos
        )
    ) {

        database.videos = [];
    }

    return database;
}

// ======================================================
// GET VIDEOS
// ======================================================

app.get(
    "/api/videos",
    (req, res) => {

        try {

            const database =
                getVideoDatabase();

            return res.json({

                success: true,

                videos:
                    database.videos

            });

        } catch (error) {

            console.error(
                "Video GET error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Could not load videos."

            });
        }
    }
);

// ======================================================
// AUTOMATIC VIDEO IMPORT
// ======================================================

function createVideoId() {

    return crypto
        .randomBytes(12)
        .toString("hex");
}

function cleanVideoTitle(
    filename
) {

    return path
        .basename(
            filename,
            path.extname(filename)
        )
        .replace(
            /[_-]+/g,
            " "
        )
        .replace(
            /\s+/g,
            " "
        )
        .trim();
}

function scanVideoFolder() {

    try {

        const database =
            getVideoDatabase();

        let changed = false;

        allowedSubjects.forEach(
            subject => {

                const folder =
                    path.join(
                        autoUploadFolder,
                        subject
                    );

                ensureFolder(
                    folder
                );

                const files =
                    fs.readdirSync(
                        folder
                    );

                files.forEach(
                    filename => {

                        const extension =
                            path.extname(
                                filename
                            ).toLowerCase();

                        if (
                            !allowedVideoExtensions.includes(
                                extension
                            )
                        ) {

                            return;
                        }

                        const source =
                            path.join(
                                folder,
                                filename
                            );

                        const destinationFolder =
                            path.join(
                                videosFolder,
                                subject
                            );

                        ensureFolder(
                            destinationFolder
                        );

                        const destination =
                            path.join(
                                destinationFolder,
                                filename
                            );

                        const alreadyExists =
                            database.videos.some(
                                video =>
                                    video.subject ===
                                    subject &&
                                    video.filename ===
                                    filename
                            );

                        if (
                            alreadyExists
                        ) {

                            return;
                        }

                        let finalDestination =
                            destination;

                        if (
                            fs.existsSync(
                                finalDestination
                            )
                        ) {

                            const uniqueName =
                                `${Date.now()}-${filename}`;

                            finalDestination =
                                path.join(
                                    destinationFolder,
                                    uniqueName
                                );
                        }

                        fs.copyFileSync(
                            source,
                            finalDestination
                        );

                        const actualFilename =
                            path.basename(
                                finalDestination
                            );

                        const video = {

                            id:
                                createVideoId(),

                            title:
                                cleanVideoTitle(
                                    filename
                                ),

                            filename:
                                actualFilename,

                            subject,

                            url:
                                `/videos/${encodeURIComponent(subject)}/${encodeURIComponent(actualFilename)}`,

                            createdAt:
                                new Date().toISOString()

                        };

                        database.videos.push(
                            video
                        );

                        changed = true;

                        console.log(
                            `Imported video: ${filename} -> ${subject}`
                        );
                    }
                );
            }
        );

        if (changed) {

            writeJSON(
                videosFile,
                database
            );
        }

    } catch (error) {

        console.error(
            "Automatic video import error:",
            error.message
        );
    }
}

// ======================================================
// RUN VIDEO SCANNER
// ======================================================

scanVideoFolder();

setInterval(
    scanVideoFolder,
    10000
);

// ======================================================
// STUDENT PROGRESS SYSTEM
// ======================================================

function createDefaultProgress(
    userId,
    username
) {

    return {

        userId,

        username:
            username || "Student",

        xp: 0,

        questionsCompleted: 0,

        correctAnswers: 0,

        studyStreak: 0,

        lastStudyDate: null,

        totalStudyMinutes: 0,

        subjects: {

            Mathematics: {

                progress: 0,

                questions: 0,

                correct: 0,

                topicsCompleted: []

            },

            Chemistry: {

                progress: 0,

                questions: 0,

                correct: 0,

                topicsCompleted: []

            },

            Physics: {

                progress: 0,

                questions: 0,

                correct: 0,

                topicsCompleted: []

            },

            Biology: {

                progress: 0,

                questions: 0,

                correct: 0,

                topicsCompleted: []

            },

            "Computer-Studies": {

                progress: 0,

                questions: 0,

                correct: 0,

                topicsCompleted: []

            },

            English: {

                progress: 0,

                questions: 0,

                correct: 0,

                topicsCompleted: []

            }

        },

        achievements: [],

        createdAt:
            new Date().toISOString(),

        updatedAt:
            new Date().toISOString()

    };
}

function getProgressDatabase() {

    const database =
        readJSON(
            progressFile,
            {
                students: []
            }
        );

    if (
        !Array.isArray(
            database.students
        )
    ) {

        database.students = [];
    }

    return database;
}

// ======================================================
// GET STUDENT PROGRESS
// ======================================================

app.get(
    "/api/progress/:userId",
    (req, res) => {

        try {

            const userId =
                String(
                    req.params.userId || ""
                ).trim();

            if (!userId) {

                return res.status(400).json({

                    success: false,

                    message:
                        "User ID is required."

                });
            }

            const database =
                getProgressDatabase();

            let student =
                database.students.find(
                    item =>
                        String(
                            item.userId
                        ) === userId
                );

            if (!student) {

                student =
                    createDefaultProgress(
                        userId,
                        "Student"
                    );

                database.students.push(
                    student
                );

                writeJSON(
                    progressFile,
                    database
                );
            }

            return res.json({

                success: true,

                progress:
                    student

            });

        } catch (error) {

            console.error(
                "Progress GET error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Could not load student progress."

            });
        }
    }
);

// ======================================================
// UPDATE PROGRESS
// ======================================================

app.post(
    "/api/progress/update",
    (req, res) => {

        try {

            const userId =
                String(
                    req.body.userId || ""
                ).trim();

            const username =
                String(
                    req.body.username ||
                    "Student"
                ).trim();

            const subject =
                String(
                    req.body.subject || ""
                ).trim();

            const topic =
                String(
                    req.body.topic || ""
                ).trim();

            const correct =
                req.body.correct === true ||
                req.body.correct === "true";

            let questions =
                Number(
                    req.body.questions || 1
                );

            if (
                !Number.isFinite(
                    questions
                ) ||
                questions < 0
            ) {

                questions = 0;
            }

            const studyMinutes =
                Number(
                    req.body.studyMinutes || 0
                );

            if (!userId) {

                return res.status(400).json({

                    success: false,

                    message:
                        "User ID is required."

                });
            }

            const database =
                getProgressDatabase();

            let student =
                database.students.find(
                    item =>
                        String(
                            item.userId
                        ) === userId
                );

            if (!student) {

                student =
                    createDefaultProgress(
                        userId,
                        username
                    );

                database.students.push(
                    student
                );
            }

            student.username =
                username;

            // ------------------------------------------
            // QUESTIONS
            // ------------------------------------------

            if (
                questions > 0
            ) {

                student.questionsCompleted +=
                    questions;

                if (correct) {

                    student.correctAnswers +=
                        questions;

                }

            }

            // ------------------------------------------
            // XP
            // ------------------------------------------

            if (
                questions > 0
            ) {

                if (correct) {

                    student.xp +=
                        questions * 10;

                } else {

                    student.xp +=
                        questions * 3;

                }

            }

            // ------------------------------------------
            // STUDY MINUTES
            // ------------------------------------------

            if (
                Number.isFinite(
                    studyMinutes
                ) &&
                studyMinutes > 0
            ) {

                student.totalStudyMinutes +=
                    studyMinutes;

            }

            // ------------------------------------------
            // SUBJECT
            // ------------------------------------------

            if (
                subject &&
                student.subjects[subject]
            ) {

                const subjectData =
                    student.subjects[subject];

                subjectData.questions +=
                    questions;

                if (correct) {

                    subjectData.correct +=
                        questions;

                }

                if (
                    topic &&
                    !subjectData.topicsCompleted.includes(
                        topic
                    )
                ) {

                    subjectData.topicsCompleted.push(
                        topic
                    );

                }

                /*
                 * Each completed topic represents
                 * 10% progress.
                 */

                subjectData.progress =
                    Math.min(
                        100,
                        subjectData
                            .topicsCompleted
                            .length * 10
                    );
            }

            // ------------------------------------------
            // STREAK
            // ------------------------------------------

            updateStudyStreak(
                student
            );

            // ------------------------------------------
            // ACHIEVEMENTS
            // ------------------------------------------

            updateAchievements(
                student
            );

            student.updatedAt =
                new Date().toISOString();

            writeJSON(
                progressFile,
                database
            );

            return res.json({

                success: true,

                message:
                    "Progress updated.",

                progress:
                    student

            });

        } catch (error) {

            console.error(
                "Progress update error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Could not update progress."

            });
        }
    }
);

// ======================================================
// STUDY STREAK FUNCTION
// ======================================================

function updateStudyStreak(
    student
) {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    if (
        student.lastStudyDate ===
        today
    ) {

        return;
    }

    if (
        student.lastStudyDate
    ) {

        const lastDate =
            new Date(
                student.lastStudyDate
            );

        const todayDate =
            new Date(
                today
            );

        const difference =
            Math.floor(
                (
                    todayDate -
                    lastDate
                ) /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );

        if (
            difference === 1
        ) {

            student.studyStreak +=
                1;

        } else {

            student.studyStreak =
                1;
        }

    } else {

        student.studyStreak =
            1;
    }

    student.lastStudyDate =
        today;
}

// ======================================================
// ACHIEVEMENT SYSTEM
// ======================================================

function updateAchievements(
    student
) {

    function addAchievement(
        id,
        title,
        description
    ) {

        const exists =
            student.achievements.some(
                achievement =>
                    achievement.id === id
            );

        if (!exists) {

            student.achievements.push({

                id,

                title,

                description,

                earnedAt:
                    new Date().toISOString()

            });
        }
    }

    if (
        student.questionsCompleted >= 10
    ) {

        addAchievement(
            "first-10",
            "Getting Started",
            "Completed 10 questions."
        );
    }

    if (
        student.questionsCompleted >= 50
    ) {

        addAchievement(
            "50-questions",
            "Question Master",
            "Completed 50 questions."
        );
    }

    if (
        student.questionsCompleted >= 100
    ) {

        addAchievement(
            "100-questions",
            "Century Learner",
            "Completed 100 questions."
        );
    }

    if (
        student.xp >= 100
    ) {

        addAchievement(
            "100-xp",
            "100 XP",
            "Earned your first 100 XP."
        );
    }

    if (
        student.xp >= 500
    ) {

        addAchievement(
            "500-xp",
            "XP Explorer",
            "Earned 500 XP."
        );
    }

    if (
        student.studyStreak >= 3
    ) {

        addAchievement(
            "3-day-streak",
            "3 Day Streak",
            "Studied for 3 days in a row."
        );
    }

    if (
        student.studyStreak >= 7
    ) {

        addAchievement(
            "7-day-streak",
            "7 Day Streak",
            "Studied for 7 days in a row."
        );
    }

    if (
        student.studyStreak >= 30
    ) {

        addAchievement(
            "30-day-streak",
            "30 Day Streak",
            "Studied for 30 days in a row."
        );
    }
}

// ======================================================
// ADD STUDY SESSION
// ======================================================

app.post(
    "/api/progress/study-session",
    (req, res) => {

        try {

            const userId =
                String(
                    req.body.userId || ""
                ).trim();

            const username =
                String(
                    req.body.username ||
                    "Student"
                ).trim();

            const minutes =
                Number(
                    req.body.minutes || 0
                );

            if (!userId) {

                return res.status(400).json({

                    success: false,

                    message:
                        "User ID is required."

                });
            }

            if (
                !Number.isFinite(
                    minutes
                ) ||
                minutes <= 0
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Study time must be greater than zero."

                });
            }

            const database =
                getProgressDatabase();

            let student =
                database.students.find(
                    item =>
                        String(
                            item.userId
                        ) === userId
                );

            if (!student) {

                student =
                    createDefaultProgress(
                        userId,
                        username
                    );

                database.students.push(
                    student
                );
            }

            student.username =
                username;

            student.totalStudyMinutes +=
                minutes;

            student.xp +=
                Math.max(
                    1,
                    Math.floor(
                        minutes / 5
                    )
                );

            updateStudyStreak(
                student
            );

            updateAchievements(
                student
            );

            student.updatedAt =
                new Date().toISOString();

            writeJSON(
                progressFile,
                database
            );

            return res.json({

                success: true,

                message:
                    "Study session saved.",

                progress:
                    student

            });

        } catch (error) {

            console.error(
                "Study session error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Could not save study session."

            });
        }
    }
);

// ======================================================
// RESET STUDENT PROGRESS
// ======================================================

app.post(
    "/api/progress/reset",
    (req, res) => {

        try {

            const userId =
                String(
                    req.body.userId || ""
                ).trim();

            if (!userId) {

                return res.status(400).json({

                    success: false,

                    message:
                        "User ID is required."

                });
            }

            const database =
                getProgressDatabase();

            const index =
                database.students.findIndex(
                    student =>
                        String(
                            student.userId
                        ) === userId
                );

            if (
                index === -1
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Student progress not found."

                });
            }

            const oldStudent =
                database.students[index];

            const newProgress =
                createDefaultProgress(
                    userId,
                    oldStudent.username
                );

            database.students[index] =
                newProgress;

            writeJSON(
                progressFile,
                database
            );

            return res.json({

                success: true,

                message:
                    "Progress reset successfully.",

                progress:
                    newProgress

            });

        } catch (error) {

            console.error(
                "Progress reset error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Could not reset progress."

            });
        }
    }
);

// ======================================================
// ZYNTRA AI CONFIGURATION
// ======================================================

const GEMINI_API_KEY =
    process.env.GEMINI_API_KEY || "";

const GEMINI_MODEL =
    process.env.GEMINI_MODEL ||
    "gemini-3.6-flash";

// ======================================================
// LOCAL AI FALLBACK
// ======================================================

function localAI(
    message
) {

    const text =
        String(
            message || ""
        )
        .trim()
        .toLowerCase();

    if (
        text.includes(
            "photosynthesis"
        )
    ) {

        return `
Photosynthesis is the process by which green plants make their own food.

Plants use sunlight, water and carbon dioxide.

They produce glucose, which is food for the plant, and release oxygen.

In simple terms, photosynthesis is how green plants use sunlight to make food.
        `.trim();
    }

    if (
        text.includes("newton") &&
        (
            text.includes("second law") ||
            text.includes("2nd law")
        )
    ) {

        return `
Newton's Second Law explains how force, mass and acceleration are related.

The formula is:

F = m × a

Where:

F = force
m = mass
a = acceleration

Example:

If a 5 kg object accelerates at 2 m/s²:

F = 5 × 2

F = 10 N

So the force is 10 newtons.
        `.trim();
    }

    if (
        text.includes("atom")
    ) {

        return `
An atom is the smallest basic unit of an element.

An atom has three main particles:

Protons have a positive charge.

Neutrons have no charge.

Electrons have a negative charge.

Protons and neutrons are found in the nucleus.

Electrons move around the nucleus.

In simple terms, everything around us is made from atoms.
        `.trim();
    }

    if (
        text.includes("2x+4") ||
        text.includes("2x + 4")
    ) {

        return `
To solve 2x + 4 = 10:

Step 1:
Subtract 4 from both sides.

2x = 6

Step 2:
Divide both sides by 2.

x = 3

Therefore, x = 3.
        `.trim();
    }

    if (
        text.includes("study tip") ||
        text.includes("study advice")
    ) {

        return `
Choose one topic at a time.

Study for about 25 to 30 minutes, then take a short break.

After studying, close your book and try to explain what you learned using your own words.

This helps you remember the topic better.
        `.trim();
    }

    return `
I can help you with Mathematics, Chemistry, Physics, Biology, Computer Studies and English.

Ask me a specific question and I will explain it in simple language.
    `.trim();
}

// ======================================================
// CLEAN AI ANSWER
// ======================================================

function cleanAIAnswer(
    answer
) {

    if (!answer) {
        return "";
    }

    let cleaned =
        String(answer);

    cleaned =
        cleaned.replace(
            /\*\*/g,
            ""
        );

    cleaned =
        cleaned.replace(
            /__/g,
            ""
        );

    cleaned =
        cleaned.replace(
            /^#{1,6}\s*/gm,
            ""
        );

    cleaned =
        cleaned.replace(
            /^[*]\s+/gm,
            "- "
        );

    cleaned =
        cleaned.replace(
            /\n{3,}/g,
            "\n\n"
        );

    return cleaned.trim();
}

// ======================================================
// GEMINI REQUEST
// ======================================================

async function askGemini(
    message
) {

    if (!GEMINI_API_KEY) {

        return {

            answer:
                localAI(message),

            source:
                "local"

        };
    }

    const systemInstruction = `
You are ZYNTRA AI, a friendly and patient study teacher for students.

Always answer in very simple and clear language.

Follow these rules:

1. Give the direct answer first.

2. Use short sentences and short paragraphs.

3. Explain difficult words in simple language.

4. For Mathematics, show the solution step by step.

5. For Science, explain the idea first and then give an example when useful.

6. For Computer Studies, explain technical terms using simple student-friendly examples.

7. For English, explain grammar and language concepts clearly with examples.

8. Do not use Markdown bold formatting.

9. Do not use double asterisks anywhere.

10. Avoid complicated vocabulary unless it is necessary.

11. Do not give unnecessarily long answers.

12. Use simple headings only when they make the answer clearer.

13. When the student asks a simple question, give a simple answer.

14. When the student asks for more detail, explain more.

15. Be encouraging but do not add unnecessary motivational speeches.

16. If a question is unclear, ask the student to clarify it.

17. Never pretend to know something that you are unsure about.

18. Do not use unnecessary symbols.

19. Make the answer easy for a student to read.

20. Use examples when they make the explanation easier.

Your goal is to make the student understand the topic, not just give an answer.

Always communicate in a simple, clear and student-friendly style.
`;

    const url =
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const body = {

        system_instruction: {

            parts: [

                {
                    text:
                        systemInstruction
                }

            ]

        },

        contents: [

            {

                role: "user",

                parts: [

                    {
                        text:
                            String(message)
                    }

                ]

            }

        ],

        generationConfig: {

            temperature:
                0.4,

            maxOutputTokens:
                700

        }

    };

    const maxAttempts = 3;

    for (
        let attempt = 1;
        attempt <= maxAttempts;
        attempt++
    ) {

        try {

            console.log(
                `ZYNTRA AI request attempt ${attempt}/${maxAttempts}`
            );

            const response =
                await fetch(
                    url,
                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                body
                            )

                    }
                );

            const data =
                await response.json();

            if (
                response.ok
            ) {

                const answer =
                    data
                        ?.candidates?.[0]
                        ?.content?.parts
                        ?.map(
                            part =>
                                part.text ||
                                ""
                        )
                        .join("")
                        .trim();

                if (answer) {

                    return {

                        answer:
                            cleanAIAnswer(
                                answer
                            ),

                        source:
                            "gemini"

                    };
                }

                console.log(
                    "Gemini returned no usable answer."
                );

                break;
            }

            const status =
                response.status;

            console.error(
                "Gemini API error:",
                data
            );

            if (
                status === 503 &&
                attempt < maxAttempts
            ) {

                const waitTime =
                    attempt * 3000;

                console.log(
                    `Gemini is temporarily unavailable. Retrying in ${waitTime / 1000} seconds...`
                );

                await new Promise(
                    resolve =>
                        setTimeout(
                            resolve,
                            waitTime
                        )
                );

                continue;
            }

            break;

        } catch (error) {

            console.error(
                "Gemini request exception:",
                error.message
            );

            if (
                attempt < maxAttempts
            ) {

                const waitTime =
                    attempt * 3000;

                await new Promise(
                    resolve =>
                        setTimeout(
                            resolve,
                            waitTime
                        )
                );

                continue;
            }
        }
    }

    console.log(
        "Using ZYNTRA local AI fallback."
    );

    return {

        answer:
            localAI(message),

        source:
            "local-fallback"

    };
}

// ======================================================
// ASK ZYNTRA AI
// ======================================================

app.post(
    "/api/ask",
    async (req, res) => {

        try {

            const message =
                String(
                    req.body.message ||
                    req.body.prompt ||
                    ""
                ).trim();

            if (!message) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please enter a question."

                });
            }

            const result =
                await askGemini(
                    message
                );

            return res.json({

                success: true,

                answer:
                    cleanAIAnswer(
                        result.answer
                    ),

                response:
                    cleanAIAnswer(
                        result.answer
                    ),

                source:
                    result.source

            });

        } catch (error) {

            console.error(
                "AI endpoint error:",
                error
            );

            const fallback =
                localAI(
                    req.body.message
                );

            return res.status(200).json({

                success: true,

                answer:
                    fallback,

                response:
                    fallback,

                source:
                    "local-fallback"

            });
        }
    }
);

// ======================================================
// HEALTH CHECK
// ======================================================

app.get(
    "/api/health",
    (req, res) => {

        return res.json({

            success: true,

            server:
                "ZYNTRA Backend",

            status:
                "running",

            ai:
                GEMINI_API_KEY
                    ? "configured"
                    : "local-only",

            videos:
                "enabled",

            community:
                "enabled",

            registration:
                "enabled",

            login:
                "enabled",

            progress:
                "enabled",

            time:
                new Date().toISOString()

        });
    }
);

// ======================================================
// 404 API HANDLER
// ======================================================

app.use(
    "/api",
    (req, res) => {

        return res.status(404).json({

            success: false,

            message:
                "API endpoint not found."

        });
    }
);

// ======================================================
// GENERAL ERROR HANDLER
// ======================================================

app.use(
    (error, req, res, next) => {

        console.error(
            "Server error:",
            error
        );

        if (
            res.headersSent
        ) {

            return next(error);
        }

        return res.status(500).json({

            success: false,

            message:
                "Something went wrong on the server."

        });
    }
);

// ======================================================
// START SERVER
// ======================================================

app.listen(
    PORT,
    () => {

        console.log("");

        console.log(
            "======================================"
        );

        console.log(
            "          ZYNTRA BACKEND"
        );

        console.log(
            "======================================"
        );

        console.log(
            `Server running on http://localhost:${PORT}`
        );

        console.log(
            `Website: http://localhost:${PORT}/index.html`
        );

        console.log(
            `Videos: http://localhost:${PORT}/videos`
        );

        console.log(
            `AI: ${
                GEMINI_API_KEY
                    ? "CONFIGURED"
                    : "LOCAL FALLBACK"
            }`
        );

        console.log(
            "Automatic Video Import: ENABLED"
        );

        console.log(
            "Community: ENABLED"
        );

        console.log(
            "Registration: ENABLED"
        );

        console.log(
            "Login: ENABLED"
        );

        console.log(
            "Student Progress: ENABLED"
        );

        console.log(
            "======================================"
        );

        console.log("");

    }
);

