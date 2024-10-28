import React, { memo, useEffect, useState } from "react";
import { DateInputProps } from "./types";
import FormInputWrapper from "../../FormInputWrapper";
import { useDebounce } from "../../../Utils/Hooks/useDebounce";
import { DateFieldString } from "../../../Abstracts/FormField/types";
import { DEBOUNCE_DELAY } from "../const";
import Intl from "../../../Intl/mock";

const DateInput: React.FC<DateInputProps> = ({ onChange, ...props }) => {
  const [value, setValue] = useState<DateFieldString>("");
  const debouncedValue = useDebounce(value, DEBOUNCE_DELAY);

  useEffect(() => {
    if (debouncedValue) {
      onChange(props.id, debouncedValue);
    }
  }, [props.id, debouncedValue, onChange]);

  return (
    <FormInputWrapper
      name={props.id}
      busy={props.busy}
      required={props.required}
      error={props.error}
    >
      <input
        type="date"
        name={props.id}
        disabled={props.disabled}
        required={props.required}
        placeholder={Intl.getLocalized(
          props.placeholder ?? "DATE_INPUT_PLACEHOLDER"
        )}
        min={props.min}
        max={props.max}
        value={value}
        onChange={(e) => setValue(e.target.value as DateFieldString)}
      />
    </FormInputWrapper>
  );
};

export default memo(DateInput);
