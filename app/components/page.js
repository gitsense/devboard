const h = require("../utils/html.js");

function Page(cards, style={ minHeight: "300px" }) {
    const _page = {
        body: null,
        current: null,
        cards,
        init() {
            this.body = h.createDiv({ cls: "tblr-page", style });
            this.current = this.body;
            return this;
        },
        addPageWrapper() {
            const div = h.createDiv({ cls: "tblr-page-wrapper" });
            this.current.appendChild(div);
            this.current= div;
            return this;
        },
        addPageBody() {
            const div = h.createDiv({ cls: "tblr-page-body" });
            this.current.appendChild(div);
            this.current = div;
            return this;
        },
        addContainer() {
            const div = h.createDiv({ cls: "tblr-container-xxl" });
            this.current.appendChild(div);
            this.current = div;
            return this;
        },
        addRow() {
            const div = h.createDiv({ cls: "tblr-row tblr-row-deck tblr-row-cards" });
            this.current.appendChild(div);
            this.current = div;
            return this;
        }
    };

    this.create = function() {
        const page = _page
            .init(style)
            .addPageWrapper()
            .addPageBody()
            .addContainer()
            .addRow();

        for ( let i = 0; i < cards.length; i++ ) {
            let card = cards[i];
            page.current.appendChild(card.body);
        }

        return page;
    } 
}

module.exports = Page;
