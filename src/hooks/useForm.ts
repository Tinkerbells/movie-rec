import { SyntheticEvent, useState } from "react";

interface UseFormParams<Values> {
  defaultValues: Values;
  onSubmit: (values: Values) => void;
  validate?: (values: Values) => { [Key in keyof Values]?: string } | void;
}

export const useForm = <Values>({
  defaultValues,
  onSubmit,
  validate,
}: UseFormParams<Values>) => {
  const [values, setValues] = useState<Values>(defaultValues);
  const [errors, setErrors] = useState<
    { [Key in keyof Values]?: string } | null
  >();

  const setFieldValue = <Field extends keyof Values>(
    field: Field,
    value: Values[Field]
  ) => {
    setValues({ ...values, [field]: value });
  };
  const handleSumbit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!validate) return onSubmit(values);
    const errors = validate(values);
    if (!!errors) {
      return setErrors({ ...errors, errors });
    }
    onSubmit(values);
  };

  return { values, errors, setFieldValue, handleSumbit };
};
