const { resolve, dirname } = require("path");
const { readdirSync, readFileSync, existsSync, statSync, writeFileSync } = require("fs");
const { widgets } = require("./app/widgets");

const boardsFile = "./app/boards.js";
const boards = {};
const defaultConfig = { menu: { boards: [] } };

readdirSync("./packages").forEach(name => {
    const dir = resolve(`./packages/${name}`); 
    const configFile = resolve(`${dir}/config.json`);

    if ( !existsSync(configFile) ) {
        console.log(`WARNING: ${configFile} does not exists.  Unable to add boards in ${dir}`);
        return;
    }

    const package = JSON.parse(readFileSync(configFile, "utf8"));
    const { name: packageName } = package;

    if ( packageName === undefined )
        throw(`ERROR: ${configFile} does not have a name property`);

    if ( !packageName.match(/^[a-z0-9_-]+$/) )
        throw(`ERROR: Invalid package name in ${configFile}. Only alphanumeric, dash and underscore characters allowed`);

    readdirSync(`${dir}/boards`).forEach(name=> {
        const file = resolve(`${dir}/boards/${name}`);

        if ( !name.match(/.json$/) ) 
            return;

        const board = JSON.parse(readFileSync(file, "utf8"));
        const { name: boardName, displayName, widgets } = board;

        if ( boardName === undefined ) {
            console.log(`ERROR: ${file} does not have name attribute. Skipping board file.`);
            return;
        }

        if ( !boardName.match(/^[a-z0-9_-]+$/) )
            throw(`ERROR: Invalid board name in ${file}. Only alphanumeric, dash and underscore characters allowed`);

        if ( !widgets ) {
            console.log(`ERROR: ${file} does not have name widgets attribute. Skipping board file.`);
            return;
        }

        if ( !Array.isArray(widgets) ) {
            console.log(`ERROR: widgets attribute in ${file} is not an array. Skipping board file.`);
            return;
        }

        if ( !displayName ) {
            console.log(`ERROR: ${file} does not have displayName attribute. Using name as displayName instead.`);
            board.displayName = boardName;
        }

        const fullName = package.name+"."+board.name;

        if ( boards[fullName] ) 
            throw(`ERROR: Board with the full name ${fullName} already exists`);

        board.package = package.name;
        boards[fullName] = board;
        defaultConfig.menu.boards.push({ fullName });
    });
});

write("// Execute 'npm run build:boards' to update this file\n", false);
write("const boards = {};\n\n", true);

for ( let fullName in boards ) {
    const board = boards[fullName];
    const { requiresBoardWidgets: requires } = board;

    if ( requires ) {
        const requiresBoard = boards[requires];

        if ( !requiresBoard  )
            throw(`ERROR: ${fullName} requires ${requires} but it doesn't exist!`);

        const { widgets: boardWidgets } = requiresBoard;

        for ( let i = boardWidgets.length - 1; i >= 0; i-- ) {
            const widget = boardWidgets[i];
            board.widgets.unshift(widget);
        };
    }

    const { widgets: boardWidgets } = board;

    boardWidgets.forEach(widget => {
        const { fullName } = widget;

        if ( !fullName )
            throw(`ERROR: No fullName property for widget\n${(JSON.stringify(widget, null, 2))}`);

        if ( !widgets[fullName] )
            throw(`ERROR: No widget named "${fullName}" found in the board "${(board.package+"."+board.name)}"`);
    });

    write(`boards["${fullName}"] = ${(JSON.stringify(board, null, 2))};\n\n`, true);
}

const boardConfigFiles = [ 
    resolve("./boards.json"), 
    resolve("./boards.default.json") 
];

let config = null;

boardConfigFiles.forEach(file => {
    if ( config !== null || !existsSync(file) )
        return;

    config = JSON.parse(readFileSync(file, "utf8"));
    
    const { boards: configBoards } = config.menu || {};
    
    if ( !boards )
        throw(`ERROR: No menu boards defined in ${file}!`);
    
    configBoards.forEach(board => {
        const { fullName } = board;
    
        if ( !fullName )
            throw(`ERROR: No fullName property for ${(JSON.stringify(board))}`);
    
        if ( !boards[fullName] )
            throw(`ERROR: No board name ${fullName} found`);
    });
});


write(`const config = ${(JSON.stringify(config || defaultConfig, null, 2))};\n`, true);
write("module.exports = { config, boards };\n", true);

function write(string, append) {
    writeFileSync(boardsFile, string, append ? { flag: 'a' } : null );
}
