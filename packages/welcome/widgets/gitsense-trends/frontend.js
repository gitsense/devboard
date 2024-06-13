const h = require("../../../../app/utils/html.js");
const n = require("../../../../app/utils/number.js");
const { sleep } = require("../../../../libs/utils.js");

const avatarSize = 30;

function loaded(card) {
    const { widget, main, params={} } = card;
    const { id=1, chart={ height: 200, type: "line" }, org, trend } = params;

    if ( !ok() )
        return;

    const { titleBody, chartBody } = renderLayout(id, chart.height, main.body);

    renderTitle(org, titleBody);
    renderChart(trend, chart.type, org, widget, chartBody);

    function ok() {
        const { name, login, avatar } = org || {};
        const errors = [];

        if ( !org )
            errors.push("No org object!");

        if ( !name )
            errors.push("No org name!");

        if ( !login )
            errors.push("No org login!");

        if ( !avatar ) 
            errors.push("No org avatar!");

        if ( errors.length === 0 )
            return true;

        const { body } = main;
        body.style.fontSize = "16px";
        body.style.paddingLeft = "40px";

        body.innerHTML = `
            <h3>Incorrectly configured widget</h3>
            <p>${(errors.join("<br>"))}</p>
        `;

        return false;
    }
}

function renderLayout(id, chartHeight, renderTo) {
    renderTo.style.fontSize = "16px";

    const widget = h.createDiv({
        text: "Widget #"+id,
        style: {
            fontWeight: 500,
            textAlign: "center"
        }
    });

    const titleBody = h.createDiv({
        style: {
            lineHeight: avatarSize+"px"
        }
    });

    const chartBody = h.createDiv({
        style: {
            height: chartHeight+"px",
        }
    });

    const body = h.createDiv({
        append: [ titleBody, chartBody ],
        style: {
            marginTop: "10px", 
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px"
        }
    });

    renderTo.appendChild(widget);
    renderTo.appendChild(body);

    return { titleBody, chartBody };
}

function renderBoardParams(params, renderTo, clickedButton) {
    const { paramsBody, buttonBody } = renderLayout();

    const button = h.createSpan({
        text: "Render chart",
        cls: "btn btn-primary",
        style: {

        }
    });

    paramsBody.innerHTML = JSON.stringify(params, null, 2);
    buttonBody.appendChild(button);

    button.onclick = () => {
        renderTo.remove();
        clickedButton();
    }

    function renderLayout() {
        const paramsBody = h.createPre({
            style: {
                "overflow": "hidden"
            } 
        });

        const buttonBody = h.createDiv({
            style: {
                marginTop: "10px",
                textAlign: "center"
            }
        });

        renderTo.appendChild(paramsBody);
        renderTo.appendChild(buttonBody);

        return { paramsBody, buttonBody };
    }
}

function renderTitle(org, renderTo) {
    const { name, avatar } = org;

    const image = h.createImg({
        src: avatar,
        style: {
            height: avatarSize+"px",
            width: "auto",
            borderRadius: "5px"
        }
    });

    const text = h.createSpan({
        text: name,
        style: {
            marginLeft: "7px",
            fontWeight: 500
        }
    });

    renderTo.appendChild(image);
    renderTo.appendChild(text);
}

async function renderChart(trend, chartType, org, widget, renderTo) {
    const insights = await getInsights();
    const { wins=[], trends={} } = insights;
    const id2Win = mapWins(wins);
    const data = trends[trend];

    if ( !data ) {
        renderTo.innerHTML = `No trend data for trend type "${trend}"`;
        return;
    }

    const { xdata, ydata, minY, maxY } = mapData(data);

    const option = {
        grid: {
            left: 20,
            right: 20,
            top: 70,
            bottom: 30
        },
        title: {
            text: trend.charAt(0).toUpperCase()+trend.slice(1),
            left: "center",
            textStyle: {
                fontWeight: "normal",
                fontSize: 15
            },
        },
        xAxis: {
            type: "category",
            data: xdata,
            boundaryGap: chartType === "bar" ? true : false,
            axisLabel: {
                show: false
            }
        },
        yAxis: [
            {
                min: minY,
                max: maxY,
                axisLabel: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
            // Hack to show the start and end date at the begginning and end of the x axis.
            {
                // from date 
                position: "left",
                name: xdata[0],
                nameLocation: "start",
                offset: -30
            },
            {
                // to date
                position: "right",
                name: xdata[xdata.length - 1],
                nameLocation: "start",
                offset: -30
            }
        ],
        series: [
            {
                "name": "trned",
                "type": chartType,
                smooth: true,
                data: ydata,
                label: {
                    show: true,
                    position: "top",
                    formatter: (params) => {
                        const { data } = params;
                        return n.short(data, 1);
                    }
                }
            }
        ],
        animation: false
    };

    let chart = echarts.init(renderTo);
    chart.setOption(option);

    async function getInsights() {
        const { login } = org;
        const { staticURL } = widget;
        const url = staticURL.replace(/{file}/, `${login}.json`);
        const response = await fetch(url);

        if ( !response.ok ) {
            renderTo.innerHTML = "Failed to retrieve trend data";
            return;
        }

        return await response.json();
    } 

    function mapWins(wins) {
        const id2Win = {};

        wins.forEach(win => {
            const { id } = win;
            id2Win[id] = win;
        });

        return id2Win;
    }

    function mapData(data) {
        const xdata = []
        const ydata = [];

        let minY = null;
        let maxY = 0;

        data.forEach( (entry, i) => {
            const { win_id, total: y } = entry;
            const { max_date: x } = id2Win[win_id];

            if ( minY === null || y < minY )
                minY = y;

            if ( y > maxY )
                maxY = y;

            ydata.unshift(y);

            if ( i === 0 || i === data.length - 1 )
                xdata.unshift(x);
            else
                xdata.unshift(""); 
        });

        return { xdata, ydata, minY, maxY };
    }
}

module.exports = { loaded };
