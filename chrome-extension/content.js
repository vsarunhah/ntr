console.log("chrome extension running");

chrome.runtime.onMessage.addListener(gotMessage);

function callGotMessage(uid) {
    // console.log("----------------UID: ", uid);
    let message = {
        txt: "autofill",
        user_id: uid,
    };
    // console.log("callGotMessage", message);
    gotMessage(message, null, null);
}

function checkToClick(query, user_id) {
    // console.log("----------------ctc user_id: ", user_id);
    if (document.querySelector(query)) {
        document.querySelector(query).click();
        // callGotMessage();
    }
    callGotMessage(user_id);
}

function setValue(query, value) {
    if (document.querySelector(query)) {
        document.querySelector(query).value = value + "\n";
    }
}

function setAreaValue(area, query, value) {
    if (area.querySelector(query)) {
        area.querySelector(query).value = value + "\n";
    }
}


function autoFillExperiences(experiences, user_id) {
    // console.log("autoFillExperiences", user_id);

    if (experiences.length == 0) {
        return;
    }

    // reload only if there is no space for an expeience
    if (document.querySelector(`[data-automation-id="workExperience-1"]`) == null) {
        // console.log("reload - click add work experience button");
        checkToClick(`[aria-label="Add Work Experience"]`, user_id);
    }

    area = document.querySelector(`[data-automation-id="workExperience-1"]`);
    // console.log("area: ", area); // print all input elements
    // console.log(area.querySelector(`[data-automation-id="jobTitle"]`));
    setAreaValue(area, `[data-automation-id="jobTitle"]`, experiences[0].title);
    setAreaValue(area, `[data-automation-id="company"]`, experiences[0].company_name);
    setAreaValue(area, `[data-automation-id="location"]`, experiences[0].location);
    setAreaValue(area, `[data-automation-id="description"]`, experiences[0].description);
    setAreaValue(area, `[data-automation-id="startDate"]`, experiences[0].start_date);
    setAreaValue(area, `[data-automation-id="endDate"]`, experiences[0].end_date);

    for (let i = 1; i < experiences.length; i++) {
        area = document.querySelector(`[data-automation-id="workExperience-${i + 1}"]`);
        if (area == null) {
            checkToClick(`[aria-label="Add Another Work Experience"]`, user_id);
        }
        setAreaValue(area, `[data-automation-id="jobTitle"]`, experiences[i].title);
        setAreaValue(area, `[data-automation-id="company"]`, experiences[i].company_name);
        setAreaValue(area, `[data-automation-id="location"]`, experiences[i].location);
        setAreaValue(area, `[data-automation-id="description"]`, experiences[i].description);
        setAreaValue(area, `[data-automation-id="startDate"]`, experiences[i].start_date);
        setAreaValue(area, `[data-automation-id="endDate"]`, experiences[i].end_date);
    }
}

function autoFillEducation(education, user_id) {
    // console.log("autoFillEducation", user_id);

    if (education.length == 0) {
        return;
    }

    // reload only if there is no space for an expeience
    if (document.querySelector(`[data-automation-id="education-1"]`) == null) {
        // console.log("reload - click add education button");
        checkToClick(`[aria-label="Add Education"]`, user_id);
    }

    area = document.querySelector(`[data-automation-id="education-1"]`);
    // console.log("area: ", area); // print all input elements
    // console.log(area.querySelector(`[data-automation-id="jobTitle"]`));
    setAreaValue(area, `[data-automation-id="school"]`, education[0].university);
    setAreaValue(area, `[data-automation-id="degree"]`, education[0].degree);

    for (let i = 1; i < education.length; i++) {
        area = document.querySelector(`[data-automation-id="education-${i + 1}"]`);
        if (area == null) {
            checkToClick(`[aria-label="Add Another Education"]`, user_id);
        }
        setAreaValue(area, `[data-automation-id="school"]`, education[i].university);
        setAreaValue(area, `[data-automation-id="degree"]`, education[i].degree);
    }
}

function autofillLinks(links, user_id) {
    // console.log("autofillLinks", user_id);
    if (links.length == 0) {
        return;
    }
    if (document.querySelector(`[data-automation-id="websitePanelSet-1"]`) == null) {
        // console.log("reload - click add link button");
        checkToClick(`[aria-label="Add Websites"]`, user_id);
    }
    area = document.querySelector(`[data-automation-id="websitePanelSet-1"]`);
    // console.log("area: ", area); // print all input elements
    setAreaValue(area, `[data-automation-id="website"]`, links[0].link);

    for (let i = 1; i < links.length; i++) {
        area = document.querySelector(`[data-automation-id="websitePanelSet-${i + 1}"]`);
        if (area == null) {
            checkToClick(`[aria-label="Add Another Websites"]`, user_id);
        }
        setAreaValue(area, `[data-automation-id="website"]`, links[i].link);
    }
}

function autofillUserInfo(user) {
    // console.log("autofillUserInfo", user);
    setValue(`[data-automation-id="legalNameSection_firstName"]`, user.firstName + "\n");
    setValue(`[data-automation-id="legalNameSection_lastName"]`, user.lastName + "\n");
    setValue(`[data-automation-id="legalNameSection_name"]`, user.name + "\n");
    setValue(`[data-automation-id="addressSection_addressLine1"]`, user.address + "\n");
    setValue(`[data-automation-id="phone-number"]`, user.phoneNumber + "\n");
    if (document.querySelector(`[aria-label="Add Work Experience"]`) != null || document.querySelector(`[aria-label="Add Another Work Experience"]`) != null) {
        autoFillExperiences(user.experiences, user._id);
    } else {
        // console.log("Add work experience button not found");
    }
    if (document.querySelector(`[aria-label="Add Education"]`) != null || document.querySelector(`[aria-label="Add Another Education"]`) != null) {
        autoFillEducation(user.educations, user._id);
    } else {
        // console.log("Add work experience button not found");
    }
    if (document.querySelector(`[aria-label="Add Websites"]`) != null || document.querySelector(`[aria-label="Add Another Websites"]`) != null) {
        autofillLinks(user.links, user._id);
    }

}

async function gotMessage(message, sender, sendResponse) {
    console.log("message: ", message, "sender: ", sender, "sendResponse: ", sendResponse);
    // console.log(message);
    switch (message.txt) {
        case "autofill":
            // console.log("content.js autofill");
            const urlParams = {
                user_id: message.user_id,
                // user_id: "63615dde684c32f24424e7a8"
            }
            const response = await fetch("http://localhost:5000/profile/get", {
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
            // console.log("res:", response);
            const user = await response.json();
            // console.log("USER:", user);
            autofillUserInfo(user.data); // autofill general info
            // let message = {
            //     txt: "autofill complete",
            //     user_id: "63544acdd5ce61f94f2ca257",
            // };
            // await chrome.tabs.sendMessage(tab.id, message);
            break;
        case "hello":
            let paragraphs = document.getElementsByTagName('p');
            for (elt of paragraphs) {
                elt.style['background-color'] = '#FF00FF';
            break;
        }
    }
}