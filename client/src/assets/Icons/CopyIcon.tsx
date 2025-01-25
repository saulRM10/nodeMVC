import { SVGProps } from "react";

export default function CopyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 18 17"
      fill="none"
      {...props}>
      <rect
        x={1.43555}
        y={1.01953}
        width={12.6348}
        height={12.6348}
        rx={2.25}
        fill="white"
        stroke={props.color}
        strokeWidth={1.5}
      />
      <rect
        x={3.92969}
        y={3.51367}
        width={12.6348}
        height={12.6348}
        rx={2.25}
        fill="white"
        stroke={props.color}
        strokeWidth={1.5}
      />
    </svg>
  );
}
