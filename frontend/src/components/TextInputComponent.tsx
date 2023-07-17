type TextInputTypes = {
  type: string;
  label: string;
  width: string;
  height: string;
  border?: boolean;
  value: string | number;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const TextInputComponent = ({
  label,
  type,
  width,
  height,
  value,
  onChange,
  border = true,
  name,
}: TextInputTypes) => {
  return (
    <>
      <input
        type={type}
        className={`${width} ${height} ${
          border ? "border-2 border-gray-300 rounded-xl pl-4" : ""
        }`}
        name={name}
        placeholder={label}
        value={value}
        onChange={onChange}
      ></input>
    </>
  );
};
export default TextInputComponent;
