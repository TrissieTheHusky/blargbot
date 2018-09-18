/*
 * @Author: stupid cat
 * @Date: 2017-05-07 18:20:10
 * @Last Modified by: stupid cat
 * @Last Modified time: 2018-09-07 00:07:52
 *
 * This project uses the AGPLv3 license. Please read the license file before using/adapting any of the code.
 */

const router = require('express').Router();
const hbs = require('hbs');
const moment = require('moment-timezone');

router.get('/json', async function (req, res) {
    await spawner.recacheDomains();
    let cache = spawner.domainCache;

    let domains = [];
    for (const key in cache) {
        if (cache[key]) domains.push(key);
    }
    domains.sort();
    res.locals.domains = domains;

    res.type('json');
    res.send(JSON.stringify(domains, null, 2));
});

router.get('/', async function (req, res) {
    await spawner.recacheDomains();
    let cache = spawner.domainCache;

    let domains = [];
    for (const key in cache) {
        if (cache[key]) domains.push(key);
    }
    domains.sort();
    res.locals.domains = domains;

    res.render('domains');
});
module.exports = router;