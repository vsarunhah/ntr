console.log("chrome extension running");

chrome.runtime.onMessage.addListener(gotMessage);

async function gotMessage(message, sender, sendResponse) {
    console.log(message);
    switch (message.txt) {
        case "autofill":
            console.log("content.js autofill");
            const urlParams = {
                user_id: message.user_id,
            }
            const response = await fetch("http://localhost:5000/profile/get_user", {
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
            console.log("res:", response);
            console.log("res.json:", await response.json());
            break;
        case "hello":
            let paragraphs = document.getElementsByTagName('p');
            for (elt of paragraphs) {
                elt.style['background-color'] = '#FF00FF';
            break;
        }
    }
    if (message.txt === "hello") {
        let paragraphs = document.getElementsByTagName('p');
        for (elt of paragraphs) {
            elt.style['background-color'] = '#FF00FF';
        }
    }
}