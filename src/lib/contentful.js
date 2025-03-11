import {createClient} from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getProjects() {
  const projects = await client.getEntries({
    content_type: 'projects',
  });

  return projects.items;
}

export async function getProject(id = '') {
  const project = await client.getEntries({
    content_type: 'projects',
    'sys.id': id,
  });

  return project.items;
}
