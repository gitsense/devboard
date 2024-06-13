const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const d = {
    shortAge: (time, offset=4) => {
        let age = dayjs().utc().add(offset, "hours").to(time)

        if ( age.match(/^a few seconds/) )
            return "3s";

        if ( age.match(/^a minute ago/) )
            return "1m";

        if ( age.match(/^an hour/) )
            return "1h";

        if ( age.match(/a month/) )
            return "1mo";

        if ( age.match(/^a day/) )
            return "1d";

        if ( age.match(/a year/) )
            return "1y";

        if ( age.match(/^\d+ min/) )
            return age.split(" ")[0]+"m";

        if ( age.match(/^\d+ hour/) )
            return age.split(" ")[0]+"h";

        if ( age.match(/^\d+ d/) )
            return age.split(" ")[0]+"d";

        if ( age.match(/\d+ day/) )
            return age.split(" ")[0]+"d";

        if ( age.match(/\d+ month/) )
            return age.split(" ")[0]+"mo";

        if ( age.match(/\d+ year/) )
            return age.split(" ")[0]+"y";

        if ( age.match(/^in a few seconds/) )
            return "i3s";

        if ( age.match(/^in a minute/) )
            return "i1m";

        if ( age.match(/^in ^\d+ min/) )
            return age.split(" ")[0]+"m";

        if ( age.match(/^in \d+ min/) )
            return "i"+age.split(" ")[1]+"m";

        if ( age.match(/^in an hour/) )
            return "i1h";

        if ( age.match(/^in \d+ hour/) )
            return "i"+age.split(" ")[1]+"h";

        if ( age.match(/^in \d+ day/) )
            return "i"+age.split(" ")[1]+"d";

        if ( age.match(/^in \d+ month/) )
            return age.split(" ")[0]+"mo";

        if ( age.match(/^in \d+ year/) )
            return age.split(" ")[0]+"y";

        return age;
    }
}

module.exports = d;
