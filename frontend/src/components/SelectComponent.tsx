export type OptionType = {
  name: string;
  value: string | number;
};

type SelectTypes = {
  options: Array<OptionType>;
  label: string;
  width: string;
  height: string;
  value: string | number;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
const SelectComponent = ({
  options,
  name,
  label,
  width,
  height,
  onChange,
  value,
}: SelectTypes) => {
  return (
    <>
      <select
        name={name}
        id={label}
        className={`${width} ${height} border-2 border-gray-300 rounded-xl pl-4`}
        onChange={onChange}
        value={value}
      >
        <option value={""} disabled selected>
          {label}
        </option>
        {options.map(({ name, value }) => (
          <option value={value}>{name}</option>
        ))}
      </select>
    </>
  );
};
export default SelectComponent;
