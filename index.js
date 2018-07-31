const express = require('express');
const passport = require('passport');
const monogoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const fileUpload = require('express-fileupload');
const keys = require('./config/keys');

require('./models/User');
require('./models/Post');
require('./services/passport');

monogoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());


require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/postRoutes')(app);


app.listen(5000, () => console.log("example listening on port 5000"))