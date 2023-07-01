import {userModel} from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
    else {
      throw new Error('Password is incorrect');
    }
  }
};

const getUserById = (id: any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const isUserValid = (user: any, password: string) => {
  return user.password === password;
}

const createUser = (user: any) => {
  userModel.addUser(
    user.id, 
    user.type,
    user.name, 
    user.email, user.
    password);
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
  createUser
};
