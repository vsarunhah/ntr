const init = function() {
    document.getElementById('autofill-button').addEventListener('click', autofill);
    document.getElementById('button-send').addEventListener('click', send);
}

async function autofillCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let tab = await chrome.tabs.query(queryOptions, sendAutofillMessage);
    // console.log("tab:", tab);
    // chrome.tabs.getCurrentTab(gotTab);

    async function sendAutofillMessage(tabs) {
        let message = {
            txt: "autofill",
            user_id: "63544acdd5ce61f94f2ca257",
        };
        await chrome.tabs.sendMessage(tabs[0].id, message);
    }
    return tab;
}

const autofill = async function(ev) {
    ev.preventDefault(); 
    ev.stopPropagation();

    console.log("popup autofill HERE");
    let tab = await autofillCurrentTab();
}

const send = async function(ev) {
    ev.preventDefault(); 
    ev.stopPropagation();
    console.log("popup send HERE");

    let urlParams = {
        companyName: document.getElementById('company-name').value,
        roleName: document.getElementById('role-name').value,
        location: document.getElementById('location').value,
        applicationStatus: document.getElementById('application-status').value,
        applicationDate: new Date(),
        user_id: "63544acdd5ce61f94f2ca257",
    }

    await fetch("http://localhost:5000/application/create", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(urlParams),
   })
   .catch(error => {
     window.alert(error);
     return;
   });

    // req.open("POST", baseUrl, true);
    // req.setRequestHeader("Content-type", "multipart/form-data");
    // // req.send(urlParams);
    // req.send(JSON.stringify(urlParams)); // send data as JSON

    // req.onreadystatechange = function() { // Call a function when the state changes.
    //     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    //         console.log("Got response 200!");
    //     }
    };

  

const send1 = async function(ev) {
    ev.preventDefault(); 
    ev.stopPropagation();

    //IF we wanted to do some async things then use a Promise with .then and .catch
    console.log("popup.js user_id: ", localStorage.getItem("user_id"));
    
    console.log("current tab: ", await getCurrentTab());

    chrome.storage.sync.get(['user_id'], function(result) {
        console.log('Value currently is ' + result.user_id);
    });
    if(localStorage.getItem("user_id") != null){
        //good to go
        console.log("user_id:", localStorage.getItem("user_id"));
        // document.getElementById('form-user').submit();
        // console.log("form:", document.getElementById('form-user'));
        let form = {
            companyName: document.getElementById('company-name').value,
            roleName: document.getElementById('role-name').value,
            location: document.getElementById('location').value,
            applicationStatus: document.getElementById('application-status').value,
            applicationDate: new Date(),
            user_id: localStorage.getItem("user_id"),
        }
        console.log("form:", form);
    }else{
        console.log("need to login");
    }
}

document.addEventListener('DOMContentLoaded', init);
