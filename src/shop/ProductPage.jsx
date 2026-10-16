import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Package, ShieldCheck } from "lucide-react";
import { useSeo, personJsonLd } from "../seo/useSeo";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProductBySlug, productTypes, isService } from "../data/products";
import PaymentTabs from "./PaymentTabs";
import { NotFound } from "../router-bits";

const ProductPage = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  useSeo({
    title: product ? product.name : "Product not found",
    description: product ? product.tagline : undefined,
    path: product ? `/shop/${product.slug}` : "/shop",
    jsonLd: product
      ? [
          personJsonLd(),
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.tagline,
            category: product.type,
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: product.priceInr,
              availability: "https://schema.org/InStock",
              url: `https://ratulkoley.dpdns.org/shop/${product.slug}`,
            },
          },
        ]
      : undefined,
  });

  if (!product) {
    return (
      <div className="min-h-screen bg-ink text-white">
        <Navbar variant="shop" />
        <NotFound />
      </div>
    );
  }

  const type = productTypes[product.type];
  const isSvc = isService(product);

  return (
    <div className="min-h-screen bg-ink text-white">
      <Navbar variant="shop" />
      <main>
        <section className="border-b border-line">
          <Container className="py-12 sm:py-16">
            <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white">
              <ArrowLeft className="size-4" /> Back to shop
            </Link>

            <div className="mt-8 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
              {/* Left: overview */}
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${type.chip}`}>{type.label}</span>
                  {product.demoUrl && (
                    <a
                      href={product.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300"
                    >
                      Live demo <ArrowUpRight className="size-4" />
                    </a>
                  )}
                </div>

                <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{product.name}</h1>
                <p className="mt-4 text-lg leading-8 text-zinc-400">{product.description}</p>

                <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
                  {isSvc ? "What's included" : "Features"}
                </h2>
                <ul className="mt-5 space-y-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6 text-zinc-300">
                      <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">Tech stack</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.techStack.map((tech) => (
                    <span key={tech} className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 text-xs text-zinc-400">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-line bg-panel p-5">
                    <ShieldCheck className="size-5 text-blue-400" />
                    <h3 className="mt-3 font-medium text-white">License</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{product.license}</p>
                  </div>
                  <div className="rounded-xl border border-line bg-panel p-5">
                    <Package className="size-5 text-blue-400" />
                    <h3 className="mt-3 font-medium text-white">Delivery</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{product.delivery}</p>
                  </div>
                </div>
              </div>

              {/* Right: buy panel */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <PaymentTabs product={product} />
                <p className="mt-4 text-center text-xs text-zinc-600">
                  Prices in INR. For international payments, reach out at the support email below.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
