type PhotoInputTypes = {
  label: string;
  width: string;
  height: string;
  border?: boolean;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const PhotoInputComponent = ({
  label,
  width,
  height,
  border = true,
  name,
  onChange,
}: PhotoInputTypes) => {
  return (
    <>
      <label>{label}</label>
      <input
        name={name}
        onChange={onChange}
        type="file"
        className={`${width} ${height} ${
          border ? "border-2 border-gray-300 rounded-xl pl-4" : ""
        }`}
        accept="image/png, image/gif, image/jpeg"
      ></input>
    </>
  );
};
export default PhotoInputComponent;
