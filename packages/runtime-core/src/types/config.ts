interface WidgetConfig {
  className?: string;
}

interface ActionWidgetConfig extends WidgetConfig {
  showIcon?: boolean;
  iconOnly?: boolean;
  icon?: string;
}

export type { ActionWidgetConfig };
