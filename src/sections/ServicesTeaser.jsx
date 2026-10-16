import { Link } from "react-router-dom";
import { ArrowUpRight, Briefcase, Code2, Workflow } from "lucide-react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";
import { getLiveProducts, isService, formatInr } from "../data/products";

const icons = [Briefcase, Code2, Workflow];

const ServicesTeaser = () => {
  const services = getLiveProducts().filter(isService).slice(0, 3);
  if (!services.length) return null;

  return (
    <section id="services" className="border-b border-line py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle
            eyebrow="Services"
            title="Software services, delivered by the person who builds."
            subtitle="Beyond this portfolio: hire me directly for your next build. Purchase and kick off through the shop."
          />
          <Link
            to="/shop"
            className="mb-10 hidden shrink-0 items-center gap-1.5 text-sm text-zinc-300 transition-colors hover:text-white sm:mb-14 sm:inline-flex"
          >
            All services & pricing <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Link key={service.slug} to={`/shop/${service.slug}`} className="group">
                <Card className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-10 place-items-center rounded-lg border border-blue-400/20 bg-blue-500/10 text-blue-300">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-sm text-zinc-400">
                      <span className="block text-xs text-zinc-500">starting at</span>
                      <span className="font-semibold text-white">{formatInr(service.priceInr)}</span>
                    </span>
                  </div>
                  <h3 className="mt-6 font-medium text-white group-hover:text-blue-300">{service.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">{service.tagline}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm text-zinc-400 transition-colors group-hover:text-white">
                    View scope <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default ServicesTeaser;
