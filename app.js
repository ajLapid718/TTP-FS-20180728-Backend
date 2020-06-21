// Here, we will sync our database, create our application, and export this module so that we can use it in the bin directory, where we will be able to establish a server to listen and handle requests and responses;

// Require environmental variables if we are in development or testing;

// if (process.env.NODE_ENV !== 'production') {
//   require('./secrets');
// }

// Module dependencies;
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const passport = require('passport');
const cors = require("cors");

// Utilities;
const createLocalDatabase = require('./utilities/createLocalDatabase');

// Our database instance;
const db = require('./database');

// Handle the creation and storage of sessions;
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({ db });


// Our authRouter and our apiRouter;
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/index');

// A helper function to sync our database;
const syncDatabase = () => {
  if (process.env.NODE_ENV === 'production') {
    db.sync();
  }
  else {
    console.log('As a reminder, the forced synchronization option is on');
    db.sync({ force: true })
      .catch(err => {
        if (err.name === 'SequelizeConnectionError') {
          createLocalDatabase();
        }
        else {
          console.log(err);
        }
      });
    }
};

// Instantiate our express application;
const app = express();

// A helper function to create our app with configurations and middleware;
const configureApp = () => {
  app.use(helmet());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(compression());
  app.use(cookieParser());

  app.use(cors({ credentials: true, origin: ["https://workforce-stock-app.herokuapp.com", "https://serene-varahamihira-fbc247.netlify.app/#/"]}));
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // Serialize and deserialize the user into the session;
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.models.user.findById(id);
      done(null, user);
    }
    catch (err) {
      done(err);
    }
  });

  // Handle sessions;
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'mahalkita',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  );

  // Initialize passport;
  app.use(passport.initialize());
  app.use(passport.session());

  // Mount our authRouter and our apiRouter;
  app.use('/auth', authRouter);
  app.use('/api', apiRouter);

  app.get("/", (req, res, next) => {
    res.status(200).json("Server Running!");
  })

  // Error handling;
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    }
    else {
      next();
    }
  });

  // More error handling;
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

// Main function declaration;
const bootApp = async () => {
  await syncDatabase();
  await configureApp();
};

// Main function invocation;
bootApp();

// Export our app, so that it can be imported in the www file;
module.exports = app;
