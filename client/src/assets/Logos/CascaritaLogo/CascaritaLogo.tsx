import React from "react";
import { ReactComponent as LogoSvg } from "./cascarita_logo_white.svg";

export interface CascaritaLogoProps {
  size?: number;
  className?: string;
}

export const CascaritaLogo: React.FC<CascaritaLogoProps> = ({
  size = 40,
  className = "",
}) => {
  return <LogoSvg width={size} height={size} className={className} />;
};

export default CascaritaLogo;
