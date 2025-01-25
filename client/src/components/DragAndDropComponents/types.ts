import { Field } from "../../api/forms/types";

export interface DraggableProps {
  index: number;
  formField: Field;
  onDelete: () => void;
  onCopy: () => void;
}
