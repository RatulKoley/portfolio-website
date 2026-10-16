const HowItWorks = ({ items }) => {
  if (!items?.length) return null;
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
      {items.map((step, i) => (
        <div key={step.title} className="bg-panel px-5 py-6 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.16em] text-blue-400 uppercase">Step {i + 1}</p>
          <h3 className="mt-2 font-medium text-white">{step.title}</h3>
          <p className="mt-1.5 text-sm leading-6 text-zinc-500">{step.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HowItWorks;
