function sendPayload(data, tabId) {
    chrome.tabs.sendMessage(tabId, data);
}

chrome.action.onClicked.addListener((tab) => {
    if (!tab.url.includes("https://idp.unibo.it")) {
        console.log("La pagina non supporta il login IDP UNIBO");
        return;
    }

    const url = chrome.runtime.getURL("./config.json");

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw Error("Errore nella lettura del file di configurazione");
            }

            return response.json();
        })
        .then((data) => {
            if (!("username" in data) | !("password" in data)) {
                throw Error("Campi di username e/o password mancanti nel file di configurazione");
            }
            
            sendPayload(data, tab.id)
        })
        .catch(console.log);
});