module.exports = (req, res, next) => {
    if (req.user.instagramFollowedBy < 100) {
        return res.status(401).send({
            error: 'You must be an influencer!'
        });
    }
    next();
};