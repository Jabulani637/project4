const dns = require("dns");
const pg = require("pg");
const { Pool } = pg;

// Force IPv4-only DNS resolution.
// `dns.setDefaultResultOrder('ipv4first')` only reorders A/AAAA answers.
// `pg` creates a net.Socket and does not let us pass per-connection
// `family`/`lookup` options, so we monkey-patch `dns.lookup` to always
// request IPv4 results.
const originalLookup = dns.lookup;
dns.lookup = (hostname, options, callback) => {
  if (typeof options === "function") {
    callback = options;
    options = {};
  }

  return originalLookup(hostname, { ...options, family: 4 }, callback);
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;

