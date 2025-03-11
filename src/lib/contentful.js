const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

async function getProjects() {
  const entries = await client.getEntries({
    content_type: 'project', // This MUST match your Content Model ID
    order: '-sys.createdAt' //optional
  });
  return entries.items;
}

module.exports = { getProjects };
