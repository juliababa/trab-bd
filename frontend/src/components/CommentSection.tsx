type CommentSectionType = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const CommentSection = ({ value, onChange }: CommentSectionType) => {
  return (
    <>
      <textarea
        rows={7}
        cols={117}
        placeholder="Escreva um comentário..."
        className="border-2 border-gray-300 rounded-xl p-4"
        value={value}
        onChange={onChange}
      ></textarea>
    </>
  );
};
export default CommentSection;
