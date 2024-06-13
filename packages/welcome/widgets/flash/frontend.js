const h = require("../../../../app/utils/html.js");
const svg  = require("../../../../app/utils/svg.js");

function loaded(card) {
    const usp = new URLSearchParams(window.location.search);
    const help = usp.get("help");

    if ( help && help === "show" ) {
        card.body.remove();
        return;
    }

    const { main, params={} } = card;
    const { msg: msgText, id, icon: iconType } = params;

    if ( !ok() )
        return;

    const dismissed = localStorage.getItem(id);

    if ( dismissed ) {
        card.body.remove();
        return;
    }

    const icon = eval(`svg.${iconType}({ style: { marginRight: "5px", position: "relative", top: "-1px" }})`);

    const dismissWidth = 20;

    const msg = h.createDiv({
        html: icon.outerHTML+msgText,
        style: {
            display: "inline-block",
            width: `calc(100% - ${dismissWidth}px)`,
            verticalAlign: "middle"
        }
    });

    const dismiss = svg.x({
        style: {
            cursor: "pointer"
        }
    });

    const flash = h.createDiv({
        cls: "flash",
        append: [
            msg, 
            h.createDiv({
                append: [ dismiss ],
                style: {
                    display: "inline-block",
                    width: dismissWidth+"px",
                    textAlign: "right",
                    verticalAlign: "middle"
                }
            })
        ]
    });

    main.body.appendChild(flash);

    dismiss.onclick = () => {
        localStorage.setItem(id, true);
        card.body.remove();
    }

    function ok() {
        const { body } = main;

        if ( !msgText ) {
            body.innerText = "No message specified.  Please update the dashboard and try again.";
            return false;
        }

        if ( !id ) {
            body.innerText = "No id specified. Please update the dashboard and try again.";
            return false;
        }

        return true;
    } 
}

module.exports = { loaded };
