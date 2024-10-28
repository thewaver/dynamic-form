import React, { memo, useEffect, useState } from "react";
import { TextInputProps } from "./types";
import FormInputWrapper from "../../FormInputWrapper";
import { useDebounce } from "../../../Utils/Hooks/useDebounce";
import { DEBOUNCE_DELAY } from "../const";
import Intl from "../../../Intl/mock";

const TextInput: React.FC<TextInputProps> = ({
  onChange,
  onBlur,
  onFocus,
  ...props
}) => {
  const [value, setValue] = useState<string>("");
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
        type="text"
        name={props.id}
        disabled={props.disabled}
        required={props.required}
        placeholder={Intl.getLocalized(
          props.placeholder ?? "TEXT_INPUT_PLACEHOLDER"
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => onBlur(props.id, e.target.value)}
        onFocus={(e) => onFocus(props.id)}
      />
    </FormInputWrapper>
  );
};

export default memo(TextInput);
