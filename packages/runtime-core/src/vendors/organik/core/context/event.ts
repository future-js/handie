import EventEmitter, { IEventEmitter } from '@ntks/event-emitter';

function createEventEmitter<EventNames extends string = string>(): IEventEmitter<EventNames> {
  return new EventEmitter();
}

export { createEventEmitter };
