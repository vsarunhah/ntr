// test login with valid credentials
const axios = require("axios");
const { response } = require("express");
async function loginWithValidCredentials() {
    // login with valid credentials
    try {
        const response = await axios.post("http://localhost:5000/auth", {
            email: "bruh123@gmail.com",
            password: "Bruh123!"
        });
        if (response.status === 200) {
            print("login with valid credentials test passed", true);
        }
        else {
            print("login with valid credentials test failed", false);
            print(response, false);
        }
    } catch (error) {
        print("login with valid credentials test failed", false);
        print(response, false);
        print(error, false);
    }
}

// test login with invalid credentials
async function loginWithInvalidCredentials() {
    // login with valid credentials
    try {
        const response = await axios.post("http://localhost:5000/auth", {
            email: "bruh123@gmail.com",
            password: "Bruh123"
        });
        if (response.status === 400) {
            print("login with invalid credentials test passed", true);
        }
        else {
            print("login with invalid credentials test failed", false);
            print(response, false);
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            print("login with invalid credentials test passed", true);
            return;
        }
        print("login with invalid credentials test failed", false);
        print(response, false);
        print(error, false);
    }
}

function print(message, pass) {
    color = pass ? "\x1B[32m" : "\x1B[31m";
    console.log(color + message)
}

(async() => await loginWithValidCredentials())();
(async() => await loginWithInvalidCredentials())();