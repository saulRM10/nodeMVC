import { Control } from "react-hook-form";
import { Field, Validation } from "../DNDCanvas/types";

export interface DraggablePhoneNumberProps {
  id: string;
  index: number;
  title: string;
  validations: Validation | undefined;
  control: Control<{ fields: Field[] }>;
  onDelete: () => void;
  onCopy: () => void;
}
