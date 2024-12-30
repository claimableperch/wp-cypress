const asyncMap = require('../utils/async-map');
const fs = require('node:fs');
const verifyWPVersion = require('./verifyWPVersion');

const getValidVersions = async (versions) => {
  const validation = await asyncMap(versions, async (ver) => {
    if (fs.existsSync(ver)) {
      return { ver, valid:'local' };
    }
    const valid = await verifyWPVersion(ver);
    return { ver, valid };
  });

  return validation.filter((x) => x.valid).map((x) => x.ver);
};

module.exports = getValidVersions;
