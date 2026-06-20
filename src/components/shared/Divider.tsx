interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  spacing?: number;
}

export function Divider({
  orientation = "horizontal",
  className,
  spacing = 16,
}: DividerProps) {
  const style =
    orientation === "horizontal"
      ? { marginTop: `${spacing}px`, marginBottom: `${spacing}px` }
      : { marginLeft: `${spacing}px`, marginRight: `${spacing}px` };

  const classNameByOrientation = {
    horizontal: "w-full h-px",
    vertical: "self-stretch w-px",
  };

  return (
    <div
      role="separator"
      style={style}
      className={["bg-border", classNameByOrientation[orientation], className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
