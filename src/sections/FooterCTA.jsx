import { ArrowUpRight } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import { portfolio } from "../data/portfolio";

const FooterCTA = () => (
  <section className="border-b border-line py-20 sm:py-28">
    <Container>
      <div className="rounded-2xl border border-blue-400/20 bg-blue-500/[0.07] px-6 py-12 text-center sm:px-12 sm:py-16">
        <p className="text-sm font-semibold tracking-[0.16em] text-blue-300 uppercase">Open to the right opportunity</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">Bring senior engineering focus to your next enterprise product.</h2>
        <p className="mx-auto mt-5 max-w-xl text-zinc-400">{portfolio.availability}</p>
        <Button href="#contact" className="mt-8">Start a conversation <ArrowUpRight className="size-4" /></Button>
      </div>
    </Container>
  </section>
);

export default FooterCTA;
