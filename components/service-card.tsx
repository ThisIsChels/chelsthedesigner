// Figma component `service-card`: outlined card with number, title and
// one-line outcome, a 1px divider, then the deliverables. Fills its grid
// cell, so cards in a row are equal height.

type ServiceCardProps = {
  number: string;
  title: string;
  outcome: string;
  deliverables: readonly string[];
};

export function ServiceCard({ number, title, outcome, deliverables }: ServiceCardProps) {
  return (
    <article className="flex h-full flex-col gap-6 rounded-lg border border-text-primary bg-surface-base p-8">
      <div className="flex flex-col gap-2">
        <p className="type-label-md">{number}</p>
        <h3 className="type-heading-md-medium">{title}</h3>
        <p className="type-body-xl">{outcome}</p>
      </div>
      <hr className="border-text-primary" />
      <ul className="flex flex-col gap-2 type-body-lg">
        {deliverables.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
