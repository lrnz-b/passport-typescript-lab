import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index'
import { getUserById, createUser } from "../../controllers/userController";

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID || "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    callbackURL: "http://localhost:8000/auth/github/callback",
    passReqToCallback: true,
  },
    
    /* FIX ME 😭 */
  async (
    req: any, 
    accessToken: any, 
    refreshToken: any, 
    profile: any, 
    done: any) => {
      try {
        const user = getUserById(profile.id);
        done(null, user);
      }
      catch {
        const newUser = {id: profile._json.id, name: profile._json.name, email: '', password: ''};
        createUser(newUser);
        done(null, newUser);
      }
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
