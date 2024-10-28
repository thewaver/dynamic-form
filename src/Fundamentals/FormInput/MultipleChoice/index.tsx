import React, { memo, useEffect, useState } from "react";
import FormInputWrapper from "../../FormInputWrapper";
import { MultipleChoiceInputProps } from "./types";
import Intl from "../../../Intl/mock";

const MultipleChoiceInput: React.FC<MultipleChoiceInputProps> = ({
  onChange,
  ...props
}) => {
  const [selected, setSelected] = useState(new Set<string>());

  useEffect(() => {
    onChange(props.id, new Array(selected).join(","));
  }, [props.id, selected, onChange]);

  return (
    <FormInputWrapper
      name={props.id}
      busy={props.busy}
      required={props.required}
      error={props.error}
    >
      <div className="multiple-choice-input-wrapper">
        {props.choices.map((choice) => (
          <input
            type="checkbox"
            key={choice.id}
            name={`${props.id}[]`}
            disabled={props.disabled}
            value={choice.value}
            checked={selected.has(choice.value)}
            onChange={(e) =>
              setSelected((prev) => {
                const value = e.target.value;
                const next = new Set(prev);

                if (!e.target.checked && next.has(value)) next.delete(value);
                else if (
                  e.target.checked &&
                  !next.has(value) &&
                  (!props.choiceLimit || next.size < props.choiceLimit)
                )
                  next.add(value);

                return next;
              })
            }
          >
            {Intl.getLocalized(choice.value)}
          </input>
        ))}
      </div>
    </FormInputWrapper>
  );
};

export default memo(MultipleChoiceInput);
