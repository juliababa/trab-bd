type InivisibelButtonTypes = {
  label: string;
  action: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const InivisibelButton = ({ label, action }: InivisibelButtonTypes) => {
  return (
    <>
      <button
        className={`w-fit h-12 font-medium py-3 text-xl hover:text-gray-400`}
        onClick={action}
      >
        {label}
      </button>
    </>
  );
};
export default InivisibelButton;
