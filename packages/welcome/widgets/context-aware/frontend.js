const h = require("../../../../app/utils/html.js");
const { sleep } = require("../../../../libs/utils.js");

let headerBody = null;
let msgBody = null;

async function loaded(card) {
    const [, owner, name] = window.location.pathname.split("/");

    renderLayout(card.main.body);
    renderHeader(); 

    if ( owner && name )
        renderRepoMsg();
    else
        renderNoRepoMsg();
}

function renderLayout(renderTo) {
    renderTo.style.fontSize = 16;

    headerBody = h.createH3({ 
        cls: "mb-2" 
    });

    msgBody = h.createP({});

    renderTo.appendChild(headerBody);
    renderTo.appendChild(msgBody);
}

function renderHeader() {
    headerBody.innerText = "Context Aware";
}

function renderNoRepoMsg() {
    const { origin, search } = window.location;
    const usp = new URLSearchParams(search);
    const help = usp.get("help");
    const repos = [ "facebook/react", "golang/go", "zed-industries/zed" ];

    const urls = repos.map(r => { 
        const url = `${origin}/${r}?board=welcome.demo`+(help ? `&help=${help}` : "");
        return `<a href=${url}>${r}</a>`;
    });

    msgBody.innerHTML = `
        <a name=context-aware></a>
        <p>
            Create context-aware widgets than can automatically retrieve and display data based on the user, the URL and more. To learn more, click on one of the links below to reveal three hidden widgets that will only appear when the URL contains a repo path.
        </p>
        <p> 
            ${urls.join("<br>")}
        </p>
    `;
}

function renderRepoMsg() {
    msgBody.innerHTML = 
        "The three widgets below will only be displayed when there is a repo path in the URL. "+
        "Go back to the previous page to hide them."
}

module.exports = { loaded };
