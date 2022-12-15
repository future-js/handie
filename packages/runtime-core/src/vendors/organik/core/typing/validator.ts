import type { Result } from './feedback';

type ValidationResultType = 'required' | 'data-type' | 'custom';

interface ValidationResult extends Result {
  type?: ValidationResultType;
}

type ValueChecker = (value: any, ctx: any) => ValidationResult;

interface Validator {
  addChecker: (checker: ValueChecker) => void;
  validate: ValueChecker;
}

export type { ValidationResult, ValueChecker, Validator };
