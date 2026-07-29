const inputClass =
  "w-full rounded-lg border border-line-300 bg-white px-3 py-2.5 text-sm text-ink-900 outline-none focus:border-forest-700";
const labelClass = "mb-1.5 block text-xs font-bold text-forest-900";

export function TextField({
  name,
  label,
  defaultValue,
  required,
  placeholder,
  dir,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  required?: boolean;
  placeholder?: string;
  dir?: "rtl" | "ltr";
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        defaultValue={defaultValue ?? ""}
        required={required}
        placeholder={placeholder}
        dir={dir}
        className={inputClass}
      />
    </div>
  );
}

export function NumberField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: number | null;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input id={name} name={name} type="number" defaultValue={defaultValue ?? 0} className={inputClass} />
    </div>
  );
}

export function TextAreaField({
  name,
  label,
  defaultValue,
  rows = 4,
  required,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue ?? ""}
        rows={rows}
        required={required}
        className={inputClass}
      />
    </div>
  );
}

/** فهرست خطوط جدا با Enter؛ برای فیلدهای آرایه‌ای مثل کاربردها، بازارهای هدف، پاراگراف‌های مقاله. */
export function LinesField({
  name,
  label,
  defaultValue,
  rows = 4,
  hint,
}: {
  name: string;
  label: string;
  defaultValue?: string[] | null;
  rows?: number;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={(defaultValue ?? []).join("\n")}
        rows={rows}
        className={inputClass}
      />
      <p className="mt-1 text-[11px] text-ink-500">{hint ?? "هر مورد را در یک خط جدا بنویسید."}</p>
    </div>
  );
}

export function SelectField({
  name,
  label,
  defaultValue,
  options,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <select id={name} name={name} defaultValue={defaultValue} className={inputClass}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CheckboxField({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-forest-900">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-line-300"
      />
      {label}
    </label>
  );
}

export function FileField({
  name,
  label,
  multiple,
  currentUrl,
}: {
  name: string;
  label: string;
  multiple?: boolean;
  currentUrl?: string | null;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      {currentUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={currentUrl} alt="" className="mb-2 h-24 w-24 rounded-lg border border-line-300 object-cover" />
      ) : null}
      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="block w-full text-xs text-ink-700 file:ml-3 file:rounded-lg file:border-0 file:bg-forest-900 file:px-3 file:py-2 file:text-xs file:font-bold file:text-cream-50"
      />
      <p className="mt-1 text-[11px] text-ink-500">در صورت خالی گذاشتن، تصویر فعلی حفظ می‌شود.</p>
    </div>
  );
}
