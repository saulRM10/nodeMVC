import { SVGProps } from "react";

export default function MinusCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M11.92 22C17.42 22 21.92 17.5 21.92 12C21.92 6.5 17.42 2 11.92 2C6.41998 2 1.91998 6.5 1.91998 12C1.91998 17.5 6.41998 22 11.92 22Z"
        stroke={props.color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.91998 12H15.92"
        stroke={props.color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
