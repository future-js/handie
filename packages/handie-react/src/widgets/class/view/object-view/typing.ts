type ActionExecutors = Record<string, (...args: any[]) => any>;
type ActionText = Record<string, string>;

interface ActionBarRendererOptions {
  className?: string;
  slotName?: string;
  executors?: ActionExecutors;
  actionText?: ActionText;
  readonly?: boolean;
}

export type { ActionExecutors, ActionText, ActionBarRendererOptions };
