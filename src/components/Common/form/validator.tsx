import { message } from 'antd';

export interface formValueType {
  [K: string]: string | string[];
}
export interface ruleType {
  key: string;
  required?: boolean;
  message: string;
  name?: string;
}

export interface FormErrors {
  [K: string]: Array<string>;
}

const isEmpty = (value: any) => {
  if (value instanceof Array) {
    return value.length === 0;
  }
  return value === undefined || value === null || value === '';
};

const validator = (
  formValue: formValueType,
  rules: Array<ruleType>,
): FormErrors => {
  // const rules1: FormRules = [{ key: 'questNum' }];
  let errors: FormErrors = {};
  const addErrors = (key: string, message: string) => {
    if (isEmpty(errors[key])) {
      errors[key] = [];
    }
    errors[key].push(message);
  };
  rules.map(rule => {
    const value = formValue[rule.key];
    if (rule.required) {
      if (isEmpty(value)) {
        addErrors(rule.key, rule.message);
      }
    }
  });

  return errors;
};

const showErrorsMessage = (errors: FormErrors) => {
  const keyErrors = Object.keys(errors);
  if (keyErrors.length > 0) {
    keyErrors.map(item => {
      message.error(errors[item]);
    });
  }
};
export default validator;
export { validator, showErrorsMessage };
