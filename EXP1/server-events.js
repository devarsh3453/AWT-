const express = require("express");
const EventEmitter = require("events");
const path = require("path");

const app = express();
const event = new EventEmitter();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public-events")));

// Event count storage
const eventCount = {
    "user-login": 0,
    "user-logout": 0,
    "user-purchase": 0,
    "profile-update": 0
};

// Event logs storage
let eventLogs = [];

// Event listeners
event.on("user-login", (username) => {
    eventCount["user-login"]++;
    const log = `LOGIN: ${username} logged in`;
    console.log(log);
    eventLogs.push({ type: "user-login", message: log, timestamp: new Date() });
});

event.on("user-logout", (username) => {
    eventCount["user-logout"]++;
    const log = `LOGOUT: ${username} logged out`;
    console.log(log);
    eventLogs.push({ type: "user-logout", message: log, timestamp: new Date() });
});

event.on("user-purchase", (username, item) => {
    eventCount["user-purchase"]++;
    const log = `PURCHASE: ${username} bought ${item}`;
    console.log(log);
    eventLogs.push({ type: "user-purchase", message: log, timestamp: new Date() });
});

event.on("profile-update", (username, field) => {
    eventCount["profile-update"]++;
    const log = `UPDATE: ${username} updated ${field}`;
    console.log(log);
    eventLogs.push({ type: "profile-update", message: log, timestamp: new Date() });
});

// API Routes
app.post("/api/login", (req, res) => {
    const { username } = req.body;
    event.emit("user-login", username);
    res.json({ success: true, message: "Login event emitted" });
});

app.post("/api/logout", (req, res) => {
    const { username } = req.body;
    event.emit("user-logout", username);
    res.json({ success: true, message: "Logout event emitted" });
});

app.post("/api/purchase", (req, res) => {
    const { username, item } = req.body;
    event.emit("user-purchase", username, item);
    res.json({ success: true, message: "Purchase event emitted" });
});

app.post("/api/profile-update", (req, res) => {
    const { username, field } = req.body;
    event.emit("profile-update", username, field);
    res.json({ success: true, message: "Profile update event emitted" });
});

app.get("/api/summary", (req, res) => {
    res.json({
        eventCount,
        logs: eventLogs
    });
});

app.post("/api/clear", (req, res) => {
    eventLogs = [];
    for (const key in eventCount) {
        eventCount[key] = 0;
    }
    res.json({ success: true, message: "All events cleared" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
