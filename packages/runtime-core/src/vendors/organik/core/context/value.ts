import { clone } from '@ntks/toolbox';

import { ValueContextDescriptor, ValueEvents, ValueContext } from '../typing';
import { createEventEmitter } from './event';

function createValueContext<ValueType extends any = any, EventNames extends string = ValueEvents>(
  options: ValueContextDescriptor<ValueType>,
): ValueContext<ValueType, EventNames> {
  const { on, off, emit } = createEventEmitter<EventNames>();
  const defaultValue: ValueType = clone(options.defaultValue) as ValueType;
  const getDefaultValue = () => clone(defaultValue) as ValueType;

  let value = options.initialValue ? clone(options.initialValue) : getDefaultValue();
  let valueInited = false;

  const getValue = () => clone(value) as ValueType;

  const setValue = (newValue: ValueType) => {
    value = clone(newValue) as ValueType;
    emit('change', getValue());

    if (!valueInited) {
      valueInited = true;
      emit('ready');
    }
  };

  return {
    getDefaultValue,
    getValue,
    setValue,
    isReady: () => valueInited,
    submit: () => emit('submit'),
    reset: () => {
      setValue(getDefaultValue());
      emit('reset', value);
    },
    on,
    off,
    emit,
  };
}

export { createValueContext };
