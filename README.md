# DevBoard

A simple, AI-friendly JavaScript framework for quickly building 
    
- Smart dashboards 
- Smart documents
- Prototypes
- Full-stack applications

## Simple

Beginners welcomed.  DevBoard is designed with a very strong seperation of concern, to ensure you can learn and build at your own pace. Very basic JavaScript knowledge is all that is required to get started with DevBoard.  To learn more, take a look at the DevBoard [hello-world package](https://github.com/gitsense/hello-world) to see what is required to create a [frontend only](https://github.com/gitsense/hello-world/tree/main/widgets/frontend-only), [backend only](https://github.com/gitsense/hello-world/tree/main/widgets/backend-only) and [full-stack](https://github.com/gitsense/hello-world/tree/main/widgets/fullstack) widget.

## AI-friendly

AI-friendly??? Yes, really. 

Due to how DevBoard [packages](http://localhost:3357?board=welcome.packages), [boards](http://localhost:3357?board=welcome.boards) and [widgets](http://localhost:3357?board=welcome.widgets) work, it is very easy to take a divide-and-conquer approach to building and testing websites, dashboards, and apps. With devboard, you are encouraged to create smaller, reusable components, which makes it easier to construct concise prompts, making prompt refinement and debugging easier.

## Quick

How quick? It only takes a few minutes to create a full-stack widget. 

DevBoard excels in fast prototyping, enabling you to test new ideas and gather requirements quickly. To learn more, take a look at the [full-stack hello-world widget](https://github.com/gitsense/hello-world/tree/main/widgets/fullstack) or try the [tutorial](http://localhost:3357?board=welcome.tutorial) that will walk you through the steps to create a configurable full-stack widget in less than five minutes.

## Smart

A DevBoard dashboard is comprised of widgets that can not only display data (charts, tables, etc.), but they can also be programmed to be [context aware](http://localhost:3357?board=welcome.demo#context-aware), [configurable](http://localhost:3357?board=welcome.demo#configurable), [communicate with one another](http://localhost:3357?board=welcome.demo#communicate) and more. With DevBoard, you can make your dashboards as smart as you need and if you take a look at the [demo](http://localhost:3357?board=welcome.demo) document, you can see an example of a smart document.

## Demo

### Widgets

Here are some quick widget examples to help you better understand why you might want to create a dashboard, website, full-stack application and more with DevBoard.

- [Smart documents](http://localhost:3357?board=welcome.demo#smart-docs)
- [Context aware](http://localhost:3357?board=welcome.demo#context-aware)
- [Configurable](http://localhost:3357?board=welcome.demo#configurable)
- [Communicate](http://localhost:3357?board=welcome.demo#communicate)
- [Server side data](http://localhost:3357?board=welcome.demo#server-side-data)

### GitSense

Need a more complex example? No problem. GitSense is using DevBoard to re-imagine dev tools, one tool at a time.  GitSense contains over 6000 lines of SQL code and uses dozens of widgets to surface software development insights.  Take a look the links below to see GitSense and DevBoard in action:

[vercel](https://app.gitsense.com/vercel) &nbsp;|&nbsp; [supabase](https://app.gitsense.com/supabase) &nbsp;|&nbsp; [ollama](https://app.gitsense.com/ollama)

### White-label

DevBoard is designed to be yours! Just add a custom header and footer to the DevBoard [index.html](https://github.com/gitsense/devboard/tree/main/views/index.html) file to make it your own or embed DevBoard into your product or project. Watch the video below, to see how GitSense can seamless integrate with GitHub with the DevBoard [bundle](http://localhost:3357?board=welcome.publish) file and a Chrome extension.


## Quick Start

### Requirements

- [Git](https://www.git-scm.com)
- [Node.js](https://nodejs.org/)

### 1. Clone DevBoard

    git clone https://github.com/gitsense/devboard ~/devboard

### 2. Install dependencies

    cd ~/devboard
    npm install

### 3. Build and bundle

    npm run build:widgets
    npm run build:boards
    npm run bundle

#### 4. Start DevBoard

For development, use

    npm run dev:start

For production, use a package like [forever](https://www.npmjs.com/package/forever)

    forever server.js

DevBoard can now be viewed at http://localhost:3357

## Roadmap

Authentication and layout is the current biggest priority.

- Authentication widgets
- Advanced layout engine
- Multiple packaging layers
- Charting widgets (line, bar, etc.)
- Data widgets for GitHub, Jira, GMail, etc.
- Widgets hub
- Typescript support
- ESM support
>>>>>>> 27f9fa2 (Initial import)
