type EventWithNamespace = string;

type EventHandler = (payload: any) => any | Promise<any>;
type EventHandlers<EventNames extends string = string> = Record<EventNames, any>;

type EventListeners<EventNames extends string = string> = Record<
  EventNames,
  { handlers: EventHandler[] }
>;

interface EventEmitter<EventNames extends string = string> {
  on: (event: EventWithNamespace | EventHandlers<EventNames>, handler?: EventHandler) => void;
  off: (event?: EventWithNamespace, handler?: EventHandler) => void;
  emit: <PayloadType extends any = any>(event: EventWithNamespace, payload?: PayloadType) => void;
}

export { EventWithNamespace, EventHandler, EventHandlers, EventListeners, EventEmitter };
