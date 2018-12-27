#!/usr/bin/env node

const gip = require('../index.js');
const file = process.argv[2];

(async () => {
  const res = await gip(file);
  console.log(res.css);
})();
