import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
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
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="#contact">Start a conversation <ArrowUpRight className="size-4" /></Button>
          <Link to="/shop" className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-zinc-500 hover:bg-white/[0.06] motion-safe:hover:-translate-y-0.5">
            Visit the shop <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </Container>
  </section>
);

export default FooterCTA;
