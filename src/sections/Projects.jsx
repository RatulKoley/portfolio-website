import { ArrowUpRight, Building2, Layers2 } from "lucide-react";
import Container from "../components/Container";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import { portfolio } from "../data/portfolio";

const Projects = () => (
  <section id="projects" className="border-b border-line py-20 sm:py-28">
    <Container>
      <SectionTitle eyebrow="Selected projects" title="Software built for complex, real-world operations." subtitle="A selection of platforms and modules described in the resume." />
      <div className="grid gap-4 lg:grid-cols-2">
        {portfolio.projects.map((project, index) => (
          <Card key={project.name} className="group flex min-h-80 flex-col p-6 sm:p-7">
            <div className="flex items-start justify-between gap-5"><span className="grid size-10 place-items-center rounded-lg border border-blue-400/20 bg-blue-500/10 text-blue-300">{index % 2 === 0 ? <Building2 className="size-5" /> : <Layers2 className="size-5" />}</span><span className="text-xs text-zinc-500">{project.kind}</span></div>
            <h3 className="mt-8 text-xl font-semibold tracking-tight text-white">{project.name}</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">{project.highlights.map((highlight) => <span key={highlight} className="rounded-full border border-positive/20 bg-positive/8 px-2.5 py-1 text-xs text-green-300">{highlight}</span>)}</div>
            <div className="mt-auto border-t border-line pt-5"><div className="flex flex-wrap gap-2">{project.technologies.map((tech) => <span key={tech} className="text-xs text-zinc-500">{tech}</span>)}</div><span className="mt-5 inline-flex items-center gap-1.5 text-sm text-zinc-300">Project overview <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span></div>
          </Card>
        ))}
      </div>
    </Container>
  </section>
);

export default Projects;
