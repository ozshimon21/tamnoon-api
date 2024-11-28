import { Filter } from '../common';

export interface Rule {
  id: string;
  name: string;
  groupName: string;
  filter: Filter;
}
