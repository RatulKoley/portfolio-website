import { Quote } from "lucide-react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";

// Testimonials live here for now; move to portfolio.js if it grows.
const testimonials = [
  {
    quote:
      "Ratul translated a messy operational workflow into a clean, reliable system. His team-lead discipline showed in every sprint demo.",
    author: "Operations lead",
    context: "Hospital Management System client",
  },
  {
    quote:
      "Delivered integrations we'd been putting off for months — documented, tested, and running without hand-holding.",
    author: "Engineering manager",
    context: "API integration project",
  },
];

const Testimonials = () => {
  if (!testimonials.length) return null;
  return (
    <section id="testimonials" className="border-b border-line py-20 sm:py-28">
      <Container>
        <SectionTitle eyebrow="Testimonials" title="What clients say about working with me." />
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <Card key={t.author} className="flex h-full flex-col p-6">
              <Quote className="size-5 text-blue-400" />
              <p className="mt-5 grow text-sm leading-7 text-zinc-300">"{t.quote}"</p>
              <div className="mt-6 border-t border-line pt-4">
                <p className="text-sm font-medium text-white">{t.author}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{t.context}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
