import Link from 'next/link';
import { projects, getProjectBySlug, getAllProjectSlugs } from '@/lib/projects';
import ProjectDetailClient from './ProjectDetailClient';

export default function ProjectPage({ params }) {
  const { slug } = params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-display-md text-brand-navy mb-6">Project Not Found</h1>
          <Link href="/portfolio" className="btn-fluid btn-filled">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const idx = projects.indexOf(project);
  const next = projects[(idx + 1) % projects.length];
  const prev = projects[(idx - 1 + projects.length) % projects.length];

  return <ProjectDetailClient project={project} nextProject={next} prevProject={prev} />;
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found | P&J Glass' };

  return {
    title: `${project.title} \u2014 ${project.category} | P&J Glass`,
    description: project.subtitle,
    openGraph: {
      title: project.title,
      description: project.subtitle,
    },
  };
}
