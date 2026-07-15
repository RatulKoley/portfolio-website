import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { portfolio } from "../data/portfolio";

const socialLinks = [
  { key: "github", label: "GitHub", icon: FaGithub },
  { key: "linkedin", label: "LinkedIn", icon: FaLinkedinIn },
  { key: "email", label: "Email", icon: Mail },
];

const SocialLinks = ({ className = "" }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    {socialLinks.map(({ key, label, icon: Icon }) => {
      const value = portfolio[key];
      if (!value) return null;
      const href = key === "email" ? `mailto:${value}` : value;
      return (
        <a
          key={key}
          href={href}
          target={key === "email" ? undefined : "_blank"}
          rel={key === "email" ? undefined : "noreferrer"}
          aria-label={label}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-line text-zinc-400 transition-colors hover:border-zinc-500 hover:bg-white/[0.04] hover:text-white"
        >
          <Icon className="size-4" />
        </a>
      );
    })}
  </div>
);

export default SocialLinks;
