import { ErrorType } from "@/components/modules/auth/types/authtypes";

const formErrorFields = ['email', 'password', 'confirm', 'mobile'];


export const dynamicFormStyleHandler = (errors: ErrorType, submit: boolean) => {
  const formErrorStyles: Record<string, object> = {};
  const formMessageStyles: Record<string, object> = {};

  formErrorFields.forEach((field) => {
    formErrorStyles[`${field}ValidationStyle`] = {
      '--validationColor': errors[field + 'Error'] ? 'rgb(223, 68, 37)' : 'rgb(61, 120, 3)',
    };

    formMessageStyles[`${field}MessageStyle`] = {
      '--opacity': submit && errors[field + 'Error'] ? 1 : 0,
      '--pointer': submit && errors[field + 'Error'] ? 'all' : 'none',
    };
  });

  return { ...formErrorStyles, ...formMessageStyles };
};