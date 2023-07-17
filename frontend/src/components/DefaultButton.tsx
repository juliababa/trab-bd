type DefaultButtonTypes = {
  width: string;
  height: string;
  borderRadius: string;
  backgroundColor: string;
  hoverColor: string;
  label: string;
  action: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const ColorVariants = {
  blue: "bg-[#133E79]",
  red: "bg-[#EB4444]",
};

const ColorVariantsHover = {
  blue: "hover:bg-[#0c274d]",
  red: "hover:bg-[#9e2c2c]",
};

const DefaultButton = ({
  width,
  height,
  borderRadius,
  backgroundColor,
  hoverColor,
  label,
  action,
}: DefaultButtonTypes) => {
  return (
    <>
      <button
        className={`${width} ${height} rounded-${borderRadius} ${
          ColorVariants[backgroundColor as keyof typeof ColorVariants]
        } ${
          ColorVariantsHover[hoverColor as keyof typeof ColorVariantsHover]
        }  text-white`}
        onClick={action}
      >
        {label}
      </button>
    </>
  );
};
export default DefaultButton;
