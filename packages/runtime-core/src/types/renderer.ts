import type { DataValue, ConfigType, ClientAction, ValidationResult } from '../vendors/organik';

import type { ObjectValue } from './value';
import type { ViewFieldDescriptor, FilterDescriptor } from './input';

interface ActionRendererProps {
  readonly action: ClientAction;
}

interface FieldRendererProps<VT = DataValue> {
  readonly field: ViewFieldDescriptor;
  readonly value: VT;
  readonly readonly?: boolean;
  readonly onChange?: (fieldName: string, value: VT) => void;
}

interface FilterRendererProps<VT = DataValue> {
  readonly filter: FilterDescriptor;
  readonly value: VT;
  readonly onChange?: (filterName: string, value: VT) => void;
}

interface FormRendererProps {
  readonly fields: ViewFieldDescriptor[];
  readonly value: ObjectValue;
  readonly config: ConfigType;
  readonly behavior?: Record<string, any>;
  readonly readonly?: boolean;
  readonly validation?: Record<string, ValidationResult>;
  readonly className?: any;
  readonly onChange?: (fieldName: string, value: DataValue) => void;
}

interface ViewRendererProps {
  readonly view: string;
  readonly params: any[];
}

export type {
  ActionRendererProps,
  FieldRendererProps,
  FilterRendererProps,
  FormRendererProps,
  ViewRendererProps,
};
