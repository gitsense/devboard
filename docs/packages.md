# Packages

Packages are containers for widgets and boards which provide a unique namespace for their development and distribution.

- [Create](#create)
    - [config.json](#config)
    - [README.md](#readme)
    - [boards directory](#boards)
    - [widgets directory](#widgets)
- [Install](#install)
    - [DevBoard package dependencies](#devboard-package)
    - [NPM dependencies](#npm)
- [Development](#development)

<a name=create></a>
## Create

To create a package, create a directory with the following files and directories:

    /boards       <-- Optional boards directory
    /widgets      <-- Optional widgets directory
    config.json   <-- Required package config file
    README.md     <-- Optional but strongly recommended

> Note, you can add other files and directories to the package.  For example, you may want to include a "libs" and "bins" directory for use by the package or other packages.

<a name=config.json></a>
#### config.json

Required. Defines the package with the following JSON:

    {
        "name": String (required)
    }

##### name

Required. The name of the package.  Note, a package name can only contain alphanumeric, dash (-) and underscore (_) characters. 

<a name=readme></a>
#### README.md

Optional. A README file is optional but may become a requirement in the future.

<a name=boards></a>
#### boards directory

Optional. Create this directory to store package boards.

<a name=widgets></a>
#### widgets diretory

Optional. Create this directory to store package widgets.

<a name=install></a>
## Install

To install a package, copy, move or clone it to the DevBoard "packages" directory. For example, if DevBoard was installed at `~/devboard`, the DevBoard packages directory would be `~/devboard/packages`.  To learn more, please refer to the [tutorial](?board=welcome.tutorial), which will walk you through the steps to install a package from GitHub.

<a name=devboard-package></a>
### DevBoard package dependencies

If the package has dependencies with other DevBoard packages, you can install them with the instructions mentioned above.

<a name=npm></a>
### NPM dependencies

If the package has NPM dependencies, you can install them as you normally would.

<a name=development></a>
## Development

You can safely develop your package in the DevBoard "packages" directory, since the DevBoard ".gitignore" file will ignore all packages except for the pre-installed "welcome" package.

