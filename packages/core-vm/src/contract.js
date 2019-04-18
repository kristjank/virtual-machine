// person.js
'use strict';

import const calc = require('./contract-module');

const main = () => {

    // Calculator a = new Calculator();
    const res = calc.add(3,3);
    const wallets = getWallets();
    wallets.voted = false;
    test(wallets);
}
