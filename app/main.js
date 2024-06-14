const { sleep } = require("../libs/utils.js");
const { configs, widgets } = require("./widgets.js");
const h = require("./utils/html.js");
const Header = require("./components/header.js");
const Page = require("./components/page.js");
const Card = require("./components/card.js");
const apiVersion = "v0";

function DevBoard(board, header) {
    const usp = new URLSearchParams(window.location.search);
    const help = usp.get("help");
  
    this.render = async function(renderTo) {
        const { header: headerConfig, menuBoards, quickLinks } = header;
        const cards = getCards();
        const page = new Page(cards, { backgroundColor: "white" }).create();

        const headerBody = h.createDiv({ 
            cls: "tblr-container-xxl",
            style: { 
                display: headerConfig.show ? null : "none",
                backgroundColor: "white",
                paddingTop: 20,
                paddingBottom: 0
            }
        });
        renderTo.appendChild(headerBody);
        new Header(board, menuBoards, quickLinks).render(headerBody);  

        renderTo.appendChild(page.body);

        const { initWidget } = board;

        cards.forEach(card => {
            const { widget, body } = card;
            const { fullName, loaded } = widget;

            if ( !initWidget ) {
                if ( loaded )
                    loaded(card);
                else
                    console.warn(`WARNING: Widget ${fullName} does not have a loaded function and/or was not exported. Unable to process widget.`);

                return;
            }

            if ( initWidget && fullName !== initWidget ) {
                body.style._display = body.style.display;
                body.style.display = "none";
                return;
            }

            card.widget.loaded(card);
        });

        if ( !initWidget ) 
            return;

        let initCard = null;

        for ( let i = 0; i < cards.length; i++ ) {
            const card = cards[i];
            const { fullName } = card.widget;

            if ( initWidget && fullName !== initWidget )
                continue;

            initCard = card;
            break;
        }

        if ( initWidget )
            processInitWidget(initWidget, initCard);

        async function processInitWidget(initWidget, initCard) {
            let timeout = new Date().getTime() + 10000;

            while ( new Date().getTime() < timeout ) {
                if ( initCard.data && initCard.data.result ) 
                    break;

                await sleep(25);
            }

            const { data } = initCard;
            const { result } = data || {};
            const { err } = result || {};

            if ( !data || !result ) {
                console.error("Timed out while waiting for init widget data");
                return;
            }

            if ( err ) {
                console.error(err);
                return;
            }

            cards.forEach(card => {
                const { body, widget } = card;
                if ( widget.fullName === initWidget )
                    return;

                body.style.display = body.style._display;
            });

            // Give the browser time to render all the card containers
            await sleep(25);
            cards.forEach(card => {
                const { widget } = card;

                if ( widget.fullName === initWidget )
                    return;

                const { loaded, fullName } = widget;

                if ( loaded )
                    loaded(card);
                else 
                    console.warn(`WARNING: Widget ${fullName} does not have a loaded function and/or was not exported. Unable to process widget.`);
            });
        }
    }

    function getCards() {
        const cards = [];
        const { blocks } = board;

        blocks.forEach(block => {
            const { widget: widgetFullName  } = block;
            const widget = widgets[widgetFullName];
            const config = configs[widgetFullName];

            if ( !widget ) {
                console.log(`ERROR: No widget named ${(fullName)} found.`);
                return;
            }

            const { package, name } = config;

            widget.config = config;
            widget.fullName = widgetFullName;
            widget.package = package;
            widget.name = name;

            const card = getCard(block, widget);
            cards.push(card);
        });

        return cards;
    }

    function getCard(boardBlock, widget) {
        const { package, name } = widget;
        widget.dataURL = `/api/${apiVersion}/widgets/${package}/${name}/data`;
        widget.staticURL = `/api/${apiVersion}/widgets/${package}/${name}/static/{file}`;

        const card = new Card(boardBlock, widget, help ? help === "show" : false).create();
        card.widgets = widgets;
        card.params = boardBlock.params;
        card.board = board;

        return card;
    }
}

module.exports = DevBoard;
