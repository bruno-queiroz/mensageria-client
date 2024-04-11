export function Friend({ name }: { name: string }) {
  const changeCurrentChat = () => {};
  return (
    <div
      className="flex gap-4 p-4 rounded bg-blue-50 cursor-pointer hover:bg-blue-100"
      onClick={changeCurrentChat}
    >
      <div className="w-[60px] h-[60px] bg-blue-300 rounded-full">
        <img src="" alt="" />
      </div>
      <div className="flex flex-col">
        <span>{name}</span>
        <span>say hello</span>
      </div>
    </div>
  );
}
