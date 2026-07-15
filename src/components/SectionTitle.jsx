const SectionTitle = ({ title, eyebrow, subtitle }) => {
  return (
    <div className="mb-10 max-w-2xl sm:mb-14">
      {eyebrow && <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-blue-400 uppercase">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-7 text-zinc-400 sm:text-lg">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
