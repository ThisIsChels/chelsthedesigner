// Figma component `process-step`: a 2px Charcoal line, then the step number
// (heading-md-semibold, Watercourse), title and description, sm (12) apart.
// Like DividerItem, but with a heavier line and a number.

type ProcessStepProps = {
  number: number;
  title: string;
  description: string;
};

export function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <li className="flex flex-col gap-3 border-t-2 border-text-primary pt-3">
      <p className="type-heading-md-semibold text-accent-primary" aria-hidden>
        {number}
      </p>
      <h3 className="type-heading-sm">
        <span className="sr-only">Step {number}: </span>
        {title}
      </h3>
      <p className="type-body-lg">{description}</p>
    </li>
  );
}
