import { ValidationResult } from './validator';
import { InputDescriptor } from './metadata/base';

type InputPropValueChecker = (
  inputValue: any,
  propValue: any,
  input: InputDescriptor,
) => ValidationResult;

interface InputPropChecker {
  name: string;
  validator: InputPropValueChecker;
}

export { InputPropValueChecker, InputPropChecker };
