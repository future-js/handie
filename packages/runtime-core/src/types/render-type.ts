type ActionRenderType = 'button' | 'link' | 'icon';

type ListViewRenderType = 'list' | 'table';

type ObjectViewRenderType = 'form';

type ViewRenderType = ListViewRenderType | ObjectViewRenderType;

type BooleanInputRenderType = 'select' | 'radio' | 'checkbox' | 'switch';

type StringInputRenderType = 'input';

type TextInputRenderType = 'input' | 'textarea';

type EnumInputRenderType = 'select' | 'radio';

type DateInputRenderType = 'date' | 'date-range' | 'date-time' | 'date-time-range';

type OneToOneInputRenderType = ObjectViewRenderType;

type OneToManyInputRenderType = 'select' | ListViewRenderType;

type ManyToManyInputRenderType = 'select' | ListViewRenderType;

type ManyToOneInputRenderType = 'select';

type RelationInputRenderType =
  | OneToOneInputRenderType
  | OneToManyInputRenderType
  | ManyToManyInputRenderType
  | ManyToOneInputRenderType;

type InputRenderType =
  | BooleanInputRenderType
  | StringInputRenderType
  | TextInputRenderType
  | EnumInputRenderType
  | DateInputRenderType
  | RelationInputRenderType;

export type {
  ActionRenderType,
  ListViewRenderType,
  ObjectViewRenderType,
  ViewRenderType,
  BooleanInputRenderType,
  StringInputRenderType,
  TextInputRenderType,
  EnumInputRenderType,
  DateInputRenderType,
  OneToOneInputRenderType,
  OneToManyInputRenderType,
  ManyToManyInputRenderType,
  ManyToOneInputRenderType,
  RelationInputRenderType,
  InputRenderType,
};
