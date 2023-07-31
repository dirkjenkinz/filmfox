const dotenv = require('dotenv');
dotenv.config();
showLog = process.env.SHOWLOG;
const logger = require('../services/logger');

const smartLog = (lev, msg) => {
    if (lev === 'paramount') {
        logger.log('info', msg);
    };

    if (lev === 'error'){
        logger.error(msg);
    };

    if (showLog === 'all'){
        if (lev === 'info'){
            logger.log('info', msg);
        };
    };
};

module.exports = {
    smartLog,
};