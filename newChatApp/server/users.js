const users = [];

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

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
