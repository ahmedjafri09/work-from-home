const EventEmitter = require("events");
const emitter = new EventEmitter();
const logger = require("./logger");

//Register the listener before you raise an event ALWAYS.
//The reason is that when an event is raise, the compiler
//will check for all the registered listeners and match and
//execute the one which matches.

//Register an event listener
emitter.on("messageLogged", (eventArgs) => {
  console.log("There was an event: ", eventArgs);
});

//Raise an event
emitter.emit("messageLogged", { id: 1, url: `The URL` });

const name = logger.hey("Ahmed");

//Raising and registering an event listener for logger:
emitter.on(name, (eventArgs) => {
  console.log("Logger function", eventArgs);
});

emitter.emit(name, { id: 1, name: "name" });
