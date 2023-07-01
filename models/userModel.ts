const database = [
  {
    id: 1,
    type: 'admin',
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'loginlocal'
  },
  {
    id: 2,
    type: 'user',
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
  },
  {
    id: 3,
    name: "Johnny Doe",
    type: 'user',
    email: "johnny123@gmail.com",
    password: "johnny123!",
  },
  {
    id: 4,
    name: "Jonathan Chen",
    type: 'user',
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
  },
];

const userModel = {
  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  addUser: (id: number, type: string, name: string, email: string, password: string) => {
    database.push({
      id: id, 
      type: type, 
      name: name, 
      email: email, 
      password: password});
  }
};

export { database, userModel };
