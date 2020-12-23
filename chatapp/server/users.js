const { createUser, retrieveUsername, retrieveUsers } = require('./mongo');
const { use } = require('./router');
const users = [{}];
const currUsers = [];

//sign-up a user
const signUp = ({ _id, username, name, email, password }) => {
  email = email.trim().toLowerCase();
  const user = { _id, username, name, email, password };

  //most recent one
  // (async () => {
  //   const error = await createUser(user);
  //   console.log('in users folder checking error: ' + error);
  //   if (error) {
  //     return { error: 'Username already exists' }
  //   }
  // })();

  // const emailExists = currUsers.find(
  //   (user) => user.email === email
  // );


  // let emailExists;
  // (async () => {
  //   emailExists = await retrieveUsersEmail(email);
  //   console.log('this record exists: ' + emailExists);
  //   if (emailExists) {
  //     return { error: 'Email already exists' };
  //   }
  //   console.log('error checking skipped')
  //   console.log(emailExists);

  //   user = { _id, username, name, email, password };
  //   currUsers.push(user);

  //   createUser(user);
  //   return { user };
  // })().then(console.log('error checking done')
  // )



  // MOST RECENT ONE
  // const allUsers = retrieveUsers().then();
  // console.log('printing users: ' + allUsers)
  // allUsers.forEach(item => { console.log(item) });

  const usernameExists = retrieveUsername(username).then();
  console.log(usernameExists);
  if (usernameExists.length > 0) {
    console.log('ERROR CAUGHT!!!!!!!!!!!!!!')
    return { error: 'Email already exists' };
  }

  // console.log('error checking done')







  // console.log('bohat mazaydaaaar ' + emailExists);

  // const user = { _id, username, name, email, password };
  // currUsers.push(user);

  // createUser(user);

  // console.log(currUsers);

  return { user };
}

//get all users from DB

//adding a user
const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //checking is user already exists
  const existingUserCheck = users.find(
    (user) => user.name === name && user.room === room
  );

  if (existingUserCheck) {
    return { error: "Username is taken" };
  }

  const user = { id, name, room };
  users.push(user);

  return { user };
};

//removing a user
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

//checking if user is present
const getUser = (id) => users.find((user) => user.id === id);

// checking users in a room
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom, signUp };
