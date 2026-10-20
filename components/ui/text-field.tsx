import { cn } from "@/lib/utils";

// Figma primitive `text-box` (CLAUDE.md → Text fields).
// - Placeholder in text/placeholder; Field fill (surface/field-focus) while
//   focused; back to the default look once filled and blurred.
// - The label is visually hidden (the design shows placeholders only) but
//   still read by screen readers.
// - Error: border unchanged; message 8px below in label-sm, text/error,
//   linked with aria-describedby, field marked aria-invalid.

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  type?: "text" | "email";
  multiline?: boolean;
  autoComplete?: string;
  className?: string;
};

const fieldClasses =
  "w-full rounded-lg border border-text-primary bg-surface-base px-3 type-body-xl text-text-primary transition-colors placeholder:text-text-placeholder focus:bg-surface-field-focus";

export function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  multiline = false,
  autoComplete,
  className,
}: TextFieldProps) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name: id,
    value,
    placeholder: label,
    autoComplete,
    required: true,
    onBlur,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {multiline ? (
        <textarea
          {...shared}
          onChange={(e) => onChange(e.target.value)}
          className={cn(fieldClasses, "min-h-26 flex-1 resize-none py-2")}
        />
      ) : (
        <input {...shared} type={type} onChange={(e) => onChange(e.target.value)} className={cn(fieldClasses, "h-12")} />
      )}
      {error && (
        <p id={errorId} className="mt-2 type-label-sm text-text-error">
          {error}
        </p>
      )}
    </div>
  );
}
