# Publish

To publish widgets and boards for use by DevBoard and others, you will need to build and bundle them.

- [Directory](#dir)
- [Build](#build)
    - [Widgets](#build-widgets)
    - [Boards](#build-boards)
- [Bundle](#bundle)

<a name=dir></a>
## Directory

Before you can build and bundle the widgets and boards, you'll need to change your working diretory to the DevBoard installation directory. For example, if DevBoard was installed at `~/devboard`, you would execute

    cd ~/devboard

<a name=build></a>
## Build

The order in which widgets and boards are built is very important, since boards depend on widgets, which means you should always build the widgets first.

> Note: You can skip building widgets if there were no widget changes, but is recommended that you always build widgets since it will only take a second and prevent forgetfulness errors in the future.

<a name=build-widgets></a>
### Widgets

To build the widgets, execute

    npm run build:widgets

If there was no error, a frontent `app/widgets.js` and backend `libs/widgets.js` file would have been created.

<a name=build-board></a>
### Boards

To build the boards, execute

    npm run build:boards

If there was no error, an 'app/boards.js' file would have been created.

<a name=bundle></a>
## Bundle

DevBoard uses [Browserify](https://browserify.org/) to bundle frontend Node.js modules with the following command:

    npm run bundle

which will execute the following behind the scene:

    browserify app/main.js --standalone DevBoard -o public/js/devboard.js

If there was no error, the bundled frontend library file `public/js/devboard.js` would have been created. 

> Note: The backend code is not bundled as sharing backend code is done by installing packages.
