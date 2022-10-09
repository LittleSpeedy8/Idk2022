const express = require("express")
const app = express()
const client = require("../index")
const config = client.config

const session = require("express-session")
const MemoryStore = require("memorystore")(session)
const DiscordStrategy = require("passport-discord").Strategy
const passport = require("passport")

const bodyParser = require('body-parser');
const path = require("path");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views")


passport.use(
    new DiscordStrategy({
        clientID: "Your Bot ClientID",
        clientSecret: "Fun",
        callbackURL: "http://localhost/callback",
        scope: ["identify", "guilds"]
    },

        function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                return done(null, profile)
            })
        }
    )
)

app.use(session({
    store: new MemoryStore({ checkPeriod: 86400000 }),
    secret: "This can be annything idk",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (obj, done) {
    done(null, obj)
})

module.exports.Dashboard = (client) => {



    app.get('/', (req, res) => res.render('home', { bot: client, req }))
    app.get('/login', async (req, res, next) => {next();}, passport.authenticate('discord'))
    app.get("/logout", (req, res) => {
        req.session.destroy(() => {})
    })
    app.get('/callback', passport.authenticate("discord", { failureRedirect: "/" }), function (req, res) {
        res.redirect("/")
    })

    app.use(express.static(path.join(__dirname, '/views')));
    app.use('/css', express.static(__dirname + 'views/assets/css/'))
    app.use('/js', express.static(__dirname + 'views/assets/js/'))

    app.get('*', (req, res) => {
        res.sendFile(__dirname + '/views/404.html')
    });

    app.listen(client.config.port, () => {
        console.log(`Server is on port http://localhost:${client.config.port}/`)
    })

}