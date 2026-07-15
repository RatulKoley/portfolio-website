import { Check, CircleDot } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { portfolio } from "../data/portfolio";

const Experience = () => (
  <section id="experience" className="border-b border-line py-20 sm:py-28">
    <Container>
      <SectionTitle eyebrow="Experience" title="Engineering enterprise systems with measurable impact." subtitle="A focused track record of technical leadership, secure architecture, and delivery at scale." />
      <div className="space-y-8">
        {portfolio.experience.map((role) => (
          <motion.article key={role.company} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} className="relative border-l border-line pl-7 sm:pl-10">
            <CircleDot className="absolute -left-2.75 top-0 size-5 bg-ink text-blue-400" />
            <div className="flex flex-col gap-3 border-b border-line pb-7 sm:flex-row sm:items-start sm:justify-between">
              <div><h3 className="text-xl font-semibold tracking-tight text-white">{role.role}</h3><p className="mt-1 text-base text-zinc-400">{role.company}</p></div>
              <span className="w-fit rounded-md border border-line bg-panel px-3 py-1.5 text-sm text-zinc-400">{role.period}</span>
            </div>
            <ul className="mt-7 grid gap-4 lg:grid-cols-2">
              {role.responsibilities.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-400"><Check className="mt-1 size-3.5 shrink-0 text-blue-400" />{item}</li>)}
            </ul>
          </motion.article>
        ))}
      </div>
    </Container>
  </section>
);

export default Experience;
