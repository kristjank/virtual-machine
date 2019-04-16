// person.js
'use strict';

const main = () => {
    const wallets = getWallets();
    wallets.voted = false;
    test(wallets);
}
