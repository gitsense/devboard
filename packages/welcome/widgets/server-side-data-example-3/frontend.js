const h = require("../../../../app/utils/html.js");
const repo = "facebook/react";

let headerBody = null;
let msgBody = null;
let buttonBody = null;
let responseBody = null;
let button = null;

function loaded(card) {
    const { widgets, main } = card;
    const example2WidgetFullName = "welcome.server-side-data-example-2";
    const example2Widget = widgets[example2WidgetFullName];

    if ( !example2Widget )
        throw(`ERROR: No widget named ${example2WidgetFullName} found`);

    renderLayout(card.main.body);
    renderHeader();
    renderMsg();
    renderButton(example2Widget);
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
            height: "300px",
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
    headerBody.innerText = "Example 3";
}

function renderMsg(renderTo) {
    msgBody.innerHTML = `
        This <a href=/>widget</a> demonstrates how widgets can use other widgets to get server side data.  Click the button below to get the repo data for ${repo} from the example 2 widget.
    `;
}

function renderButton(example2Widget) {
    button = h.createSpan({
        cls: "btn btn-primary disabled",
        text: `Get repo data`
    });

    buttonBody.appendChild(button);

    button.onclick = async () => {
        if ( button.getAttribute("class").match(/disabled/) )
            return;

        button.setAttribute("class", "mb-1");
        button.innerText = `Retrieving repo data...`;

        try {
            const data = await example2Widget.getRepoData(repo);
            buttonBody.remove();
            responseBody.style.display = null;
            responseBody.innerText = JSON.stringify(data, null, 2);
        } catch ( e ){
            console.log(e);
        }
    }
}

function enableButton() {
    button.setAttribute("class", button.getAttribute("class").replace(/disabled/, ""))
}

module.exports = { loaded, enableButton };
