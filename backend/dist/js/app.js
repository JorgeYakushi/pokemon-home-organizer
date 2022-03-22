"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("@/routes/index"));
const box_1 = require("@/controllers/box");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const user_model_1 = require("@/models/user.model");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ extended: false, limit: "50mb" }));
app.use(index_1.default);
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.k97cx.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
console.log(uri);
const options = { useNewUrlParser: true, useUnifiedTopology: true };
app.use((0, express_session_1.default)({
    secret: "gaea",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// const userSchema: Schema = new Schema({
//   username: { type: String, required: true },
//   name: { type: String, required: true },
//   googleId: { type: String, required: false },
//   secret: { type: String, required: false },
// });
// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);
//const User = new mongoose.model<IUser>("User", userSchema);
passport_1.default.use(user_model_1.User.createStrategy());
passport_1.default.serializeUser((user, done) => done(null, user.id));
passport_1.default.deserializeUser((id, done) => user_model_1.User.findById(id, (err, user) => done(err, user)));
console.log(process.env.CLIENT_ID);
passport_1.default.use(new passport_google_oauth20_1.default({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.API}/auth/google/callback`,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
}, (accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield user_model_1.User.findOne({
            googleId: profile.id,
        });
        if (user) {
            cb(null, user);
        }
        else {
            user = yield user_model_1.User.create({
                googleId: profile.id,
                displayName: profile.displayName,
            });
            (0, box_1.createBoxes)(profile.id);
            cb(null, user);
        }
    }
    catch (err) {
        cb(err);
    }
})));
app.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile"] }));
app.get("/auth/google/callback", passport_1.default.authenticate("google", { failureRedirect: `${process.env.WEB}` }), function (req, res) {
    res.redirect(`${process.env.WEB}/?googleId=${req.user.googleId}&displayName=${req.user.displayName}`);
});
app.get("/logout", function (req, res) {
    res.redirect(`${process.env.WEB}`);
});
mongoose_1.default.set("useFindAndModify", false);
mongoose_1.default.set("useCreateIndex", true);
mongoose_1.default
    .connect(uri, options)
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch((error) => {
    throw error;
});
