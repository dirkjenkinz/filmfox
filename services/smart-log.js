const dotenv = require('dotenv');
dotenv.config();
showLog = process.env.SHOWLOG;

const smartLog = (lev, msg) => {
const dateObject = new Date();
const date = ("0" + dateObject.getDate()).slice(-2);
const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
const year = dateObject.getFullYear();
const hours = dateObject.getHours();
const minutes = dateObject.getMinutes();
const seconds = dateObject.getSeconds();

const time_stamp = (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

    if (lev === 'paramount') {
        console.log(`paramount - time: ${time_stamp} - ${msg}`);
    };

    if (lev === 'error'){
        console.log(`error - time: ${time_stamp} - ${msg}`);
    };

    if (showLog === 'all'){
        if (lev === 'info'){
            console.log(`info - time: ${time_stamp} - ${msg}`);
        };
    };
};

module.exports = {
    smartLog,
};