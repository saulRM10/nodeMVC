import { FieldType } from "../../api/forms/types";

export interface DroppedItem {
  id: string;
  type: FieldType;
}

export interface DNDCanvasRef {
  submitForm: () => void;
}
