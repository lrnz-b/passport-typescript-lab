import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    try {
      const user = getUserByEmailIdAndPassword(email, password);
      return done(null, user);
    }
    catch(err: any) {
      return done(null, false, {
        message: err.message
      });
    }
    
  }
);

declare global {
  namespace Express {
    interface User {
      id: number;
    }
  }
}

passport.serializeUser(function (user: Express.User, done: (err: any, id?: unknown) => void) {
  done(null, user.id);
});

passport.deserializeUser(function (id: number, done: (err: any, user?: false | Express.User | null | undefined) => void) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
