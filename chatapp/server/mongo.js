const { MongoClient } = require('mongodb');


async function main() {
    const uri = "mongodb+srv://Ahmed:1234@firstcluster.qn8ps.mongodb.net/chat_app?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
main().catch(console.error);

//creating a new room
async function createRoom(room) { }

//creating a new message in room
async function createMessage(room, message) { }

//adding new user
async function createUser(user) {
    const uri = "mongodb+srv://Ahmed:1234@firstcluster.qn8ps.mongodb.net/chat_app?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
    try {
        await client.connect();

        await client.db('chat_app').collection('users').insertOne(user);
        console.log(`new user added`);

    } catch (e) {
        console.error("Error is at create user: " + e);
        return e;
    } finally {
        await client.close();
    }
}

//retrieve all users
async function retrieveUsers() {
    const uri = "mongodb+srv://Ahmed:1234@firstcluster.qn8ps.mongodb.net/chat_app?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    let result;

    try {
        client.connect();

        result = client.db('chat_app').collection('users').find().toArray();
        console.log('result length' + result.length);
        result.forEach(item => { console.log(item) });
        return result;

    } catch (e) {
        return result;
        // console.error(e);

    } finally {
        await client.close();
    }
}

//retrieve users with matching emails
function retrieveUsername(username) {
    const uri = "mongodb+srv://Ahmed:1234@firstcluster.qn8ps.mongodb.net/chat_app?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
    let result;

    try {
        client.connect();

        result = client.db('chat_app').collection('users').find({ _id: username }).toArray();
        console.log(result.length);
        result.forEach(item => { console.log(item) });
        return result;

        //move the call to index.js instead of users.js

    } catch (e) {
        return result;
        // console.error('showing error here ' + e);
        // return e.toString();

    } finally {
        client.close();
        // return { result };
    }

}

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

module.exports = { main, createRoom, createMessage, createUser, retrieveUsers, retrieveUsername }