import { ValidationError } from "class-validator";

export const getValidationErrors = (
  errors: Array<ValidationError>
): Array<string> => {
  const arrayOfErrors: Array<string> | [unknown] = [];

  for (let error of errors) {
    const { constraints } = error;
    for (let issue in constraints) arrayOfErrors.push(constraints[issue]);
  }

  return arrayOfErrors;
};
