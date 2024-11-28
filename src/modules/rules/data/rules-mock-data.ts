import { Rule } from '../entities/rule.entity';

export const mockRules: Rule[] = [
  {
    id: '1',
    name: 'rule-1',
    groupName: 'instances',
    filter: {
      AND: [
        {
          key: 'type',
          operator: '=',
          value: 'ec2-instance',
        },
        {
          OR: [
            {
              key: 'tags',
              operator: 'CONTAINS',
              value: {
                key: 'env',
                value: 'prod',
              },
            },
            {
              key: 'name',
              operator: 'CONTAINS',
              value: 'prod',
            },
          ],
        },
      ],
    },
  },
  {
    id: '2',
    name: 'rule-2',
    groupName: 'prod-or-staging-in-us-east-1',
    filter: {
      AND: [
        {
          OR: [
            {
              key: 'tags',
              operator: 'CONTAINS',
              value: {
                key: 'env',
                value: 'prod',
              },
            },
            {
              key: 'tags',
              operator: 'CONTAINS',
              value: {
                key: 'env',
                value: 'staging',
              },
            },
          ],
        },
        {
          key: 'region',
          operator: '=',
          value: 'us-east-1',
        },
      ],
    },
  },
  {
    id: '3',
    name: 'rule-3',
    groupName: 'user-777',
    filter: {
      key: 'ownerId',
      operator: '=',
      value: 'user-777',
    },
  },
];
