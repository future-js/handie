import { isString, isArray, isPlainObject, hasOwnProp, clone } from '@ntks/toolbox';

import {
  DataValue,
  DataType,
  ValidationResult,
  ValueChecker,
  Validator,
  InputPropValueChecker,
  InputPropChecker,
  InputDescriptor,
} from './typing';
import { getDataType, isDataTypeValid, isDataValueValid } from './data-type';
import { runExpression } from './context/view/base';

const propCheckerMap = new Map<DataType, InputPropChecker[]>();

function registerInputPropCheckers(dataType: DataType, checkers: InputPropChecker[]): void {
  propCheckerMap.set(dataType, checkers);
}

function resolveInput(refOrDescriptor: string | InputDescriptor): InputDescriptor {
  return isString(refOrDescriptor)
    ? { name: refOrDescriptor as string }
    : (refOrDescriptor as InputDescriptor);
}

function getDefaultValue(descriptor: InputDescriptor): DataValue {
  if (hasOwnProp('defaultValue', descriptor)) {
    return descriptor.defaultValue;
  }

  const { dataType } = descriptor;

  if (!dataType) {
    return '';
  }

  return isDataTypeValid(dataType) ? getDataType(dataType)!.defaultValueGetter() : '';
}

function createValueValidator(valueCheckers: ValueChecker[]): ValueChecker {
  return (value, ctx) => {
    const checkers = ([] as ValueChecker[]).concat(valueCheckers);

    let result = { success: true } as ValidationResult;

    while (checkers.length > 0) {
      const validate = checkers.shift()!;

      result = validate(value, ctx);

      if (!result.type) {
        result.type = 'custom';
      }

      if (!result.success) {
        break;
      }
    }

    return result;
  };
}

function createInputValidator(input: InputDescriptor): Validator {
  const checkers: ValueChecker[] = [];
  const { dataType } = input;

  if (input.required) {
    checkers.push((value, ctx) => {
      const result: ValidationResult = { type: 'required', success: true };
      const dynamicRequired = isString(input.required);

      let computedResult = false;

      if (dynamicRequired) {
        computedResult = !!runExpression(ctx, input.required as string);
      }

      if (!dynamicRequired || computedResult) {
        if (value == null) {
          result.success = false;
        } else if (isString(value)) {
          result.success = value !== '';
        } else if (isArray(value)) {
          result.success = value.length > 0;
        } else if (isPlainObject(value)) {
          result.success = Object.keys(value).length > 0;
        }

        if (!result.success) {
          result.message = `请填入 '${input.label || input.name}' 的值`;
        }
      }

      return result;
    });
  }

  if (dataType) {
    checkers.push(value => {
      const valid = isDataValueValid(dataType, value);

      return valid
        ? { type: 'data-type', success: true }
        : {
            type: 'data-type',
            success: false,
            message: `'${input.label || input.name}' 的值 ${value} 与数据类型 '${dataType}' 不符`,
          };
    });

    const propCheckers = propCheckerMap.get(dataType);

    if (propCheckers) {
      const checkerMap: Record<string, InputPropValueChecker> = {};

      propCheckers.forEach(({ name, validator }) => {
        checkerMap[name] = validator;

        checkers.push(value => validator(value, input[name], clone(input)));
      });
    }
  }

  return {
    addChecker: checker => checkers.push(checker),
    validate: createValueValidator(checkers),
  };
}

export { registerInputPropCheckers, resolveInput, getDefaultValue, createInputValidator };
