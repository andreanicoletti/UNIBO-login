function setInputFields(username, password) {
    document.getElementById("userNameInput").value = username;
    document.getElementById("passwordInput").value = password;
}

chrome.runtime.onMessage.addListener((data, _, sendResponse) => {
    console.log(data);

    setInputFields(data.username, data.password);
    document.getElementById("submitButton").click();
});

