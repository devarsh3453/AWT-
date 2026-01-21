const EventEmitter = require("events");

const event = new EventEmitter();

const eventCount = {
  "user-login": 0,
  "user-logout": 0,
  "user-purchase": 0,
  "profile-update": 0
};

event.on("user-login", (username) => {
  eventCount["user-login"]++;
  console.log(`LOGIN: ${username} logged in`);
});

event.on("user-logout", (username) => {
  eventCount["user-logout"]++;
  console.log(`LOGOUT: ${username} logged out`);
});

event.on("user-purchase", (username, item) => {
  eventCount["user-purchase"]++;
  console.log(`PURCHASE: ${username} bought ${item}`);
});

event.on("profile-update", (username, field) => {
  eventCount["profile-update"]++;
  console.log(`UPDATE: ${username} updated ${field}`);
});

event.on("summary", () => {

  for (const key in eventCount) {
    console.log(`${key}: ${eventCount[key]} times`);
  }
});

event.emit("user-login", "Vrund");
event.emit("user-login", "patel");

event.emit("user-purchase", "Vrund", "Laptop");
event.emit("user-purchase", "patel", "Headphones");

event.emit("profile-update", "Vrund", "Email");
event.emit("profile-update", "patel", "Password");

event.emit("user-logout", "Vrund");
event.emit("user-logout", "patel");

event.emit("summary");
