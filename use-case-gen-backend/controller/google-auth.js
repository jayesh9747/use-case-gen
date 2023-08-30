const express = require('express');
const router = express.Router();
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"],
},function verify(accessToken,refreshToken,profile,cb){
    //check if user already exit
    User.findOne({ProfileId:profile.id,
        issuer:"google"}).then((currentUser)=>{
        if(currentUser){
            //already have the user
            console.log('currentUser is',currentUser);
        }else{
            // if not , create new user
            new User({
                username:profile.displayName,
                ProfileId:profile.id,
                email:profile.emails[0].value,
                issuer:profile.provider,
               }).save().then((newUser)=>{
                console.log(`newuser created: ${newUser}`)
               })
        }
    })
    cb(null,profile);
}));


router.get('/auth/google',passport.authenticate('google',{scope:["profile","email"]})
);

router.get('/auth/google/callback',passport.authenticate('google',{
    successRedirect: process.env.CLIENT_URL,
    failureRedirect:'/login/failed',
}))




module.exports = router;