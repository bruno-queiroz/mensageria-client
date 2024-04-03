interface SpinnerProps {
  color?: string;
  w: number;
  h: number;
}

export const Spinner = ({ color = "black", w, h }: SpinnerProps) => {
  return (
    <div
      style={{
        borderColor: color,
        borderTopColor: "transparent",
        width: w,
        height: h,
      }}
      className="border-[5px] mx-auto border-t-[5px] rounded-full animate-spin"
    />
  );
};
