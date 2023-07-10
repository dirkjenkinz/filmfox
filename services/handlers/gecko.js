const axios = require('axios');

const ping = async () => {
    console.log('gecko ping');
    let response = await axios.get('https://api.coingecko.com/api/v3/ping');
    return JSON.stringify(response.data, null, 4)
};

const simple = async () => {
    console.log('gecko simple');
    let response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=gbp');
    return JSON.stringify(response.data, null, 4)
};

const supported = async () => {
    console.log('gecko supported');
    let response = await axios.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies');
    console.log(response.data);
    return response.data;
};

const allCoins = async () => {
    console.log('gecko allCoins');
    let response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
    return response.data;
}

const tickers = async () => {
    console.log('gecko tickers');
    let response = await axios.get('https://api.coingecko.com/api/v3/coins/cardano/tickers');
    return JSON.stringify(response.data, null, 4);
}
const current = async () => {
    console.log('gecko current');
    let response = await axios.get('https://api.coingecko.com/api/v3/coins/cardano');
    return JSON.stringify(response.data, null, 8);
}

module.exports = { ping, simple, supported, allCoins, tickers, current }