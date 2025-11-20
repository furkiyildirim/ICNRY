const { MongoClient } = require('mongodb');
const fs = require('fs');
const services = require('../controller/services.js')


var database_config = JSON.parse(fs.readFileSync('../model/database.json', 'utf-8'));
// const uri = `mongodb+srv://${database_config['username']}:${database_config['password']}@${database_config['cluster-url']}/test?retryWrites=true&w=majority`;
const uri = 'mongodb://localhost:27017';

// database connection
const database = new MongoClient(uri);

async function find_user(query){
    try {
        // connect server
        await database.connect();
        console.log('✅ MongoDB bağlantısı başarılı.');
        // user database
        const udb = await database.db(database_config['database'])
        const users = udb.collection(database_config['collections']['users']);
        const result  = await users.find(query).toArray()
        // TODO: Do something.
        return result
    }catch(err){
        console.error('❌ MongoDB bağlantı hatası:', err);
    }finally {
    }
}
async function create_user(data, ip_addr){
    try {
        var data = {
            username:data['username'],
            password:services.encrypt_password(data['password'])
        }

        // connect server
        await database.connect();
        console.log('✅ MongoDB bağlantısı başarılı.');
        // user database
        const udb = await database.db(database_config['database'])
        const users = udb.collection(database_config['collections']['users']);

        users.insertOne(data)
        console.log("1 user created");

        const security = udb.collection(database_config['collections']['security']);
        const user_id  =  await users.find(data).toArray()  // ERROR:
        console.log(user_id)
        security.insertOne(
            {
                u_id:user_id,
                ip_address: ip_addr,
                success: true,
                date: new Date()
            }
        )
        console.log("login attempting logged");

        const loc_data = udb.collection(database_config['collections']['data']);
        loc_data.insertOne(
            {
                ud_id:user_id,
                location: [],
                access_permission: false
            }
        )
        console.log("loc data saved");





        // TODO: Do something.
    }catch(err){
        console.error('❌ MongoDB bağlantı hatası:', err);
    }finally {
    }
}

async function delete_user(params) {

}

async function read_security(params) {

}

async function write_security(params) {

}

module.exports = { create_user, find_user, delete_user }
