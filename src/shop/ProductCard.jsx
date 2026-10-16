import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { formatInr, productTypes, isService } from "../data/products";

const ProductCard = ({ product }) => {
  const type = productTypes[product.type];
  const chips = product.techStack.slice(0, 3);
  const isSvc = isService(product);

  return (
    <Link
      to={`/shop/${product.slug}`}
      className="group flex h-full flex-col rounded-xl border border-line bg-panel p-6 transition-colors hover:border-zinc-600"
    >
      <div className="flex items-start justify-between gap-4">
        <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${type.chip}`}>{type.label}</span>
        {isSvc ? (
          <span className="text-right text-sm text-zinc-400">
            <span className="block text-xs text-zinc-500">starting at</span>
            <span className="font-semibold text-white">{formatInr(product.priceInr)}</span>
          </span>
        ) : (
          <span className="text-right">
            {product.compareAt && (
              <span className="block text-xs text-zinc-500 line-through">{formatInr(product.compareAt)}</span>
            )}
            <span className="text-sm font-semibold text-white">{formatInr(product.priceInr)}</span>
          </span>
        )}
      </div>

      <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">{product.name}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{product.tagline}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {chips.map((tech) => (
          <span key={tech} className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 text-xs text-zinc-500">
            {tech}
          </span>
        ))}
      </div>

      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-blue-400">
        {isSvc ? "View scope" : "Buy & download"}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
};

export default ProductCard;
