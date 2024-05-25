const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user-model')

passport.use(
    'login',
    new GoogleStrategy(
        {
            clientID: process.env.client_id,
            clientSecret: process.env.client_secret,
            callbackURL: '/api/auth/login/google',
        }),
    async (accessToken, refreshToken, profile, done) => {
        let user = await User.findOne({googleId: profile.id})
        if (!user) res.status(404).json({message: 'User not found'})
        return done(null, user)
    }
)

passport.use(
    'register',
    new GoogleStrategy(
        {
            clientID: process.env.client_id,
            clientSecret: process.env.client_secret,
            callbackURL: '/api/auth/register/google',
        }),
    async (accessToken, refreshToken, profile, done) => {
        let user = await User.findOne({googleId: profile.id})
        if (user) res.status(404).json({message: 'User already exists'})
        user = new User({
            googleId: profile.id,
            email: profile.emails[0].value
        })
        await user.save()
        return done(null, user)
    }
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})