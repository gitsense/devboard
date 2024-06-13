const h = require("../utils/html.js");

function DropDownMenu(options, selectedPrefix="", opt) {
    const { callback, btn=false, alignment="se", menuStyle} = opt || {};

    const dropdown = h.createDetail({ cls: "dropdown details-reset details-overlay d-inline-block" });
    const selected = getSelected(options);

    this.create = function() {
        addSelected()
        addMenu();

        const container = h.createDiv({ 
            cls: "ms-auto lh-1", 
            append: dropdown 
        });  

        return container;
    }

    function addSelected() {
        const summary = h.createSummary({
            cls: btn ? "btn" : "color-fg-muted p-2 d-inline",
            append: [
                h.createSpan({
                    html: selectedPrefix+selected.value,
                    style: {
                        
                    }
                }),
                h.createDiv({
                    cls: "dropdown-caret",
                    style: {
                        marginLeft: "5px"
                    }
                })
            ]
        });
        summary.setAttribute("aria-haspopup", "true");

        dropdown.appendChild(summary);
    }

    function addMenu() {
        const menu = h.createUL({
            cls: "dropdown-menu dropdown-menu-"+alignment,
            style: menuStyle
        });

        dropdown.appendChild(menu);

        for ( let i = 0; i < options.length; i++ ) {
            let { value, href, selected } = options[i];

            let item = selected ?
                h.createSpan({
                    cls: "dropdown-item",
                    html: value,
                    style: {
                        fontWeight: 600
                    }
                }) :
                h.createLink({
                    cls: "dropdown-item",
                    href: href,
                    html: value
                });

            let li = h.createLI({
                append: [item]
            });

            menu.appendChild(li);

            if ( !selected && !href && callback ) 
                item.onclick = () => { callback(value) };
        }
    }

    function getSelected(options) {
        for ( let i = 0; i < options.length; i++ ) {
            let option = options[i];
            if ( option.selected )
                return option;
        }

        return options[0];
    }
}

module.exports = DropDownMenu;
