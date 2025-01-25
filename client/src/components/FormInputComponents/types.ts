import { Field } from "../../api/forms/types";

export interface FieldProps {
  field: Field;
  index: number;
  sqlFormId?: string;
}
