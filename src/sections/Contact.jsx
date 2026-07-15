import { Download, Mail, MapPin, Phone } from "lucide-react";
import Container from "../components/Container";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import SocialLinks from "../components/SocialLinks";
import Button from "../components/Button";
import { portfolio } from "../data/portfolio";

const contactItems = [
  { label: "Email", value: "email", icon: Mail, prefix: "mailto:" },
  { label: "Phone", value: "phone", icon: Phone, prefix: "tel:" },
  { label: "Location", value: "location", icon: MapPin },
];

const Contact = () => (
  <section id="contact" className="py-20 sm:py-28">
    <Container>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"><div><SectionTitle eyebrow="Contact" title="Let’s build what matters." subtitle="For leadership, full-stack engineering, or enterprise software opportunities." /><SocialLinks /></div>
        <Card hover={false} className="p-6 sm:p-8"><div className="space-y-6">{contactItems.map(({ label, value, icon: Icon, prefix }) => { const content = portfolio[value]; return <div key={label} className="flex gap-4"><span className="grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.03] text-blue-400"><Icon className="size-4" /></span><div><p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">{label}</p>{prefix ? <a href={`${prefix}${content}`} className="mt-1 inline-block text-sm text-zinc-200 hover:text-blue-300">{content}</a> : <p className="mt-1 text-sm text-zinc-200">{content}</p>}</div></div>; })}</div><div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6"><Button href={`mailto:${portfolio.email}`}><Mail className="size-4" /> Email Ratul</Button><Button href={portfolio.resume} download variant="secondary"><Download className="size-4" /> Download Resume</Button></div></Card>
      </div>
    </Container>
  </section>
);

export default Contact;
