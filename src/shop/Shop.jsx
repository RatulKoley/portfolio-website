import { useState } from "react";
import { useSeo, personJsonLd } from "../seo/useSeo";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getLiveProducts, buyingSteps, isService } from "../data/products";
import ProductCard from "./ProductCard";
import HowItWorks from "./HowItWorks";

const filters = [
  { key: "all", label: "All" },
  { key: "source-code", label: "Source code" },
  { key: "app", label: "Ready apps" },
  { key: "service", label: "Services" },
];

const Shop = () => {
  useSeo({
    title: "Shop — Source Code, Apps & Dev Services",
    description:
      "Buy production-tested source code, ready apps and end-to-end software services directly from Ratul Koley. Razorpay, UPI and bank transfer accepted.",
    path: "/shop",
    jsonLd: personJsonLd(),
  });
  const [filter, setFilter] = useState("all");
  const all = getLiveProducts();
  const visible = all.filter((p) => filter === "all" || p.type === filter);
  const assets = visible.filter((p) => !isService(p));
  const services = visible.filter((p) => isService(p));

  return (
    <div className="min-h-screen bg-ink text-white">
      <Navbar variant="shop" />
      <main>
        <section className="border-b border-line">
          <Container className="py-16 sm:py-20">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">Shop</p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Digital assets & software services, straight from the developer.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
              Source code from production systems, ready-made apps and end-to-end development services.
              Every purchase goes to the engineer who actually built the thing.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  aria-pressed={filter === f.key}
                  className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
                    filter === f.key
                      ? "border-brand bg-brand text-white"
                      : "border-line bg-white/[0.03] text-zinc-300 hover:border-zinc-500 hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-b border-line py-14 sm:py-16">
          <Container>
            <HowItWorks items={buyingSteps} />
          </Container>
        </section>

        <section className="border-b border-line py-16 sm:py-20">
          <Container>
            {assets.length > 0 && (
              <>
                <SectionTitle eyebrow="Digital assets" title="Code and apps you can ship with today." />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {assets.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </div>
              </>
            )}

            {services.length > 0 && (
              <div className={assets.length > 0 ? "mt-16" : undefined}>
                <SectionTitle eyebrow="Services" title="Hire me directly — scoped, delivered, supported." />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {services.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </div>
              </div>
            )}

            {visible.length === 0 && (
              <p className="py-16 text-center text-zinc-500">Nothing in this category yet — check back soon.</p>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
