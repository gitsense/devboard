const express = require("express");
const cors = require("cors");
const { readdir, readFile, stat, writeFile } = require("fs/promises");
const { config: boardConfig, boards } = require("./app/boards.js");
const { widgets } = require("./libs/widgets.js");

main();

async function main() {
    try {
        await initWidgets();
    } catch ( error ) {
        console.log(`ERROR: Initializing widgets failed:\n${error}`);
    }

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/--/", express.static("public"));
    app.use("/api/", require("./routes/api/routes.js"));
    app.get("/*", (req, res) => renderBoard(req, res) );
    app.listen(3357);

    async function initWidgets() {
        for ( const fullName in widgets ) {
            const widget = widgets[fullName];
        
            if ( widget.init ) {
                console.log(`Initializing widget ${fullName}`);
                await widget.init();
                console.log(`Finished initializing widget ${fullName}`);
            }
        };
    }
}

async function renderBoard(req, res, match) {
    const query = req.query || {};
    const { board: queryBoard, pid } = query;
    const { header={ show: true }, menu={}, quickLinks={} } = boardConfig || {};
    const selectedBoard = queryBoard ? boards[queryBoard] : null;
    const defaultBoard = boards[menu.boards[0].fullName];
    const menuBoards = menu.boards ? getBoards(menu.boards) : [];
    const quickLinksBoards = quickLinks.boards ? getBoards(quickLinks.boards) : [];
    const headerConfig = { menuBoards, quickLinks: quickLinksBoards, header };
    const tmpl = await readFile("./views/index.html", "utf8");

    const html = tmpl
        .replace(/\s*=\s*{{board}}/, " = "+JSON.stringify(selectedBoard || defaultBoard))
        .replace(/\s*=\s*{{header}}/, " = "+JSON.stringify(headerConfig));

    res.send(html);
}

function getBoards(configBoards) {
    const finalBoards = [];

    configBoards.forEach(configBoard => {
        const { default: isDefault, fullName, text, href } = configBoard;

        const board = fullName === "" ? { text, href } : boards[fullName];

        if ( !board && !fullName && !text && !href )
            return;

        board.fullName = fullName;

        if ( isDefault ) {
            board.default = true;
            defaultBoard = fullName;
        }

        finalBoards.push(structuredClone(board));
    });

    return finalBoards;
}
