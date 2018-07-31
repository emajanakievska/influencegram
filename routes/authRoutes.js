const passport = require('passport');
const instagramApi = require('instagram-node').instagram();

module.exports = app => {

    app.get(
        '/auth/instagram',
        passport.authenticate('instagram', {
            scope: ['likes', 'comments', 'relationships', 'basic', 'public_content', 'follower_list']
        }),
        (req, res) => {
            res.send('auth');
        }
    );

    app.get(
        '/auth/instagram/callback',
        passport.authenticate('instagram'),
        (req, res) => {
            res.redirect('/user/home');
        }
    );

    app.get(
        '/auth/logout',
        (req, res) => {
            req.logout();
            res.redirect('/');
        }
    );

};