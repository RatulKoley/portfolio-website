import { ArrowUpRight } from "lucide-react";
import { portfolio } from "../data/portfolio";
import Container from "./Container";
import SocialLinks from "./SocialLinks";

const Footer = () => (
  <footer className="border-t border-line">
    <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-white">© {new Date().getFullYear()} {portfolio.name}</p>
        <p className="mt-1 text-sm text-zinc-500">Full Stack Developer & Team Lead</p>
      </div>
      <div className="flex items-center gap-3">
        <SocialLinks />
        <a href="#home" className="inline-flex size-10 items-center justify-center rounded-lg border border-line text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white" aria-label="Back to top">
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    </Container>
  </footer>
);

export default Footer;
