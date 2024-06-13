const h = require("../../../../app/utils/html.js");

function loaded(card) {
    const { widgets, params, main } = card;
    const communicateWidgetFullName = "welcome.communicate";
    const communicateWidget = widgets[communicateWidgetFullName];

    if ( !communicateWidget )
        throw(`ERROR: No widget named ${communicateWidgetFullName} found`);

    const hello = new Hello(params.position, communicateWidget);
    hello.render(main.body);
    communicateWidget.register(hello);
}

function Hello(position, communicateWidget) {
    const siblingPosition = position === "left" ? "right" : "left";
    let headerBody = null;
    let msgBody = null;
    let buttonBody = null;

    this.position = position;

    this.render = function(renderTo) {
        render(renderTo);
    }

    this.hello = function() {
        msgBody.innerHTML += `<br>Received "hello" message`;
    }

    function render(renderTo) {
        renderLayout(renderTo);
        renderHeader();
        renderMsg();
        renderButton();
    }

    function renderLayout(renderTo) {
        renderTo.style.fontSize = "16px";

        headerBody = h.createH4({
            
        });

        msgBody = h.createParagraph({
            cls: "mt-2"
        });

        buttonBody = h.createDiv({
            cls: "mt-3",
            style: {

            }
        });

        renderTo.appendChild(headerBody);
        renderTo.appendChild(msgBody);
        renderTo.appendChild(buttonBody);
    }

    function renderHeader() {
        headerBody.innerText = `${(position.charAt(0).toUpperCase()+position.slice(1))} widget`;
    }

    function renderMsg() {
        msgBody.innerHTML = `Click to say "hello" to the ${siblingPosition} widget.`;
    }

    function renderButton() {
        let button = h.createSpan({
            cls: "btn btn-primary",
            text: `Say hello`
        });
    
        buttonBody.appendChild(button);

        button.onclick = async () => {
            const sibling = communicateWidget.get(siblingPosition);

            if ( !sibling )
                throw(`ERROR: No registered ${siblingPosition} widget`);

            sibling.hello();
            msgBody.innerHTML += `<br>Sent "hello" to the ${siblingPosition} widget`;
        }
    }
}

module.exports = { loaded };
