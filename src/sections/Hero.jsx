import { portfolio } from "../data/portfolio";
import Container from "../components/Container";
import Button from "../components/Button";
import SocialLinks from "../components/SocialLinks";
import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import headshot from "../assets/headshot.png";

const Hero = () => {
  return (
    <section id="home" className="relative isolate overflow-hidden border-b border-line">
      <div className="absolute inset-x-0 top-0 -z-10 h-[35rem] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.15),transparent_62%)]" />
      <Container className="py-20 sm:py-28 lg:py-36">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-positive/30 bg-positive/10 px-3 py-1.5 text-xs font-medium text-green-300"><span className="size-1.5 rounded-full bg-positive" /> {portfolio.availability}</div>
            <p className="mb-4 text-sm font-semibold tracking-[0.16em] text-blue-400 uppercase">Full-stack engineering</p>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">{portfolio.name}</h1>
            <p className="mt-5 text-xl font-medium text-zinc-200 sm:text-2xl">{portfolio.title}</p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">{portfolio.subtitle}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={portfolio.resume} download><Download className="size-4" /> Download Resume</Button>
              <Button href="#contact" variant="secondary">Get in touch <ArrowUpRight className="size-4" /></Button>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-zinc-500"><span className="inline-flex items-center gap-2"><MapPin className="size-4" /> {portfolio.location}</span><SocialLinks /></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.12 }} className="relative mx-auto w-full max-w-70 lg:max-w-none">
            <div className="aspect-square rounded-2xl border border-line bg-panel p-3 shadow-2xl shadow-black/30">
              <div className="relative grid size-full place-items-center overflow-hidden rounded-xl border border-white/[0.06] bg-[#101010]">
                <img src={headshot} alt={portfolio.name} className="size-full object-cover object-center" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(37,99,235,0.13)_100%)]" />
                <span className="absolute bottom-5 left-5 rounded-md border border-line bg-ink px-2.5 py-1.5 text-xs text-zinc-400">{portfolio.location}</span>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {portfolio.statistics.map((stat) => <div key={stat.label} className="bg-panel px-5 py-5 sm:px-6"><p className="text-2xl font-semibold tracking-tight text-white">{stat.value}</p><p className="mt-1 text-sm text-zinc-500">{stat.label}</p></div>)}
        </div>
        <a href="#about" className="mt-10 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white">Explore experience <ArrowDown className="size-4" /></a>
      </Container>
    </section>
  );
};

export default Hero;
