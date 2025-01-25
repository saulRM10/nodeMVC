import { SVGProps } from "react";

export default function EllipseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.width}
      viewBox="0 0 15 15"
      fill="none"
      {...props}>
      <circle cx={7.5} cy={7.5} r={7} fill={props.fill} stroke={props.color} />
    </svg>
  );
}
