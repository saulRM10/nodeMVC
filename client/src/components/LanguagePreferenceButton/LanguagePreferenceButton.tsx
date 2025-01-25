import { TfiWorld } from "react-icons/tfi";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import { useState } from "react";

const LanguagePreferenceButton = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleIconClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelect = () => {
    setShowDropdown(false);
  };

  return (
    <div>
      <TfiWorld onClick={handleIconClick} style={{ cursor: "pointer" }} />
      {showDropdown && <LanguageDropdown handleSelect={handleSelect} />}
    </div>
  );
};

export default LanguagePreferenceButton;
