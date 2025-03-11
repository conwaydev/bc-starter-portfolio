import { getProjects, getProject } from '@/lib/contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Link from 'next/link';

export default function Project({ title, description, featuredImage }) {
    return (
        <main>
            <div className='max-w-3xl mx-auto p-4 flex items-center justify-center h-full min-h-screen'>
                <div className='p-2 bg-gray-200 rounded-md w-full'>
                    {featuredImage && (
                        <img
                            className='block aspect-square w-96 mx-auto object-cover rounded-md'
                            src={featuredImage?.fields?.file?.url}
                            height={featuredImage?.fields?.file?.details?.image?.height}
                            width={featuredImage?.fields?.file?.details?.image?.width}
                            alt={featuredImage?.fields?.title}
                        />
                    )}
                    <h1 className='text-lg'>{title}</h1>
                    <div className='mt-4 text-sm'>
                        {description && (
                            <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(description) }} />
                        )}
                    </div>

                    <Link href='/' className='mt-4 text-sm underline'>Home ➡️</Link>
                </div>
            </div>
        </main>
    )
}

export async function getStaticPaths() {
    const projects = await getProjects();
    const paths = projects.map((project) => ({
        params: { id: project.sys.id },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const project = await getProject(params.id);
    const { title, description, featuredImage } = project[0].fields;
    return {
        props: {
            title,
            description,
            featuredImage,
        },
    };
}