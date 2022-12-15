import type { IEventEmitter } from '@ntks/event-emitter';

import type { DataValue } from '../value';

interface ValueContextDescriptor<ValueType extends DataValue = DataValue> {
  defaultValue: ValueType;
  initialValue?: ValueType;
}

type ValueEvents = 'ready' | 'change' | 'submit' | 'reset';

interface ValueContext<
  ValueType extends DataValue = DataValue,
  EventNames extends string = ValueEvents
> extends IEventEmitter<EventNames> {
  getDefaultValue(): ValueType;
  getValue(): ValueType;
  setValue(value: ValueType): void;
  isReady(): boolean;
  submit(): void;
  reset(): void;
}

export type { ValueContextDescriptor, ValueEvents, ValueContext };
