import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import {
  Strategy as JWTStrategy,
  ExtractJwt as ExtractJWT,
} from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

// Configure passport local strategy
passport.use(
  new localStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'Invalid login details' });
        }
        // Verify the password
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid login details' });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

// JWT-Options
const options = {
  jwtFromRequest: ExtractJWT.fromExtractors([
    (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['token'];
        return token;
      }
    },
  ]),
  secretOrKey: process.env.JWT_SECRET,
};

// JWT
passport.use(
  new JWTStrategy(options, async (userDecoded, done) => {
    try {
      const user = await User.findById(userDecoded.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

// Google oauth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACKURL,
    },
    async (accessToken, refreshtoken, profile, done) => {
      console.log(profile);
      try {
        // check if user found
        let user = await User.findOne({
          googleId: profile.id,
        });
        // destructure properties from the profile
        const {
          id,
          displayName,
          name,
          _json: { picture },
        } = profile;
        // check if email exists
        let email = '';
        if (Array.isArray(profile?.emails) && profile?.emails?.length > 0) {
          email = profile.emails[0].value;
        }
        // check if user not found
        if (!user) {
          user = await User.create({
            name: displayName,
            googleId: id,
            authMethod: 'google',
            email,
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

export default passport;
