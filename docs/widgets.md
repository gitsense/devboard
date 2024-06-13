# Widgets

Widgets are comprised of Node.js modules that can render data to a [board](https://devboard.gitsense.com?board=welcome.boards) and process client/server-side requests.

- [Help](#help)
- [Create](#create)
    - [Package widgets directory](#create-pkg-widgets-dir)
    - [Widget directory](#create-widget-dir)
    - [Widget files & directories](#create-widget-files-dirs)
- [Widget Files & Directories](#widget-files-dirs)
    - [config.json](#config.json)
    - [frontend.js](#frontend.js)
    - [backend.js](#backend.js)
    - [static](#static)
- [Build](#build)
- [Example](#example)

<a name=help></a>
## Help 

To learn more about a widget when viewing a board, set 'Help' to 'show' in the top-right hand corner of the board. By setting 'Help' to 'show', the widget's help link will be shown, if one has been defined. See [config.json](#config.json) in this document to learn more.

<a name=create></a>
## Create

<a name=create-pkg-widgets-dir></a>
### 1. Package widgets directory

First, create the package "widgets" directory if one does not exist. For example, if you would like to create a widget in the "acme" package, the path to the package widgets directory would be:

    /<devboard>     <-- installation directory
      /packages     <-- packages directory
        /acme       <-- package directory
          /widgets  <-- package widgets directory

To learn more, please refer to the [packages](https://devboard.gitsense.com?board=welcome.packages) document.

<a name=create-widget-dir></a>
### 2. Widget directory

In the package widgets directory, create a directory with the same name of the widget. For example, if you would like to create a widget called "store" in the "acme" package, the path the "store" widget directory would be:

    /acme       <-- package directory
      /widgets  <-- pacakge widgets directory
        /store  <-- widget directory

<a name=create-widget-files-dirs></a>
### 3. Widget files & directories

In the widget directory, create the following files and directory:

- config.json (Required JSON file)
- frontend.js (Optional Node.js module)
- backend.js (Optional Node.js module)
- static (Optional static files directory)

> Note, you can add other files and directories to the widget's directory.

<a name=widget-files-dirs></a>
## Widget Files and Directories
            
<a name=config.json></a>
### config.json 

Required. Defines the widget with the following JSON:

    {
        "name": String (required)
        "help": Object (options)
    }

#### name

Required. The name of the widget. Note, the widget name can only contain alphanumeric, dash (-) and underscore (_) characters.

#### help

Optional. An optional help object with the following properties:

    {
        "text": String (optional),
        "url":  String (required)
    }

##### text

Optional. The text to display when showing the widget's help link. If not defined, the widget's full name (`<pacakge>.<widget>`) will be used.

##### URL

Required. A URL that can be used to learn more about the widget.

#### Example config.json

Defines a widget called "simple" that references a GitHub repo for help:

    {
        "name": "simple",
        "help": {
            "URL": "https://github.com/gitsense/hello-world/widgets/simple"
        }
    }

<a name=frontend.js></a>
### frontend.js

Optional. Create to implement a frontend capable widget. A Node.js module that implements and exports a "loaded" function like so:

    function loaded(card) {
        // code
    }

    module.exports = { loaded }; 

If implemented, DevBoard will call the "loaded" function and pass it a "card" object when the widget has been loaded into a board. 

> Note: The loaded function is a void function. That is, nothing is returned.

#### card

The card object contains information about the widget, board paramaters (if any), DOM elements for rendering to and more. Detailed documentation coming soon. In the meantime, please refer to the frontend.js files in the demo widgets and tutorial to learn more.


**IMPORTANT**

You can implement and export other functions in the frontend.js file as well. For example, you may want to implement and export a "getData" function like so:

    function loaded(card) {
        // code
    }

    function getData() {
        // code
    }

    module.exports = { loaded, getData };

You can also create as many Node.js modules as required to implement the widget's frontend logic.

<a name=backend.js></a>
### backend.js

Optional. Create to implement a backend capable widget. A Node.js module that implements and exports one or all of the following functions:

    // get = GET request method and post = POST request method

    // Returns: Any
    function getData(req) {
        // code
    }

    // Returns: Any
    function postData(req) {
        // code
    }

    // Returns: Any
    function getExec(req) {

    }

    // Returns: Any
    function postExec(req) {

    } 
    
    module.exports = { getData, postData, getExec, postExec };

DevBoard will call getData and postData and pass it a Node.js express req object when there is a request to the widget's data endpoint, as shown below:

    http(s)://<devboard:port>/api/v0/widgets/<package>/<widget>/data

DevBoard will call getExec and postExec and pass it a Node.js express req object when there is a request to the widget's exec endpoint, as shown below:

    http(s)://<devboard:port>/api/v0/widgets/<package>/<widget>/exec

**IMPORTANT**

Like frontend.js, you can implement and export other functions in the backend.js file and create as many Node.js modules as required.

<a name=static></a>
### static

Optional. Create a directory called "static" to serve static files with the following URL:

    https(s)://<devboard:port>/api/v0/widgets/<package>/<widget>/static/{file_name}

<a name=build></a>
## Build

To ensure widgets were created correctly and to package them for bundling, execute `npm run build:widgets` in the DevBoard installation directory. For example, if DevBoard was installed at `~/devboard`, you would execute:

    cd ~/devboard
    npm run build:widgets

To learn more, please refer to the widgets section in the "Publish" document.

<a name=example></a>
## Example

A very simple full-stack widget called "store" in a package called "acme"

    /<devboard>      
      /packages      
        /acme
          /widgets
            /store
               config.json
               frontend.js
               backend.js

#### config.json

Define widget

    {
        "name": "store"
    }

#### backend.js

Return "Hello, World!" text message

    function getData(req) {
        return "Hello, World!"
    }

    module.exports = { getData };

and if you want to return a JSON instead of a string, you can return an object like so:

    function getData(req) {
        return { data: "Hello, World!" }
    }

    module.exports = { getData };

> Note 1: The return object can be ANY object.  The one shown is just an example of what the return object can look like.

> Note 2: By not implementing postData, getExec and postExec, DevBoard will not call the widget when there is a POST to the data endpoint and a GET/POST to the exec endpoint.

#### frontend.js

Retrieve and display the data returned by the widget's server side data endpoint.

    async loaded(card) {
        const { widget, main } = card;
        const response = await fetch(widget.dataURL);
        const data = await response.text();
        main.body.innerText = data;
    }

    module.exports = { loaded };

If backend.js returns a JSON instead of a text value, you will need to change the data line to:

    const { data } = await response.json();

since the response would be `{ data: "Hello, World! }`
