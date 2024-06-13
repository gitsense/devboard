const h = require("../../../app/utils/html.js");
const dayjs = require("dayjs");

function render(card) {
    const { headerBody, msgBody, buttonBody, responseBody } = renderLayout();
    const { owner, name } = getRepos()[0];

    renderHeader(headerBody);
    renderMsg(msgBody, owner, name);

    renderButton(buttonBody, function() {
        clickedButton(responseBody, buttonBody, owner, name) 
    });

    function renderLayout() {
        const { body } = card.main;
        body.style.fontSize = 16;
        body.style.paddingRight = 10;

        let headerBody = h.createH1({ 
            cls: "mt-2 mb-2" 
        });

        let msgBody = h.createP({ 
            cls: "mb-3" 
        });

        let buttonBody = h.createDiv({ });

        let responseBody = h.createPre({ 
            style: { 
                display: "none",
                height: 300,
                overflow: "auto"
            }
        });

        body.appendChild(headerBody);
        body.appendChild(msgBody);
        body.appendChild(buttonBody);
        body.appendChild(responseBody);
        return { headerBody, msgBody, buttonBody, responseBody};
    }

    function getRepos() {
        const { active, inactive } = card.family["gitsense.repos"].data.result;
        return active.concat(inactive);
    }
}

function renderHeader(renderTo) {
    renderTo.innerText = "REST & GraphQL";
}

function renderMsg(renderTo, owner, name) {
    renderTo.innerHTML = `
        Since widgets are written in JavaScript, using REST or GraphQL to interact with GitHub and others is rather trivial. 
        Click the button below to make a quick fetch call to retrieve the repo information for <strong>${owner}/${name}</strong> from GitHub.
    `;
}

function renderButton(renderTo, onclick) {
    let button = h.createSpan({
        cls: "btn btn-primary",
        text: "Fetch GitHub"
    });

    renderTo.appendChild(button);

    button.onclick = onclick;
}

async function clickedButton(responseBody, buttonBody, owner, name) {
    buttonBody.setAttribute("class", "mb-1");
    buttonBody.innerText = "Fetching...";
    const response = await fetch(`https://api.github.com/repos/${owner}/${name}`);
    const json = await response.json();
    const { updated_at } = json;
    const age = dayjs().to(updated_at);

    buttonBody.innerHTML = `Based on the fetch response, ${owner}/${name} was last updated ${age}`;
    responseBody.style.display = null;
    responseBody.innerText = JSON.stringify(json, null, 4);
}

module.exports = { render };
