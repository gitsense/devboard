async function getData(req) {
    const { query } = req;
    const { r } = query;
    const [ owner, name ] = r ? r.split("/") : [];

    if ( !r || !name ) {
        return  {
            "status": "fail",
            "data": {
                "r": "Full repo name (owner/name) is required"
            }
        }
    }

    const url = `https://api.github.com/repos/${r}`;
    const response = await fetch(url);

    if ( !response.ok ) {
        buttonBody.innerHTML = `Failed to fetch ${url}`;
        return {
            "status": "error",
            "message": `Fetching ${url} failed`
        }
    }

    const json = await response.json();

    return {
        "status": "success",
        "data": json
    }
}

module.exports = { getData };
