const express = require("express");
const cors = require("cors");
const { readdir, readFile, stat, writeFile } = require("fs/promises");
const { config: boardConfig, boards } = require("./app/boards.js");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => renderBoard(req, res) );
app.use("/--/", express.static("public"));
app.use("/api/", require("./routes/api/routes.js"));
app.get("/*", (req, res) => renderBoard(req, res) );
app.listen(3357);

async function renderBoard(req, res, match) {
    const query = req.query || {};
    const { board: queryBoard, pid } = query;
    const { header={ show: true }, menu={}, quickLinks={} } = boardConfig || {};
    const selectedBoard = queryBoard ? boards[queryBoard] : null;
    const defaultBoard = boards[menu.boards[0].fullName];
    const menuBoards = menu.boards ? getBoards(menu.boards) : [];
    const quickLinksBoards = quickLinks.boards ? getBoards(quickLinks.boards) : [];
    const tmpl = await readFile("./views/index.html", "utf8");

    const headerConfig = { menuBoards, quickLinks: quickLinksBoards, header };

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
