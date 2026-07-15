import { Code2, Layers3, UsersRound } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";
import { portfolio } from "../data/portfolio";

const icons = { users: UsersRound, architecture: Layers3, code: Code2 };

const About = () => (
  <section id="about" className="border-b border-line py-20 sm:py-28">
    <Container>
      <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
        <SectionTitle eyebrow="About" title="Technical depth, led with clarity." />
        <div>
          <p className="text-lg leading-8 text-zinc-300 sm:text-xl sm:leading-9">{portfolio.profile}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {portfolio.strengths.map((strength, index) => {
              const Icon = icons[strength.icon];
              return <motion.div key={strength.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.06 }}><Card className="h-full p-5"><Icon className="size-5 text-blue-400" /><h3 className="mt-6 font-medium text-white">{strength.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{strength.description}</p></Card></motion.div>;
            })}
          </div>
        </div>
      </div>
    </Container>
  </section>
);

export default About;
