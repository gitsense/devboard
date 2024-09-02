const { resolve, basename, dirname } = require("path");
const { readdirSync, readFileSync, statSync, existsSync, writeFileSync } = require("fs");

const backendWidgetsFile = "./libs/widgets.js";
const frontendWidgetsFile = "./app/widgets.js";

const configs = {};
const frontendWidgets = {};
const backendWidgets = {};

writeFrontend("// Generated file. Execute 'npm run build:widgets' to update this file\n", false);
writeFrontend("const widgets = {};\n");

writeBackend("// Generated file. Execute 'npm run build:widgets' to update this file\n", false);
writeBackend("const widgets = {};\n", true);

readdirSync("./packages").forEach(name => {
    const dir = resolve(`./packages/${name}`); 
    const configFile = resolve(`${dir}/package-config.json`);

    if ( !existsSync(configFile) ) {
        console.log(`WARNING: ${configFile} does not exists. Unable to add dashboards in ${dir}`);
        return;
    }

    const package = JSON.parse(readFileSync(configFile, "utf8"));
    const { name: packageName } = package;

    if ( packageName === undefined )
        throw(`ERROR: ${configFile} does not have a name property`);

    if ( !packageName.match(/^[a-z0-9_-]+$/) )
        throw(`ERROR: Invalid package name in ${configFile}. Only alphanumeric, dash and underscore characters allowed`);

    const widgetsDir = resolve(`${dir}/widgets`);

    if ( !existsSync(widgetsDir) ) 
        return;

    configs[package.name] = package;

    readdirSync(`${widgetsDir}`).forEach(name => {
        const widgetDir = resolve(`${widgetsDir}/${name}`);
        const configFile = resolve(`${widgetDir}/widget-config.json`);
        let fullName = null;

        if ( existsSync(configFile) ) {
            const widget = JSON.parse(readFileSync(configFile, "utf8"));
            let { name, help={} } = widget;

            if ( name === undefined )
                throw(`ERROR: ${configFile} does not have a name property`);

            if ( !name.match(/^[a-z0-9_-]+$/) )
                throw(`ERROR: Invalid widget name in ${configFile}. Only alphanumeric, dash and underscore characters allowed`);

            fullName = package.name+"."+widget.name;

            if ( configs[fullName] ) 
                throw(`ERROR: Widget with the full name ${fullName} already exists!`);

            configs[fullName] = { package: package.name, name: widget.name, help };
        } else {
            console.log(`WARNING: ${configFile} does not exists. Unable to add widget in ${widgetDir}`);
            return;
        }

        const frontendFile = resolve(`${widgetDir}/frontend.js`);
        const backendFile = resolve(`${widgetDir}/backend.js`);

        if ( existsSync(frontendFile) )
            writeFrontend(`widgets["${fullName}"] = require("../packages/${package.name}/widgets/${name}/frontend.js")\n`, true);

        if ( existsSync(backendFile) )
            writeBackend(`widgets["${fullName}"] = require("../packages/${package.name}/widgets/${name}/backend.js")\n`, true);
    });
});

const configsJSON = JSON.stringify(configs, null, 2);

writeFrontend("\n", true);
writeFrontend(`const configs = ${configsJSON}\n\n`, true);
writeFrontend("module.exports = { widgets, configs };\n", true);

writeBackend("\n",true);
writeBackend(`const configs = ${configsJSON}\n\n`, true);
writeBackend("module.exports = { widgets, configs };\n", true);

function writeBackend(string, append) {
    writeFileSync(backendWidgetsFile, string, append ? { flag: 'a' } : null );
}

function writeFrontend(string, append) {
    writeFileSync(frontendWidgetsFile, string, append ? { flag: 'a' } : null );
}
