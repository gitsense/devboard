const h = require("../utils/html.js");

function DropDownMenu(options, menuType="menu: ", opt) {
    const { 
        callback, 
        btn=false, 
        dropDownClass="color-fg-muted p-2 d-inline", 
        dropDownStyle,
        containerStyle,
        alignment="se", 
        menuStyle
    } = opt || {};

    const dropdown = h.createDetail({ 
        cls: "dropdown details-reset details-overlay d-inline-block",
        style: containerStyle
    });
    const current = getSelected(options);

    this.create = function() {
        addSelected()
        addMenu();

        const container = h.createDiv({ 
            cls: "ms-auto lh-1", 
            append: dropdown 
        });  

        return container;
    }

    this.getSelected = function() {
        return current.value;
    }

    function addSelected() {
        const { value, label } = current;

        const summary = h.createSummary({
            cls: btn ? "btn" : dropDownClass,
            append: [
                h.createSpan({
                    html: label || menuType+current.value,
                    style: {
                        
                    }
                }),
                h.createDiv({
                    cls: "dropdown-caret",
                    style: {
                        marginLeft: "5px"
                    }
                })
            ],
            style: dropDownStyle
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
            let { value, returnValue, href, selected } = options[i];

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

            if ( !selected && !href && callback ) {
                item.onclick = () => { 
                    callback(current.returnValue || current.value, returnValue || value);
                    dropdown.removeAttribute("open");
                };
            }
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
