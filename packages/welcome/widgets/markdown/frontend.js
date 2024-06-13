const h = require("../../../../app/utils/html.js");
const MarkDownIt = require("markdown-it");

async function loaded(card) {
    const { main, params, widget } = card;
    const { path } = params;
    const { dataURL } = widget;
    const usp = new URLSearchParams();
    usp.set("path", path);

    const response = await fetch(dataURL+"?"+usp.toString());
    const json = await response.json();
    const { data } = json;

    const md = new MarkDownIt({
        html: true 
    });

    const body = h.createDiv({
        cls: "markdown-body",
        html: md.render(data) ,
        style: {
            fontSize: "16px",
            paddingTop: "10px"
        }
    });

    card.main.body.appendChild(body);
}

module.exports = { loaded };
