function render(card) {
    const { body } = card.main;
    body.setAttribute("class", "markdown-body");
    body.style.fontSize = "16px";

    body.md = `
        <center>
            <h1>DevBoard</h1>
            <p>A framework for building smart dashboards, fast!</p>
        </center>
        <h2>Smart</h2>
        <p class="mt-2">What makes a DevBoard dashboard smart? Unlike a traditional dashboard that is comprised of cards that can display data, a DevBoard dashboard is comprised of widgets that can not only display data, but be programmed in JavaScript as well.  With DevBoard, you can make your dashboards as smart as you need.  

        <h2 class=mt-4>Audience</h2>
        <p class=mt-2>Is DevBoard for developers only? No.</p>

        <p>A DevBoard dashboard is just a JSON file and it is used to define the dashboard layout and widgets to include, so anybody can create a dashboard. To create a widget though, you will need very basic JavaScript knowledge.  Over time, the goal is to create an ecosystem for smart widgets where developers and non-developers can easily find what they need, without having to create their own.

        <h2>Install</h2>

        <pre>
git clone https://gitsense.com/gitsense/devboard ~/devboard
cd ~/devboard
node install
npm build
npm run dev:start</pre>

        <h2 class=mt-4>Examples</h2>
        <p class=mt-2>To better understand why you may want or need a smart dashboard, please refer to the examples below: 
        <ul>
            <li>No programming</li>
            <li>Context aware</li>
            <li>Communicate</li>
            <li>Server side data</li>
            <li>Static files
        </ul>
        <h4 class="mt-3">Tip</h4>
        <p>Set <strong>Help</strong> to <strong>show</strong> in the top right hand corner to show the widget's help link or <a href=/?help=show>click here</a>
    `;
}

module.exports = { render };
