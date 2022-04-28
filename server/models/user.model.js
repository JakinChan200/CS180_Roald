const path = '../database/users.json';
let users = require(path);
const helper = require('../helpers/helper.js');
const json2csv = require('json2csv').parse;
const { writeFile } = require('fs').promises;
const fs = require('fs');

async function JSONtoCSV() {
    var data = JSON.parse(fs.readFileSync('./database/users.json'));
    var fields = ['username', 'videos'];
    var csv = "";
    if (data.length !== 0) {
        csv = json2csv(data, fields);
    } else {
        csv = '"username","videos"';
    }
    writeFile('./csv/USERS.csv', csv, function(err) {
        if (err) console.log('ERROR WRITING TO CSV');
        console.log('Saved to CSV');
    });
}

// resolves a read for all users
function getUsers() {
    return new Promise((resolve, reject) => {
        if (users.length === 0) {
            reject({
                message: 'No users available',
                status: 202
            })
        }
        resolve(users)
    })
}

// resolves a read for a specific user given a username
function getUser(username) {
    return new Promise((resolve, reject) => {
        helper.findInArray(users, username)
        .then(user => resolve(user))
        .catch(err => reject(err))
    })
}

// resolves a insert for a given user object
// TODO: check for existing user
function insertUser(newUser) {
    return new Promise((resolve, reject) => {
        users.push(newUser);
        helper.writeJSONFile('./database/users.json', users);
        JSONtoCSV();
        resolve(newUser)
    })
}

function updateUser(username, newUser) {
    return new Promise((resolve, reject) => {
        helper.findInArray(users, username)
        .then(user => {
            const index = users.findIndex(u => u.username == username);
            users[index] = newUser;
            helper.writeJSONFile('./database/users.json', users);
            JSONtoCSV();
            resolve(users[index]);
        })
        .catch(err => reject(err))
    })
}

function deleteUser(username) {
    return new Promise((resolve, reject) => {
        helper.findInArray(users, username)
        .then(() => {
            users = users.filter(u => u.username !== username);
            helper.writeJSONFile('./database/users.json', users);
            JSONtoCSV();
            resolve();
        })
        .catch(err => reject(err));
    })
}

module.exports = {
    getUsers,
    getUser,
    insertUser,
    updateUser,
    deleteUser
}