import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import {
  DragDropContext,
  Droppable,
  DropResult,
  DroppableProvided,
} from "react-beautiful-dnd";
import DraggableMultipleChoice from "../DraggableMultipleChoice/DraggableMultipleChoice";
import DraggableShortText from "../DraggableShortText/DraggableShortText";
import DraggableDropdown from "../DraggableDropdown/DraggableDropdown";
import DraggableLongText from "../DraggableLongText/DraggableLongText";
import { DNDCanvasProps, Field, Survey } from "./types";
import { DroppedItem } from "../../pages/NewForm/types";
import EmptyDNDCanvas from "../EmptyDNDCanvas/EmptyDNDCanvas";
import { v4 as uuidv4 } from "uuid";

const DNDCanvas = forwardRef(
  ({ items, handleDelete, handleCopy, saveSurvey }: DNDCanvasProps, ref) => {
    const methods = useForm<{ fields: Field[] }>();

    useImperativeHandle(ref, () => ({
      submitForm: () => {
        methods.handleSubmit(onSubmit)();
      },
    }));

    const componentMap = {
      multiple_choice: DraggableMultipleChoice,
      short_text: DraggableShortText,
      dropdown: DraggableDropdown,
      long_text: DraggableLongText,
    };

    const appendField = (item: DroppedItem) => {
      switch (item.type) {
        case "multiple_choice":
          append({
            ref: item.id,
            type: item.type,
            title: "",
            properties: { choices: [] },
          });
          break;
        case "short_text":
          append({
            ref: item.id,
            type: item.type,
            title: "",
            validations: {
              max_length: 20,
              required: false,
            },
          });
          break;
        case "dropdown":
          append({
            ref: item.id,
            type: item.type,
            title: "",
            properties: { choices: [] },
          });
          break;
        case "long_text":
          append({
            ref: item.id,
            type: item.type,
            title: "",
            validations: {
              max_length: 100,
              required: false,
            },
          });
          break;
        default:
          break;
      }
    };

    const { control, handleSubmit } = methods;

    const { fields, append, move, remove, insert } = useFieldArray({
      control,
      name: "fields", // This should match the structure in useForm
    });

    useEffect(() => {
      if (items.length > 0) {
        items.forEach((item) => {
          if (!fields.some((field) => field.ref === item.id)) {
            appendField(item);
          }
        });
      }
    }, [items]);

    useEffect(() => {
      console.log(fields);
    }, [fields]);

    const onDragEnd = (result: DropResult) => {
      if (!result.destination) return;
      move(result.source.index, result.destination.index);
    };

    const onDelete = (index: number, name: string) => {
      remove(index);
      handleDelete(name);
    };

    const onCopy = (field: Field, index: number) => {
      const newRef = uuidv4();
      const { id, ...copiedFieldWithoutId } = field; // eslint-disable-line @typescript-eslint/no-unused-vars
      insert(index + 1, { ...copiedFieldWithoutId, ref: newRef });
      handleCopy(index, {
        id: newRef,
        type: field.type,
      });

      // Ensure the copied field has the same title as the original
      methods.setValue(
        `fields.${index + 1}.title`,
        methods.getValues(`fields.${index}.title`),
      );
    };

    const onSubmit = (data: Survey) => {
      saveSurvey(data);
    };

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="canvas">
              {(provided: DroppableProvided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  // onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  style={{
                    padding: "16px",
                    background: "white",
                    minHeight: "400px",
                  }}>
                  {items.length === 0 ? (
                    <EmptyDNDCanvas />
                  ) : (
                    fields.map((field: Field, index: number) => {
                      const Component = componentMap[field.type];
                      if (!Component) return null;

                      return (
                        <Component
                          key={field.ref}
                          id={field.ref}
                          index={index}
                          title={field.title}
                          control={control}
                          onDelete={() => onDelete(index, field.ref)}
                          onCopy={() => onCopy(field, index)}
                        />
                      );
                    })
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </form>
      </FormProvider>
    );
  },
);

DNDCanvas.displayName = "DNDCanvas";

export default DNDCanvas;
