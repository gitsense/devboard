const h = require("../utils/html.js");
const DropDownMenu = require("./drop-down-menu.js");

function Header(currentBoard, menuBoards, quickLinks) {
    let menuBody = null;
    let quickLinksBody = null;
    let optionsBody = null;

    this.render = (renderTo) => {
        renderLayout(renderTo);
        renderMenuBoards();
        renderQuickLinks();
        renderOptions();
    }

    function renderLayout(renderTo) {
        const menusWidth = 200;
        const optionsWidth = menusWidth;

        menuBody = h.createDiv({
            style: {
                display: "inline-block",
                width: menusWidth+"px",
                whiteSpace: "nowrap",
            }
        });

        quickLinksBody = h.createDiv({
            style: {
                display: "inline-block",
                width: `calc(100% - ${(menusWidth+optionsWidth)}px)`,
                textAlign: "center",
                verticalAlign: "middle",
                //fontWeight: 500
            }
        });

        optionsBody = h.createDiv({
            style: {
                display: "inline-block",
                width: optionsWidth+"px",
                textAlign: "right"
            }
        });

        renderTo.appendChild(menuBody);
        renderTo.appendChild(quickLinksBody);
        renderTo.appendChild(optionsBody);
    }

    function renderMenuBoards() {
        const boards = addBoard(menuBoards, currentBoard);
        const { pathname } = window.location;
        const usp = new URLSearchParams(window.location.search);
        usp.delete("board");
        const search = usp.toString();

        let current = getFullname(currentBoard);
        let options = [];

        boards.forEach(board => {
            let { displayName, default: isDefault } = board;
            let fullName = getFullname(board);
            let selected = fullName === current ? true : false;
            let boardUSP = new URLSearchParams(search);

            if ( !isDefault )
                boardUSP.append("board", fullName);

            let boardSearch = boardUSP.toString();
            
            options.push({
                value: displayName,
                href: pathname+(boardSearch === "" ? "" : "?"+boardSearch),
                selected: selected
            });
        });

        menuBody.appendChild(
            new DropDownMenu(options, "", {
                btn: true,
                alignment: "se",
                menuStyle: { 
                    width: "225px",
                    lineHeight: 1.3,
                    paddingTop: "7px",
                    paddingBottom: "7px"
                }
            }).create()
        );

        function addBoard(boards, newBoard) {
            const newFullname = getFullname(newBoard);
            let add = true;
            let temp = [];

            boards.forEach(board => {
                const fullName = getFullname(board);

                if ( fullName === newFullname )
                    add = false;

                temp.push(board);
            });

            if ( add )
                temp.unshift(newBoard);

            return temp;
        }
    }

    function renderQuickLinks() {
        const { pathname } = window.location;
        const usp = new URLSearchParams();
        let current = getFullname(currentBoard);

        quickLinks.forEach(board => {
            const { fullName, displayName, text, href } = board;

            //if ( fullName === current ) {
            //    quickLinksBody.appendChild(h.createSpan({
            //        text: text || displayName,
            //        style: {
            //            padding: "6px",
            //            marginRight: "5px",
            //            borderBottom: "2px solid orange",
            //        }
            //    }));

            //    return;
            //} 

            let boardHref = null;

            if ( fullName ) {
                usp.set("board", fullName);
                boardHref = pathname+"?"+usp.toString();
            }

            const bbColor = fullName === current ? "orange" : "transparent";

            const link = h.createLink({
                text: text || displayName,
                href: href || boardHref,
                style: {
                    color: "black",
                    padding: "6px",
                    borderBottom: "2px solid "+bbColor,
                    marginRight: "5px"
                }
            });

            quickLinksBody.appendChild(link);
        });
    }

    function renderOptions() {
        const { origin, pathname, search } = window.location;
        const usp = new URLSearchParams(search);
        const help = usp.get("help");
        const selectedShow = help === "show";

        const helpBody = h.createDiv({
            style: {
                display: "inline-block",
                textAlign: "left"
            }
        });
        optionsBody.appendChild(helpBody);

        let options = [
            { value: "hide", selected: !selectedShow },
            { value: "show", selected: selectedShow }
        ];

        const menu = new DropDownMenu(
            options, 
            "<strong>Help: </strong>", 
            { 
                menuStyle: { width: "100px" },
                callback: (selected) => {
                    if ( selected === "show" )
                        usp.set("help", selected);
                    else
                        usp.delete("help");

                    const search = usp.toString();
                    const url = origin+(pathname === "/" ? "" : pathname)+(search ? "?"+search : "");
                    window.location.assign(url);
                }
            }
        ).create();

        helpBody.appendChild(menu);
    }
}

function getFullname(board) {
    return board.package+"."+board.name;
}


module.exports = Header;
