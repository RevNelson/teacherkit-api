const express = require("express");
const subdomain = require("express-subdomain");
const session = require("express-session");
const passport = require("passport");
const expressValidator = require("express-validator");
const mongoose = require("mongoose");
const mongoSessionStore = require("connect-mongo");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const logger = require("morgan");

/* Loads all variables from .env file to "process.env" */
require("dotenv").config();

/* Require models to use the mongoose.model() singleton to reference models across the app */
require("./models/User");
require("./models/Teacher");
require("./models/Student");
require("./models/School");
require("./models/Department");
require("./models/Grade");
require("./models/Subject");
require("./models/Class");
require("./models/Group");
require("./models/Period");

const routes = require("./routes");
require("./passport");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 4242;
const ROOT_URL = dev ? process.env.DEV_URL : process.env.PRODUCTION_URL;

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose
  .connect(
    process.env.MONGO_URI,
    mongooseOptions
  )
  .then(() => console.log("DB connected"));

mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
});

const server = express();

if (!dev) {
  /* Helmet helps secure our app by setting various HTTP headers */
  server.use(helmet());
  /* Compression gives us gzip compression */
  server.use(compression());
}

server.use(cors()); // CONFIGURE TO SECURE BACKEND

server.use(express.json());
/* Express Validator will validate form data sent to the backend */
server.use(expressValidator());

/* give all Next.js's requests to Next.js server */
server.get("/_next/*", (req, res) => {
  handle(req, res);
});

server.get("/static/*", (req, res) => {
  handle(req, res);
});

const MongoStore = mongoSessionStore(session);
const sessionConfig = {
  name: "teacherkit.sid",
  // secret used for using signed cookies w/ the session
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 14 * 24 * 60 * 60 // save session for 14 days
  }),
  // forces the session to be saved back to the store
  resave: false,
  // don't save unmodified sessions
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 14 // expires in 14 days
  }
};

if (!dev) {
  sessionConfig.cookie.secure = true; // serve secure cookies in production environment
  server.set("trust proxy", 1); // trust first proxy
}

/* Apply session configuration to express-session */
server.use(session(sessionConfig));

/* Add passport middleware to set passport up */
server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) => {
  /* custom middleware to put user data (from passport) on the req.user to access it as such anywhere in the app */
  res.locals.user = req.user || null;
  next();
});

/* morgan for request logging from client */
server.use(logger("dev"));

// /* apply routes from the "routes" folder */
server.use(subdomain("api", routes));

/* Error handling from async / await functions */
server.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json(message);
});

server.get("/", (req, res) => {
  res.json("Working");
});

server.listen(port, err => {
  if (err) throw err;
  console.log(`Server listening on ${ROOT_URL}`);
});
