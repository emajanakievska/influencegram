const passport = require('passport');
const mongoose = require('mongoose');
const InstagramStrategy = require('passport-instagram').Strategy;
const keys = require('../config/keys');
const User = mongoose.model('users');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(
    new InstagramStrategy({
            clientID: keys.instagramClientID,
            clientSecret: keys.instagramClientSecret,
            callbackURL: "http://localhost:3000/auth/instagram/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({
                instagramId: profile.id
            });
            if (existingUser) {
                return done(null, existingUser);
            }
            const user = await new User({
                instagramId: profile.id,
                accessToken: accessToken,
                instagramUsername: profile._json.data.username,
                instagramProfilePicture: profile._json.data.profile_picture,
                instagramFullName: profile._json.data.full_name,
                instagramBio: profile._json.data.bio,
                instagramWebsite: profile._json.data.website,
                instagramBusiness: profile._json.data.is_business,
                instagramMedia: profile._json.data.counts.media,
                instagramFollows: profile._json.data.counts.follows,
                instagramFollowedBy: profile._json.data.counts.followed_by,
                influencer: profile._json.data.counts.followed_by > 100 ? true : false
            }).save();
            done(null, user);
        }
    ));