import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Intl from "../../Intl/mock";
import { DynamicFormApi } from "../../Api/DynamicForm";
import { FormConfig } from "../../Abstracts/FormConfig/types";
import { DynamicFormProps } from "./types";
import DateInput from "../FormInput/DateInput";
import TextInput from "../FormInput/TextInput";
import MultipleChoiceInput from "../FormInput/MultipleChoice";
import SingleChoiceInput from "../FormInput/SingleChoice";
import { mapApiErrors } from "../../Api/Error/utils";
import {
  ERROR_CONTEXT_SPLIT_CHAR,
  GLOBAL_ERROR_KEY,
} from "../../Api/Error/const";
import "./style.css";

const DynamicForm: React.FC<DynamicFormProps> = (props) => {
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);
  const [configLoading, setConfigLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [validatingIds, setValidatingIds] = useState<Set<string>>(new Set());
  const [data, setData] = useState<Record<string, string>>({});
  const [dataErrors, setDataErrors] = useState<
    Record<string, string | undefined>
  >({});

  useEffect(() => {
    let isMounted = true;

    const fetchConfig = async () => {
      try {
        setData({});
        setConfigError(null);
        setConfigLoading(true);

        const result = await DynamicFormApi.getConfig(props.formKey);

        if (isMounted) setConfig(result);
      } catch (e) {
        if (isMounted) setConfigError(e as string);
      } finally {
        if (isMounted) setConfigLoading(false);
      }
    };

    fetchConfig();

    return () => {
      isMounted = false;
    };
  }, [props.formKey]);

  const hasErrors = useMemo(
    () => Object.values(dataErrors).some((e) => !!e),
    [dataErrors]
  );

  const hasEmptyFields = useMemo(
    () =>
      Object.values(config ?? {}).some(
        (value) => value.required && !data[value.id]
      ),
    [config, data]
  );

  const handleChange = useCallback((id: string, value: string) => {
    setData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleFocus = useCallback((id: string) => {
    setDataErrors((prev) => ({ ...prev, [id]: undefined }));
  }, []);

  const handleBlur = useCallback(
    async (id: string, value: string) => {
      try {
        setValidatingIds((prev) => new Set(prev).add(id));

        await DynamicFormApi.validateField(props.formKey, id, value);

        setDataErrors((prev) => ({ ...prev, [id]: undefined }));
      } catch (e) {
        setDataErrors((prev) => ({ ...prev, [id]: e as string }));
      } finally {
        setValidatingIds((prev) => {
          const next = new Set(prev);

          next.delete(id);

          return next;
        });
      }
    },
    [props.formKey]
  );

  if (!config)
    return (
      <span className="server-configured-form-state">
        {configError
          ? `⚠ ${Intl.getLocalized(configError)}`
          : configLoading
          ? `⧖ ${Intl.getLocalized("LOADING_FORM_CONFIG")}`
          : `${Intl.getLocalized("NOT_FETCHED_CONFIG")}`}
      </span>
    );

  return (
    <form
      onSubmit={async () => {
        try {
          setSubmitting(true);

          await DynamicFormApi.submit(props.formKey, data);
        } catch (e) {
          const errors = mapApiErrors(e as string);
          const globalErrors = Object.entries(errors)
            .filter(([key, value]) => key.startsWith(GLOBAL_ERROR_KEY))
            .map(([key, value]) => value);

          setDataErrors(errors);

          if (globalErrors.length) {
            alert(globalErrors.join("\n"));
          }
        } finally {
          setSubmitting(false);
        }
      }}
      noValidate
    >
      <fieldset className="server-configured-form">
        {Object.entries(config).map(([key, field]) => {
          const error = dataErrors[key];
          const commonConfig = {
            error: error
              ? error.substring(error.indexOf(ERROR_CONTEXT_SPLIT_CHAR) + 1)
              : undefined,
            disabled: validatingIds.has(key),
            busy: validatingIds.has(key),
            onChange: handleChange,
          };

          const focusConfig = {
            onFocus: handleFocus,
            onBlur: handleBlur,
          };

          switch (field.type) {
            case "date":
              return <DateInput key={key} {...field} {...commonConfig} />;

            case "multi-choice":
              return (
                <MultipleChoiceInput key={key} {...field} {...commonConfig} />
              );

            case "single-choice":
              return (
                <SingleChoiceInput key={key} {...field} {...commonConfig} />
              );

            case "text":
              return (
                <TextInput
                  key={key}
                  {...field}
                  {...commonConfig}
                  {...focusConfig}
                />
              );

            default:
              return null;
          }
        })}

        <button
          type="submit"
          disabled={
            submitting || hasErrors || hasEmptyFields || validatingIds.size > 0
          }
        >
          {Intl.getLocalized("SUBMIT")}
        </button>
      </fieldset>
    </form>
  );
};

export default memo(DynamicForm);
