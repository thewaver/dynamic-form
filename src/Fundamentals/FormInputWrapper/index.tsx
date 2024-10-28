import React, { memo } from "react";
import { FormInputWrapperProps } from "./types";
import Intl from "../../Intl/mock";
import "./style.css";

const FormInputWrapper: React.FC<
  React.PropsWithChildren<FormInputWrapperProps>
> = (props) => {
  return (
    <label className="form-input-wrapper">
      <span className="form-input-label">
        {Intl.getLocalized(props.name)}
        {props.required ? (
          <span className="form-input-required">{"*"}</span>
        ) : null}
        {props.busy ? <span className="form-input-busy">{"⧖"}</span> : null}
      </span>
      {props.children}
      {props.error ? (
        <span className="form-input-error">
          {Intl.getLocalized(props.error)}
        </span>
      ) : null}
    </label>
  );
};

export default memo(FormInputWrapper);
