import passport from "passport";
import LocalStrategy from "passport-local";
import OAuth2Strategy from "passport-oauth2";
import { User } from "./repository/user-repository";
import encrypt from "./utils/encryption";
import { accessGithubApi } from "./api/user";
passport.use(
  new LocalStrategy({ usernameField: "userId" }, async function (
    username: string,
    password: string,
    done
  ) {
    const [[user, _], err] = await User.getWithUserId(username);
    // console.log(user, err);
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    if (user.password !== encrypt(password)) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  })
);

const baseUrl = "http://localhost:3000";
const githubLoginUrl = "https://github.com/login/oauth/authorize";
const githubTokenUrl = "https://github.com/login/oauth/access_token";
const githubCallbackUrl = `${baseUrl}/api/github-login/callback`;

const githubOption = {
  authorizationURL: githubLoginUrl,
  tokenURL: githubTokenUrl,
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: githubCallbackUrl,
};

const githubCallback = async (accessToken, refreshToken, profile, done) => {
  console.log(accessToken, refreshToken, profile);
  [profile] = await accessGithubApi({ token: accessToken });
  let [[user, _], err] = await User.getWithSocialId(profile.id);
  if (!user) {
    let [[userId, _], err] = await User.createWithSocial({
      social_id: profile.id,
      name: profile.login,
    });
    [[user, _], err] = await User.getWithId(userId);
  }
  return done(err, user);
};

passport.use("provider", new OAuth2Strategy(githubOption, githubCallback));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const [[user, _], err] = await User.getWithId(id);
  done(err, user);
});

export default passport;