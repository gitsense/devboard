async function getData(context, opts={}) {
    return { date: new Date().toString() };
}

module.exports = { getData };
