const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user-model"); // مسار المستخدم

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "1075500089909-r7nubelllhs9mgjfs5u30sebeqgi6ggq.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;

          let user = await User.findOne({ email });

          if (!user) {
            user = new User({
              name: profile.displayName,
              email,
              password: "", // لا يوجد كلمة مرور
              role: "user",
            });
            await user.save();
          }

          return done(null, user);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
