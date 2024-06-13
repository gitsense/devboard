# Boards

A board is comprised of one or more widget blocks arranged in grid system.

- [Create](#create)
    - [Boards directory](#create-boards-dir)
    - [Board](#board)
        - [name](#name)
        - [displayName](#displayName)
        - [widgets](#widgets)
    - [Widget block](#widget-block)
        - [fullName](#fullName)
        - [cols](#cols)
        - [colStyle](#colStyle)
        - [params](#params)
- [Configure](#configure)
    - [Example](#promote-example)
- [Build](#build)
- [Example](#example)

<a name=create></a>
## Create

<a name=create-boards-dir></a>
### 1. Boards directory

First, create the package "boards" directory if one does not exist. For example, if you would like to create a board in the "acme" package, the path to the "boards" directory would be:

    /<devboard>    <-- installation directory
      /packages    <-- packages directory
        /acme      <-- package directory
          /boards  <-- package boards directory

To learn more, please refer to the [Packages]() document.

<a name=board></a>
### 2. Board

To create a board, create a file called `<board name>.json` in the package "boards" directory with the following JSON:

    {
        "name":        String, (required)
        "displayName": String, (optional)
        "widgets":     Array   (required)
    }

<a name=name></a>
#### name

Required. The name of the board. Note, name can only contain alphanumeric, dash (-) and underscore (_) characters.  

<a name=displayName></a>
#### displayName

Optional. The name to display. If not defined, the widget's name will be used.

<a name=widgets></a>
#### widgets

Required. One or more widget blocks. Note, you can references the same widget more than once. For example, you can have something like:

    "widgets": [
        {
            "fullName": "hello.world",
            "cols": 6
        },
        {
            "fullName": "hello.world",
            "cols": 3
        },
        {
            "fullName": "hello.world",
            "cols": 3
        }
    ]

which references the "hello.world" widget three times. Please refer to "params" in the Widget block section to learn how to configure widgets with board paramters.

<a name=widget-block></a>
### Widget block

A board widget block has the following properites:

    {
        "fullName":  String,   (required)
        "cols":      Integer,  (required)
        "colStyle":  Object,   (optional)
        "params":    Object    (optional)
    }

<a name=fullName></a>
#### fullName

Required. The widget's full name written as `<package>.<widget>`. For example, if the full name was "hello.world", the package would be "hello" and the widget would be "world".

<a name=cols></a>
#### cols

Required. Defines the the number of columns to occupy, with min=1 and max=12. Note, the total number of columns that can be occupied per row is 12. This means, if you have the following:

    "widgets": [
        {
            "fullName": "hello.world",
            "cols": 8
        },
        {
            "fullName": "hello.world",
            "cols": 8
        }
    ]

two rows will be created, since 8 + 8 > 12.

<a name=colStyle></a>
#### colStyle

Optional. One or more [HTMLElement style property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) to style the column. For example, the following:

    "colStyle": {
        "padding": "12px",
        "backgroundColor": "black"
    }

will set the column padding to "12px" and the background color to "black".

<a name=params></a>
#### params

Optional. Used to pass parameters to the widget. Params can be any valid JSON. For example, you can define:

    "params": {
        "msg": "Hello, World!"
    }

or

    "params": {
        "chart": {
            "height": 200,
            "type": "line"
        }
    }

<a name=configure></a>
## Configure

At the top of a board, you will find a boards menu and a quick links bar, as shown below.

<img src=/--/images/board-header.png style="border:1px solid #ccc;border-radius:5px;margin-bottom:25px;filter: drop-shadow(5px 5px 5px #ccc);">


If you would like to update what boards are shown or change their order, you can either modify the boards.default.json (not recommend) or boards.json (recommended) file, which is located in the DevBoard installation directory. Since it is not recommended to modify boards.default.json, we'll focus on the boards.json file.  

If the boards.json file does not exist, you will have to create one, with the following JSON:

    {
        "header": {
            show: Boolean (Optional. Defaults to true)
        },
        "menu": {
            "boards": Array of board objects (Optional)
        },
        "quickLinks": {
            "boards": Array of board objects (Optional)
        }
    }

or copy the boards.default.json like so:

    `cp boards.default.json boards.json`

#### Board objects

A board object contains the following properties

    {
        "fullName": Required, (Optional),
        "default": Boolean, (Optional),
        "text": String, (Optional),
        "href": String (Optional)
    }

##### fullName

Required. The full name of the board.

##### default

Optional. Set as default. Only valid when used to define menu boards.

##### text

Optional. Display text value instead of the board displayName.

##### href

Optional. Use the href value instead of the board value.

<a name=promote-example></a>
### Example

    {
        "menu": {
            "boards": [
                { "fullName": "acme.drill", "default" true },
                { "fullName": "acme.hammer" }
            ]
        },
        "quickLinks": {
            "boards": [
                { "fullName": "acme.drill" },
                { "fullName": "acme.hammer" },
                { "fullName": "", "text": "GitHub", href: "https://github.com/gitsense/devboard" },
            ]
        }
    }

> Note 1: By not defining the header property, the header (menu boards, quick links, and help option) will be shown by default.

> Note 2: Any changes made to board.json or board.default.json will not come into affect until the board is rebuilt. See build section for instructions.

<a hame=build></a>
## Build

To package the boards for bundling and to ensure they were created properly, you will need to execute `npm run build:boards` in the DevBoard installation directory. For example, if DevBoard was installed at `~/devboard`, you would execute:

    cd ~/devboard
    npm run build:boards

which will create an `app/board.js` file for bundling. To learn more, plase refer to the "Publish" document.

<a name=example></a>
## Example

The following will create a board called "example" with two rows with the same widget used three times. The first row contains two widget instances (6 cols + 6 cols) and one widget instance (12 cols) in the second row:

    {
        "name": example",
        "displayName": "Example tutorial board",
        "widgets": [
            {
                "fullName": "hello.world",
                "cols": 6,
                "colStyle": {
                    "textAlign": "center",
                    "fontSize": "20px",
                    "fontWeight: "600"
                },
                "params": {
                    "msg": "Hello, world from Mars!"
                }
            },
            {
                "fullName": "hello.world",
                "cols": 6,
                "colStyle": {
                    "textAlign": "center",
                    "fontSize": "20px",
                    "fontWeight: "600"
                },
                "params": {
                    "msg": "Hello, world from Pluto!"
                }
            },
            {
                "fullName": "hello.world",
                "cols": 12,
                "colStyle": {
                    "textAlign": "center",
                    "fontSize": "20px",
                    "fontWeight: "600"
                },
                "params": {
                    "msg": "Hello, world from Saturn!"
                }
            }
        ]
    }

