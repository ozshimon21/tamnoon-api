// A Filter can be a Condition or a Logical Filter
export type Filter = Condition | LogicalFilter;

// Logical Filters
export type LogicalFilter =
  | { AND: Filter[]; OR?: never } // If AND exists, OR must be absent
  | { OR: Filter[]; AND?: never }; // If OR exists, AND must be absent

// Supported Operators
export type Operator =
  | '='
  | '!='
  | '>'
  | '>='
  | '<'
  | '<='
  | 'IN'
  | 'NOT IN'
  | 'CONTAINS'
  | 'NOT CONTAINS';

// A Single Condition
export interface Condition {
  key: string; // The property to filter by
  operator: Operator; // The comparison operator
  value: any; // The value to compare against
}
