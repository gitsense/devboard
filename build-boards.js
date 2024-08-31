const { resolve, dirname } = require("path");
const { readdirSync, readFileSync, existsSync, statSync, writeFileSync } = require("fs");
const { widgets } = require("./app/widgets");

const boardsFile = "./app/boards.js";
const boards = {};
const defaultConfig = { menu: { boards: [] } };

readdirSync("./packages").forEach(name => {
    const dir = resolve(`./packages/${name}`); 
    const configFile = resolve(`${dir}/package-config.json`);

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
        const { name: boardName, displayName, blocks } = board;

        if ( boardName === undefined ) {
            console.log(`ERROR: ${file} does not have a name attribute. Skipping board file.`);
            return;
        }

        if ( !boardName.match(/^[a-z0-9_-]+$/) )
            throw(`ERROR: Invalid board name in ${file}. Only alphanumeric, dash and underscore characters allowed`);

        if ( !blocks ) {
            console.log(`ERROR: ${file} does not have a blocks attribute. Skipping board file.`);
            return;
        }

        if ( !Array.isArray(blocks) ) {
            console.log(`ERROR: blocks attribute in ${file} is not an array. Skipping board file.`);
            return;
        }

        if ( !displayName ) {
            console.log(`ERROR: ${file} does not have displayName attribute. Using name as displayName instead.`);
            board.displayName = boardName;
        }

        const boardFullName = package.name+"."+board.name;

        if ( boards[boardFullName] ) 
            throw(`ERROR: Board with the full name ${boardFullName} already exists`);

        board.package = package.name;
        boards[boardFullName] = board;
        defaultConfig.menu.boards.push({ boardFullName });
    });
});

write("// Execute 'npm run build:boards' to update this file\n", false);
write("const boards = {};\n\n", true);

for ( let boardFullName in boards ) {
    const board = boards[boardFullName];
    const { blocks } = board;

    blocks.forEach(block => {
        const { widget } = block;

        if ( !widget )
            throw(`ERROR: No widget property for board block\n${(JSON.stringify(block, null, 2))}`);

        if ( !widgets[widget] )
            throw(`ERROR: No widget named "${widget}" found in the board "${(board.package+"."+board.name)}"`);
    });

    write(`boards["${boardFullName}"] = ${(JSON.stringify(board, null, 2))};\n\n`, true);
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
            throw(`ERROR: No fullName property for board ${(JSON.stringify(board))}`);
    
        if ( !boards[fullName] )
            throw(`ERROR: No board with the name ${fullName} found`);
    });
});


write(`const config = ${(JSON.stringify(config || defaultConfig, null, 2))};\n`, true);
write("module.exports = { config, boards };\n", true);

function write(string, append) {
    writeFileSync(boardsFile, string, append ? { flag: 'a' } : null );
}
