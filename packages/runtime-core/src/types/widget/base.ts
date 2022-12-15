import type { ComponentCtor } from '../../vendors/organik';

interface BaseWidgetConfig<Ctor extends ComponentCtor = ComponentCtor> {
  readonly className?: string;
  readonly style?: Record<string, any>;
  readonly vendorProps?: Record<string, any>;
  readonly $$child?: string | Ctor;
}

interface BaseWidgetState {}

export type { BaseWidgetConfig, BaseWidgetState };
