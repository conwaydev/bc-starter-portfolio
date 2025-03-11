import {getProjects} from "@/lib/contentful";
import Link from "next/link";

export default function Home({ projects }) {
  return (
    <main>
      <div className='max-w-3xl mx-auto p-4 flex items-center justify-center h-full min-h-screen'>
        <div className='p-2 bg-gray-200 rounded-md w-full'>
          <p className='text-center'>Hi, my name is
            {process.env.NEXT_PUBLIC_NAME ? (
              <span className="inline-block p-2 bg-green-500 rounded-sm ml-2">{process.env.NEXT_PUBLIC_NAME}</span>
            ) : (
              <span className="inline-block p-2 bg-red-500 rounded-sm ml-2">I haven’t set this in my .env.local</span>
            )}
          </p>
          {projects && (
            <div>
              <p>Projects</p>
              <ul>
                {projects.map((project) => (
                  <li key={project.sys.id}>
                    <p>
                      <Link className="p-2 bg-gray-50 hover:bg-white block rounded-md" href={`/projects/${project.sys.id}`}>
                        {project.fields.title}
                      </Link>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const projects = await getProjects();
  return {
    props: {
      projects,
    },
  };
}
