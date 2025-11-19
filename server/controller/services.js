const { createHash } = require('crypto');

function token_generator(username, password){

}

function token_resolver(token) {

}

function access_code_generator(){

}

function encrypt_password(password){
    const result = createHash('sha256').update(password).digest("base64");
    return result
}



module.exports = { token_generator, token_resolver, access_code_generator,encrypt_password}
