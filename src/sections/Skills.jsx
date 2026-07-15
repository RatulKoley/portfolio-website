import { Braces, Cloud, Database, FlaskConical, MonitorCog, Network, Server } from "lucide-react";
import Container from "../components/Container";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import { portfolio } from "../data/portfolio";

const icons = [Server, MonitorCog, Database, Cloud, Network, FlaskConical];

const Skills = () => (
  <section id="skills" className="border-b border-line py-20 sm:py-28">
    <Container>
      <SectionTitle eyebrow="Core skills" title="A pragmatic, end-to-end toolkit." subtitle="Tools and practices used to build secure, maintainable, high-performance applications." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {portfolio.skillGroups.map((group, index) => {
          const Icon = icons[index] || Braces;
          return <Card key={group.name} className="p-6"><Icon className="size-5 text-blue-400" /><h3 className="mt-5 font-medium text-white">{group.name}</h3><div className="mt-5 flex flex-wrap gap-2">{group.skills.map((skill) => <span key={skill} className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 text-xs text-zinc-400">{skill}</span>)}</div></Card>;
        })}
      </div>
    </Container>
  </section>
);

export default Skills;
