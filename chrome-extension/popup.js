const init = function() {
    document.getElementById('autofill-button').addEventListener('click', autofill);
    document.getElementById('button-send').addEventListener('click', send);
    document.getElementById('button-auth').addEventListener('click', auth);
    document.getElementById('button-logout').addEventListener('click', logout);
    if (localStorage.getItem("user_id") != null) {
        console.log("user_id:", localStorage.getItem("user_id"));
        document.getElementById('validate-user').style.display = "none";
        document.getElementById('form-user').style.display = "block";
        document.getElementById('autofill-button').style.display = "block";
    } else {
        document.getElementById('validate-user').style.display = "block";
        document.getElementById('form-user').style.display = "none";
        document.getElementById('autofill-button').style.display = "none";
    }
}

const logout = async function(ev) {
    ev.preventDefault(); 
    ev.stopPropagation();
    console.log("popup logout HERE");
    localStorage.removeItem("user_id");
    location.reload();
}

const auth = async function(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    console.log("popup auth HERE");
    let urlParams = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    }

    const response = await fetch("http://localhost:5000/auth", {
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

    const data = await response.json();
    console.log("data:", data);
    localStorage.setItem("user_id", data.user_id);
    location.reload();
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
            user_id: localStorage.getItem("user_id"),
        };
        console.log("message:", message);
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
        user_id: localStorage.getItem("user_id"),
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
};


document.addEventListener('DOMContentLoaded', init);
