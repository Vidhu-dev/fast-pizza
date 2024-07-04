/* eslint-disable react/prop-types */
function Input({
  type = 'text',
  label,
  name,
  value,
  placeholder,
  onChange,
  defaultValue,
  children,
  disabled,
}) {
  return (
    <>
      <label className="font-medium" htmlFor={name}>
        {label}
      </label>
      <div className="relative grid">
        <input
          className={`border border-black bg-amber-100 px-2 py-1 text-xs focus:border-0 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
          disabled={disabled}
          required
          {...(value !== undefined && { value })}
        />
        <div className="absolute right-0 top-[-.75px] z-10">{children}</div>
      </div>
    </>
  );
}

export default Input;
