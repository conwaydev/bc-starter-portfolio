import { getProjects } from '../lib/contentful';

export default async function Home() {
  const projects = await getProjects();

  return (
    <main>
      <div className='max-w-3xl mx-auto p-4 flex items-center justify-center h-full min-h-screen'>
        <p>Hi, my name is
          {process.env.NEXT_PUBLIC_NAME ? (
            <span className="inline-block p-2 bg-green-500 rounded-sm ml-2">{process.env.NEXT_PUBLIC_NAME}</span>
          ) : (
            <span className="inline-block p-2 bg-red-500 rounded-sm ml-2">I haven’t set this in my .env.local</span>
          )}
        </p>
        {projects && (
          <ul>
            {projects.map((project) => (
              <li key={project.sys.id}>
                <p>{project.fields.title}</p>
                <p>{project.fields.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
