const h = require("../../../../app/utils/html.js");

function loaded(card) {
    const { headerBody, msgBody, buttonBody, responseBody } = renderLayout();
    renderHeader(headerBody);
    renderMsg(msgBody);

    function renderLayout() {
        const { body } = card.main;
        body.style.fontSize = 16;
        body.style.paddingRight = 10;

        let headerBody = h.createH3({ 
            cls: "mb-2" 
        });

        let msgBody = h.createP({ 
            cls: "mb-1"
        });

        body.appendChild(headerBody);
        body.appendChild(msgBody);
        return { headerBody, msgBody };
    }
}

function renderHeader(renderTo) {
    renderTo.innerText = "Server Side Data";
}

function renderMsg(renderTo) {
    renderTo.innerHTML = `
        Need to GET and/or POST data to the server? No problem. Just add a file called "backend.js" to your widget which implements a "getData" and/or "postData" function to process GET and POST requests.
    `;
}

module.exports = { loaded };

