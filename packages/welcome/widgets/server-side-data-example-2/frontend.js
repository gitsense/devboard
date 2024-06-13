const h = require("../../../../app/utils/html.js");

let headerBody = null;
let msgBody = null;
let buttonBody = null;

let dataURL = null;

function loaded(card) {
    const { widget, widgets, main } = card;
    const example3WidgetFullName = "welcome.server-side-data-example-3";
    const example3Widget = widgets[example3WidgetFullName];

    if ( !example3Widget )
        throw(`ERROR: No widget named ${example3WidgetFullName} found`);

    dataURL = widget.dataURL;

    renderLayout(main.body);
    renderHeader();
    renderMsg();
    renderButton(card, example3Widget);
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

    renderTo.appendChild(headerBody);
    renderTo.appendChild(msgBody);
    renderTo.appendChild(buttonBody);
}

function renderHeader() {
    headerBody.innerText = "Example 2";
}

function renderMsg() {
    msgBody.innerHTML = `
        This <a href=https://github.com/gitsense/devboard/tree/main/packages/welcome/widgets/server-side-data-example-2>widget</a> demonstrates how you can create widgets that are soley designed to serve server side data. Click the button below to hide this widget and to enable the button in example 3.
    `;
}

function renderButton(card, example3Widget) {
    const button = h.createSpan({
        cls: "btn btn-primary",
        text: `Hide widget`
    });

    buttonBody.appendChild(button);

    button.onclick = () => {
        example3Widget.enableButton();
        card.body.remove();
    }
}

async function getRepoData(repoFullname) {
    const usp = new URLSearchParams();
    usp.set("r", repoFullname);
    const url = dataURL+"?"+usp.toString();
    const response = await fetch(url);

    if ( !response.ok )
        throw(`Failed to fetch ${dataURL}`);

    const result = await response.json();
    const { status, data, message } = result;

    if ( status === "success" )
        return result.data;

    const err = status === "error" ? message : JSON.stringify(data);
    throw(err);
}

module.exports = { loaded, getRepoData };

