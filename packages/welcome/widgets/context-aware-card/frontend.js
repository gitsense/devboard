const h = require("../../../../app/utils/html.js");

async function loaded(card) {
    const { params, widgets, main } = card;
    const [ ,owner, name] = window.location.pathname.split("/");

    if ( !owner || !name ) {
        card.body.remove();
        return;
    }

    const { body } = main;

    body.innerHTML = `Retrieving repo information for ${owner}/${name}...`;

    const url = `https://api.github.com/repos/${owner}/${name}`;
    const response = await fetch(url);
    
    if ( !response.ok ) {
        const error = `Failed to fetch repo information for ${owner}/${name} with ${url}`;
        body.innerHTML = error;
        return;
    }

    body.innerHTML = "";
    
    const data = await response.json();
    renderCard(params.type, data, body);
}

async function renderCard(type, data, renderTo) {
    let number = null;
    let label = null;

    if ( type === "issues" ) {
        number = data.open_issues_count;
        label = "Open issues";
    } else if ( type === "stars" ) {
        number = data.stargazers_count;
        label = "Stargazers";
    } else if ( type === "forks" ) {
        number = data.forks_count;
        label = "Forks";
    } else {
        throw(`ERROR: Unrecognized card type ${type}`);
    }

    const numberBody = h.createDiv({
        text: number,
        style: {
            fontSize: "26px",
            fontWeight: 500
        }
    });

    const labelBody = h.createDiv({
        text: label,
        style: {
            fontSize: "16px"
        }
    });

    const card = h.createDiv({
        append: [numberBody, labelBody],
        style: {
            textAlign: "center",
            padding: "20px",
            border: "1px solid #e1e1e1",
            borderRadius: "5px"
        }
    });

    renderTo.appendChild(card);
}

module.exports = { loaded };
