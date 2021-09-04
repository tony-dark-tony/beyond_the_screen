const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const app = express();
const http = require('http').createServer(app);

const port = process.env.PORT || 1212;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.render("splash")
})
app.get("/login", (req, res)=>{
    res.render("login")
})
app.get("/done", (req, res)=>{
    res.send("Done")
})
app.get("/fail", (req, res)=>{
    res.send("Fail")
})
app.use(session({
    secret: "tonyparker"
}))
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
    done(null, user);
    // ghi vao cookie
  });
  
  passport.deserializeUser((name, done) => {
    // lay cookie so sanh
    if (name == user.username) {
      return done(null, name);
    } else {
      return done(null, false);
    }
  });
passport.use( new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },      
    (username, password, done)=>{
        if (username == "Tony" && password == "Parker"){
            done(null, user)
        }
        else{
            return done(null, false, {message: "Wrong password"})
        }
    }
));
app.post("/login", 
    passport.authenticate('local', {
        successRedirect: '/done',
        failureRedirect: '/fail'
    })
);
http.listen(port);