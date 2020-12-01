import { userConfigDataItem } from '@/models/questionnaireTemplate';
import { message } from 'antd';

export interface userConfigPopupFormRule {
  key:
    | 'questNum'
    | 'area'
    | 'questId'
    | 'general'
    | 'vanguard'
    | 'channel'
    | 'frontline'
    | 'id'
    | 'name';
  maxLength?: number;
  required?: boolean;
  message: string;
}

interface FormErrors {
  [K: string]: Array<string>;
}

const isEmpty = (value: any) => {
  if (value instanceof Array) {
    return value.length === 0;
  }
  return value === undefined || value === null || value === '';
};

const validatorQuestionTemplatePopup = (
  formValue: userConfigDataItem,
  rules: Array<userConfigPopupFormRule>,
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

const showErrors = (errors: FormErrors) => {
  const keyErrors = Object.keys(errors);
  if (keyErrors.length > 0) {
    keyErrors.map(item => {
      message.error(errors[item]);
    });
  }
};
export default validatorQuestionTemplatePopup;
export { validatorQuestionTemplatePopup, showErrors };
