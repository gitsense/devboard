const h = require("../../../../app/utils/html.js");

let headerBody = null;
let msgBody = null;

function loaded(card) {
    const { widget, main } = card;
    renderLayout(main.body);
    renderHeader();
    renderMsg(widget);
}

function renderLayout(renderTo) {
    renderTo.style.fontSize = 16;

    headerBody = h.createH3({
        cls: "mb-2" 
    });

    msgBody = h.createP({ 
        cls: "mb-3" 
    });

    renderTo.appendChild(headerBody);
    renderTo.appendChild(msgBody);
}

function renderHeader() {
    headerBody.innerText = "Static Files";
}

function renderMsg(widget) {
    const { origin } = window.location;
    const { staticURL } = widget;

    const readme = `${origin}${(staticURL.replace(/{file}/, "hello.md"))}`;

    msgBody.innerHTML = `
        <p>
        Programming not required. If you need to serve static files with your widget, all that is required is to put the files in a directory called "static" in your widgets' directory.  See <a href=/>Widgets</a> dashboard for more information and to test things out, click on the link below to view the hello markdown file for this widget.
        </p>
        <p class="mt-2">
        <a href=${readme} target=_blank>${readme}</a>
        </p>
        <p>Note, "welcome" is the widget's package name and "static-files" is the name the widget.
    `;
}

module.exports = { loaded };
