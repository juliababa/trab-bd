type UserPictureTypes = {
  sizeTheme: string;
  userProfilePicture?: string;
};

const SizeVariants = {
  small: "w-[100px] h-[100px]",
  big: "w-[120px] h-[120px]",
};

const UserPicture = ({ sizeTheme, userProfilePicture }: UserPictureTypes) => {
  return (
    userProfilePicture && (
      <>
        <div
          className={`${
            SizeVariants[sizeTheme as keyof typeof SizeVariants]
          } flex items-center rounded-full overflow-hidden`}
        >
          <img
            src={userProfilePicture}
            alt="User Picture"
            className={`${
              SizeVariants[sizeTheme as keyof typeof SizeVariants]
            }`}
          ></img>
        </div>
      </>
    )
  );
};
export default UserPicture;
