# Tutorial

In this tutorial, you will learn how to install a [package](http://localhost:3357?board=welcome.packages), create a configurable full-stack [widget](http://localhost:3357?board=welcome.widgets), construct a simple [board](http://localhost:3357?board=welcome.boards) and [publish](http://localhost:3357?board=welcome.publish) the widget and board.

- [Help](#help)
- [Package ](#pkg)
    - [Install](#pkg-install)
    - [Build and bundle](#pkg-build-bundle)
- [Widget](#widget)
    - [config.json](#widget-config.json)
    - [backend.js](#widget-backend.js)
    - [frontend.js](#widget-frontend.js)
    - [Build](#widget-build)
- [Board](#board)
    - [Create](#board-create)
    - [Configure](#board-configure)
    - [Build](#board-build)
- [Publish](#publish)
    - [Configure](#publish-configure)
        - [Create](#publish-create)
        - [Update](#publish-update)
    - [Build and Bundle](#publish-build-and-bundle)
- [Finished](#finished)

<a name=help></a>
## Help

If you get stuck at any point in this tutorial, you can view the completed widget and board with the links below:

- [https://github.com/gitsense/hello-world-completed/widgets/configurable](https://github.com/gitsense/hello-world/widgets/configurable)
- [https://github.com/gitense/hello-world-completed/boards/layout-3.json](https://github.com/gitense/hello-world/boards/layout-3.json)

## Package

### Install

To install a package, you can either copy, move or clone it to the DevBoard packages directory.  For this tutorial, we are going to install the "hello-world" package from GitHub, which we can do by executing:

    cd ~/devboard/packages
    git clone https://github.com/gitsense/hello-world

Note: If DevBoard was installed in a different location, please update the `cd` command with the correct path.

### Build and bundle

After installing a package, you will need to build and bundle, to:

- Ensure the widgets and boards were created properly.
- Ensure the package name is unique. 
- Include the new package widgets and boards.

To build and bundle, execute the following in the DevBoard installation directory:

    npm run build:widgets && \
    npm run build:boards && \
    npm run bundle

> Note: `&&` ensures that next `npm` command will not execute if the current one fails.

## Widget

For the widget, we are going to create a simple configurable full-stack widget called "configurable" and add it to the "hello-world" package that we just installed.

### 1. Widget directory

Since a widget is comprised of Node.js modules and directories, we'll need to create a widget directory to store things.  Assumming DevBoard was installed at `~/devboard`, execute the following to create the widget directory called "configurable" in the "hello-world" package:

    mkdir ~/devboard/packages/hello-world/widgets/configurable

Once created, change your our working directory the "configurable" widget directory like so:

    cd ~/devboard/packages/hello-world/widgets/configurable

### 2. config.json

To define the widget, create a "config.json" file with the following JSON:

    {
        "name": "configurable"
    }

### 3. backend.js

To implement the widget's backend logic, create a Node.js module called "backend.js" with the following code:

    function getData(req) {
        return "GET method: Hello, world!";
    }

    function postData(req) {
        return "POST method: Hello, world!";
    }

    module.exports = { getData, postData };

By defining and exporting getData and postData, the widget will be able to process GET and POST requests to its data endpoint, which is shown below:

    http(s)://<devbard.port>/api/v0/widgets/hello-world/configurable/data

### 4. frontend.js

To implement the widget's frontend logic, create a Node.js module called "frontend.js" with the following code:

    async function loaded(card) {
        // params = board defined paramaters (if any)
        const { widget, main, params } = card;

        // Send a server side request to the widget's data endpoint using the default or if defined, the board defined method parameter.
        const method = params && params.method ? params.method : "GET";
        const response = await fetch(widget.dataURL, { method });
        const msg = response.text();

        // main.body = DOM element where we can render to in the board
        const { body } = main;

        // Style the DOM element
        const { textAlign="left", border="1px solid #ddd" } = params || {};
        body.style.border = border;
        body.style.textAlign = textAlign;

        // Render the message that was received by querying the widget's server side data endpoint.
        body.innerText = msg;
    }

    module.exports = { loaded };

With the above code, DevBoard will call the "loaded" function when the widget has been loaded in the board.

### 5. Build

To ensure the widget was created properly, we'll need to run `npm run build:widgets` in the DevBoard installation directory. For example, if DevBoard was installed at `~/devboard`, we'll need to execute:

    cd ~/devboard
    npm run build:widgets

If there was no error, an `app/widgets.js` and a `libs/wigets.js` file would have been created.

### Board

#### Create

To create a board in the "hello-world" package that we installed in the beginning, we'll first need to change our working directory the "hello-world" boards directory.  Assuming DevBoard was installed at `~/devboard`, the command would be:

    cd ~/devboard/packages/hello-world/boards

and in the boards directory, create a file called "layout-3.json" with the following JSON:

    {
        "name": "layout-3",
        "displayName": "Layout 3",
        "widgets": [
            {
                "fullName": "hello-world.configurable",
                "cols": "6",
                "params": {
                    "textAlign": "left",
                    "method": "GET"
                }
            },
            {
                "fullName": "hello-world.configurable",
                "cols": "6",
                "params": {
                    "textAlign": "right",
                    "method": "POST"
                }
            },
            {
                "fullName": "hello-world.configurable",
                "cols": "12"
            }
        ]
    }

which will define a board called "layout-3" and include the fullstack widget that we created in this tutorial three times, but configured differently (or not in the case of the last widget object).

#### Promote

At the top of a board, you will find a boards menu and a quick links bar, as shown below:

What we would like to do is include the board (layout-3) that we had just created, along with the other boards in the "hello-world" pacakge.  To do this, we can either modify the boards.default.json (not recommended) or boards.json (recommended) file, which you can find the DevBoard installation directory. Since updating boards.default.json is not recommended, we'll update boards.json.  Note, if boards.json does not exist, you will have to create one, by copying the boards.default.json file like so:

    cp boards.default.json boards.json

In boards.json file, add "hello-world.layout-1", "hello-world.layout-2" and "hello-world.layout-3" to the end of the menu.boards and quickLinks.boards array like so:

    {
        "menu": {
            "boards": [
                    .
                    .
                "hello-world.layout-1",
                "hello-world.layout-2"
                "hello-world.layout-3"
            ]
        },
        "quickLinks": {
            "boards": [
                    .
                    .
                "hello-world.layout-1"
                "hello-world.layout-2"
                "hello-world.layout-3"
            ]
        }
    }

#### Publish

To make the "hello-world" package available for use by DevBoard and others, we will need to build and bundle by executing the following in the DevBoard installation directory:

    npm run build:widgets && \
    npm run build:boards && \
    npm run bundle

## Finished

Congradulations on finishing the tutorial.  If DevBoard is currently not running, you can start it by executing:

    npm run dev:start

in the DevBoard installation directory. Once up and running, you can view DevBoard on your local machine on port 3357

    http://localhost:3357 

and select the boards in the "hello-world" package in the menu boards and quick links bar.
