// Figma component `detail-column` (e.g. Year / Mediums / Class on a
// showcase): caption label over a body-lg value, centered. Three across from
// md, stacked on phones.
type Detail = { label: string; value: string };

export function DetailColumns({ items }: { items: Detail[] }) {
  return (
    <dl className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-2">
          <dt className="type-caption uppercase">{item.label}</dt>
          <dd className="type-body-lg">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
