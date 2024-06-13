const h = require("../utils/html.js");

const defaultColStyle = {
    padding: "12px",
    marginTop: "0px" 
};

function Card(widget, dashboardConfig, showHelp=false) {
    const { 
        minHeight, 
        cols=12, 
        show=true, 
        colStyle={}, 
        cardCSS="tblr-card", 
        cardStyle, 
        cardBodyCSS="tblr-card-body",
    } = dashboardConfig;

    const _card = {
        widget,
        body: null,
        main: null,
        help: null,
        current: null,
        init() {
            this.body = h.createDiv({ 
                append: [this.outside],
                cls: "tblr-col-lg-"+cols,
                style: {
                    display: show ? null : "none",
                }
            });

            for ( let name in defaultColStyle ) {
                const value = defaultColStyle[name];

                if ( colStyle[name] === undefined )
                    this.body.style[name] = value;
            }

            for ( let name in colStyle )
                this.body.style[name] = colStyle[name];

            this.current = this.body;
            return this;
        },
        addCard() {
            const div = h.createDiv({ 
                cls: cardCSS, 
                style: cardStyle || { border: "0px" }
            });

            this.current.appendChild(div);
            this.current = div;
            return this;
        },
        addCardBody() {
            const div = h.createDiv({ });
            this.current.appendChild(div);
            this.current = div;
            return this;
        },
        addCardMain() {
            this.main = {
                body: h.createDiv({
                    style: {
                        minHeight: minHeight ? null : minHeight+"px"
                    }
                })
            };

            this.current.appendChild(this.main.body);
            return this;
        },
        addCardHelp() {
            if ( !showHelp )
                return this;

            const { align="left", link: href, text } = widget.config.help;

            if ( !href )
                return this;

            const link = h.createLink({
                href,
                text: text || widget.fullName,
                target: "_blank"
            });

            this.help = {
                body: h.createDiv({
                    append: [link],
                    style: {
                        textAlign: align,
                        fontSize: "13px",
                        marginTop: "15px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }
                })
            }

            this.current.appendChild(this.help.body);
            return this;
        }
    };

    this.create = function() {
        const card = _card 
            .init()
            .addCard()
            .addCardBody()
            .addCardMain()
            .addCardHelp();

        return card;
    }
}

module.exports = Card;
