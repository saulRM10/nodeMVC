import { SVGProps } from "react";

export default function TrashBinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 19 17"
      fill="none"
      {...props}>
      <path
        d="M14.1568 15.9656H5.42683C5.09607 15.9656 4.77885 15.8342 4.54497 15.6003C4.31108 15.3664 4.17969 15.0492 4.17969 14.7184V3.49414H15.404V14.7184C15.404 15.0492 15.2726 15.3664 15.0387 15.6003C14.8048 15.8342 14.4876 15.9656 14.1568 15.9656Z"
        stroke={props.color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.92383 12.2269V7.23828"
        stroke={props.color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6641 12.2269V7.23828"
        stroke={props.color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.68555 3.49414H17.8984"
        stroke={props.color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6624 1H7.92097C7.59021 1 7.27299 1.1314 7.03911 1.36528C6.80522 1.59916 6.67383 1.91638 6.67383 2.24714V3.49429H12.9095V2.24714C12.9095 1.91638 12.7781 1.59916 12.5443 1.36528C12.3104 1.1314 11.9932 1 11.6624 1Z"
        stroke={props.color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
