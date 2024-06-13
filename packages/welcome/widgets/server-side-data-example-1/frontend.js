const h = require("../../../../app/utils/html.js");

let headerBody = null;
let msgBody = null;
let buttonBody = null;
let responseBody = null;

function loaded(card) {
    const { widget, main } = card;
    renderLayout(main.body);
    renderHeader();
    renderMsg();
    renderButton(widget);
}

function renderLayout(renderTo) {
    renderTo.style.fontSize = 16;

    headerBody = h.createH4({ 
        cls: "mb-2" 
    });

    msgBody = h.createP({ 
        cls: "mb-3" 
    });

    buttonBody = h.createDiv();

    responseBody = h.createPre({ 
        style: {
            display: "none",
            overflow: "auto",
            border: "1p solid #ccc",
            backgroundColor: "#eee",
            padding: "10px"
        }
    });

    renderTo.appendChild(headerBody);
    renderTo.appendChild(msgBody);
    renderTo.appendChild(buttonBody);
    renderTo.appendChild(responseBody);
}

function renderHeader() {
    headerBody.innerText = "Example 1";
}

function renderMsg() {
    msgBody.innerHTML = `
        This <a href=>widget</a> demonstrates how you can program a widget to return server side data with just a few lines of code.  Click the button below to make a fetch call to this widget's server side data endpoint.
    `;
}

function renderButton(widget) {
    const button = h.createSpan({
        cls: "btn btn-primary",
        text: `Fetch server side date`
    });

    buttonBody.appendChild(button);

    button.onclick = async () => {
        const { dataURL } = widget;

        buttonBody.setAttribute("class", "mb-1");
        buttonBody.innerText = `Fetching ${dataURL} ...`;

        const response = await fetch(dataURL);

        if ( !response.ok ) {
            buttonBody.innerHTML = `Failed to fetch ${dataURL}`;
            return;
        }

        const json = await response.json();
        buttonBody.remove();
        responseBody.style.display = null;
        responseBody.innerText = JSON.stringify(json, null, 2);
    }
}

module.exports = { loaded };

