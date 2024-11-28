import { Filter } from '../common';

export interface Rule {
  id: string;
  groupName: string;
  filter: Filter;
}
