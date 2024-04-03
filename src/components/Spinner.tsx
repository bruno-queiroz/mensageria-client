interface SpinnerProps {
  color?: string;
  wh: number;
}

export const Spinner = ({ color = "black", wh }: SpinnerProps) => {
  return (
    <div
      style={{
        borderColor: color,
        borderTopColor: "transparent",
        width: wh,
        height: wh,
      }}
      className="border-[5px] mx-auto border-t-[5px] rounded-full animate-spin"
    />
  );
};
