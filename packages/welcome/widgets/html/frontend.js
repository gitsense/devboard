async function loaded(card) {
    const { main, params, widget } = card;
    const { path } = params;
    const { dataURL } = widget;
    const usp = new URLSearchParams();
    usp.set("path", path);

    const response = await fetch(dataURL+"?"+usp.toString());
    const json = await response.json();
    const { data } = json;

    card.main.body.innerHTML = data;
}

module.exports = { loaded };
