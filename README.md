# DevBoard

A simple, AI-friendly JavaScript framework for quickly building 
    
- Smart dashboards 
- Smart documents
- Full-stack applications

## Simple

Beginners welcome!

Very basic JavaScript knowledge is all that is required to get started with DevBoard.  To learn more, take a look at the DevBoard [hello-world package](https://github.com/gitsense/hello-world) to see what is required to create a [frontend only](https://github.com/gitsense/hello-world/tree/main/widgets/frontend-only), [backend only](https://github.com/gitsense/hello-world/tree/main/widgets/backend-only) and [full-stack](https://github.com/gitsense/hello-world/tree/main/widgets/fullstack) widget.

## AI-friendly

AI-friendly??? Yes, really. 

Due to how DevBoard [packages](https://devboard.gitsense.com?board=welcome.packages), [boards](https://devboard.gitsense.com?board=welcome.boards) and [widgets](https://devboard.gitsense.com?board=welcome.widgets) work, it is very easy to take a divide-and-conquer approach to building with DevBoard. DevBoard is designed with a very strong separation of concerns, allowing for highly isolated development and testing. This should make constructing and refining AI prompts easier with DevBoard.

## Quick

How quick? 

It only takes a few minutes to create a full-stack widget.  DevBoard excels in fast prototyping, enabling you to test new ideas and gather requirements quickly. To learn more, take a look at the [full-stack hello-world widget](https://github.com/gitsense/hello-world/tree/main/widgets/fullstack) or try the [tutorial](https://devboard.gitsense.com?board=welcome.tutorial) that will walk you through the steps to create a configurable full-stack widget in less than five minutes.

## Smart

Smart, with examples!

A DevBoard dashboard is comprised of widgets that can not only display data (charts, tables, etc.), but they can also be programmed to be [context aware](https://devboard.gitsense.com?board=welcome.demo#context-aware), [configurable](https://devboard.gitsense.com?board=welcome.demo#configurable), [communicate with one another](https://devboard.gitsense.com?board=welcome.demo#communicate) and more. And if you take a look at the [demo](https://devboard.gitsense.com?board=welcome.demo) document, you can see an example of a smart document in action.


## Demo

### Widgets

Here are some quick widget examples to help you better understand why you might want to create a dashboard, website, full-stack application and more with DevBoard.

- [Smart documents](https://devboard.gitsense.com?board=welcome.demo#smart-docs)
- [Context aware](https://devboard.gitsense.com?board=welcome.demo#context-aware)
- [Configurable](https://devboard.gitsense.com?board=welcome.demo#configurable)
- [Communicate](https://devboard.gitsense.com?board=welcome.demo#communicate)
- [Server side data](https://devboard.gitsense.com?board=welcome.demo#server-side-data)

### GitSense

Need a more complex example? No problem. GitSense is using DevBoard to re-imagine dev tools, one tool at a time.  GitSense contains over 6000 lines of SQL code and uses dozens of widgets to surface software development insights.  Take a look the links below to see GitSense and DevBoard in action:

[vercel](https://app.gitsense.com/vercel) &nbsp;|&nbsp; [supabase](https://app.gitsense.com/supabase) &nbsp;|&nbsp; [ollama](https://app.gitsense.com/ollama)

### White-label

DevBoard is designed to be yours! Just add a custom header and footer to the DevBoard [index.html](https://github.com/gitsense/devboard/tree/main/views/index.html) file to make it your own or embed DevBoard into your product or project. Watch the video below, to see how GitSense can seamless integrate with GitHub with the DevBoard [bundle](https://devboard.gitsense.com?board=welcome.publish) file and a Chrome extension.


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

    npm run build:widgets && \
    npm run build:boards && \
    npm run bundle

#### 4. Start DevBoard

For development, use

    npm run dev:start

For production, use a package like [forever](https://www.npmjs.com/package/forever)

    forever server.js

DevBoard can now be viewed at https://devboard.gitsense.com

## Roadmap

Authentication and advanced layout are the current biggest priorities.

- Authentication widgets
- Advanced layout engine
- Multiple packaging layers
- Charting widgets (line, bar, etc.)
- Data widgets for GitHub, Jira, GMail, etc.
- Widgets hub
- Typescript support
- ESM support
