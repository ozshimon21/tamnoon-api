import { Injectable } from '@nestjs/common';
import { Condition, Filter } from '../common';
import { Rule } from '../entities';

@Injectable()
export class RuleEngineService {
  matchesRule(object: object, rule: Rule): boolean {
    return this.evaluateFilter(rule.filter, object);
  }

  private evaluateFilter(filter: Filter, object: object): boolean {
    if ('AND' in filter) {
      return filter.AND.every((filter) => {
        const res = this.evaluateFilter(filter, object);
        return res;
      });
    } else if ('OR' in filter) {
      return filter.OR.some((filter) => {
        const res = this.evaluateFilter(filter, object);
        return res;
      });
    } else {
      const res = this.evaluateCondition(filter as Condition, object);
      return res;
    }
  }

  private evaluateCondition(condition: Condition, object: object): boolean {
    const { key, operator, value } = condition;
    const fieldValue = this.getValueByKey(object, key); // Utility to get the value for the key

    switch (operator) {
      case '=':
        return fieldValue === value;
      case '!=':
        return fieldValue !== value;
      case '>':
        return fieldValue > value;
      case '>=':
        return fieldValue >= value;
      case '<':
        return fieldValue < value;
      case '<=':
        return fieldValue <= value;
      case 'IN':
        return Array.isArray(value) && value.includes(fieldValue);
      case 'NOT IN':
        return Array.isArray(value) && !value.includes(fieldValue);
      case 'CONTAINS':
        if (typeof fieldValue === 'string') {
          return fieldValue.includes(value); // For strings
        }
        if (Array.isArray(fieldValue)) {
          const res = fieldValue.some((val) => this.containsObjectDeep(val, value)); // For arrays
          return res;
        }
        return false;
      case 'NOT CONTAINS':
        if (typeof fieldValue === 'string') {
          return !fieldValue.includes(value); // For strings
        }
        if (Array.isArray(fieldValue)) {
          return !fieldValue.some((val) => this.containsObjectDeep(val, value)); // For arrays
        }
        return true;
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  }

  private getValueByKey(object: object, key: string): any {
    return key.split('.').reduce((obj, k) => obj?.[k], object);
  }

  containsObjectDeep(object: any, subObject: any): boolean {
    if (object === subObject) return true;
    if (typeof object !== 'object' || typeof subObject !== 'object') return false;

    const objectKeys = Object.keys(object);
    const subObjectKeys = Object.keys(subObject);

    return subObjectKeys.every(
      (subKey) =>
        objectKeys.findIndex((key) => key === subKey) > -1 &&
        this.deepEqual(object[subKey], subObject[subKey]),
    );
  }

  deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every((key) => keys2.includes(key) && this.deepEqual(obj1[key], obj2[key]));
  }
}
