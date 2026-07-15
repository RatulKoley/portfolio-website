import { GraduationCap } from "lucide-react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { portfolio } from "../data/portfolio";

const Education = () => (
  <section id="education" className="border-b border-line py-20 sm:py-28">
    <Container>
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24"><SectionTitle eyebrow="Education" title="A foundation in engineering and full-stack development." />
        <div className="space-y-4">
          {portfolio.education.map((item) => <article key={item.degree} className="flex gap-5 rounded-xl border border-line bg-panel p-5 sm:p-6"><GraduationCap className="mt-0.5 size-5 shrink-0 text-blue-400" /><div><p className="text-sm text-zinc-500">{item.period}</p><h3 className="mt-2 font-medium leading-6 text-white">{item.degree}</h3><p className="mt-2 text-sm text-zinc-400">{item.school}{item.detail ? ` · ${item.detail}` : ""}</p></div></article>)}
          <div className="mt-8 flex flex-col gap-2 text-sm text-zinc-500 sm:flex-row sm:gap-6"><span><strong className="font-medium text-zinc-300">Languages:</strong> {portfolio.languages.join(", ")}</span><span><strong className="font-medium text-zinc-300">Core competencies:</strong> {portfolio.competencies.join(", ")}</span></div>
        </div>
      </div>
    </Container>
  </section>
);

export default Education;
