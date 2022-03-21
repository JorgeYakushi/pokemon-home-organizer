import "dotenv/config";
import express, { Express } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import boxRoutes from "@/routes/index";

import { model, Schema } from "mongoose";
import { IUser } from "@/types/user.interface";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import PassportLocalModel from "mongoose";
import GoogleStrategy from "passport-google-oauth20";
import findOrCreate from "mongoose-findorcreate";
import { User } from "@/models/user.model";
const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

app.use(boxRoutes);

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.k97cx.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
console.log(uri);
const options = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(
  session({
    secret: "gaea",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// const userSchema: Schema = new Schema({
//   username: { type: String, required: true },
//   name: { type: String, required: true },
//   googleId: { type: String, required: false },
//   secret: { type: String, required: false },
// });
// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);
//const User = new mongoose.model<IUser>("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser((user: any, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  User.findById(id, (err, user) => done(err, user))
);
console.log(process.env.CLIENT_ID);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      try {
        let user = await User.findOne({
          googleId: profile.id,
        });
        if (user) {
          cb(null, user);
        } else {
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
          });

          cb(null, user);
        }
      } catch (err) {
        cb(err);
      }
    }
  )
);
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  function (req: any, res) {
    res.redirect(
      `http://localhost:3000/?googleId=${req.user.googleId}&displayName=${req.user.displayName}`
    );
  }
);
app.get("/logout", function (req, res) {
  res.redirect("http://localhost:3000");
});
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
