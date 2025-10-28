type UserMiniCardType = {
  icon: React.ReactNode;
  text: string;
  label: string;
};

function UserMiniCard({ icon, text, label }: UserMiniCardType) {
  return (
    <div className="flex gap-2 items-center justify-center">
      <div className="p-2 w-12 h-12 text-[#ff6933] text-2xl font-bold flex justify-center items-center bg-[#f0f0f0] rounded-lg">
        {icon}
      </div>
      <div>
        <span className="text-xs text-[#737373] font-semibold">{label}</span>
        <p className="text-sm font-bold">{text}</p>
      </div>
    </div>
  );
}

export default UserMiniCard;
