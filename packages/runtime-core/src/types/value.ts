import type { DataValue } from '../vendors/organik';

type ObjectValue = Record<string, DataValue>;

type ListValue = DataValue[];

type DateValue = Date | string | number;

export type { ObjectValue, ListValue, DateValue };
