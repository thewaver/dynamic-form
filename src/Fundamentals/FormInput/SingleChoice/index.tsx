import React, { memo } from "react";
import FormInputWrapper from "../../FormInputWrapper";
import { SingleChoiceInputProps } from "./types";
import Intl from "../../../Intl/mock";

const SingleChoiceInput: React.FC<SingleChoiceInputProps> = ({
  onChange,
  ...props
}) => {
  return (
    <FormInputWrapper
      name={props.id}
      busy={props.busy}
      required={props.required}
      error={props.error}
    >
      <select
        name={props.id}
        disabled={props.disabled}
        required={props.required}
        defaultValue="SELECT_PLACEHOLDER"
        onChange={(e) => onChange(props.id, e.target.value)}
      >
        <option value="SELECT_PLACEHOLDER" disabled hidden>
          {Intl.getLocalized(props.placeholder ?? "SELECT_PLACEHOLDER")}
        </option>
        {props.choices.map((choice) => (
          <option key={choice.id} value={choice.value}>
            {Intl.getLocalized(choice.value)}
          </option>
        ))}
      </select>
    </FormInputWrapper>
  );
};

export default memo(SingleChoiceInput);
