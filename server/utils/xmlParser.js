const { XMLParser } = require('fast-xml-parser');

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
});

const parseXML = (xmlData) => {
  try {
    const json = parser.parse(xmlData);
    return json;
  } catch (error) {
    console.error('❌ XML Parsing Error:', error.message);
    return null;
  }
};

module.exports = parseXML;
