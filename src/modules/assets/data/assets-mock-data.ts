import { Asset } from '../entities';

export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'prod-web-server',
    type: 'ec2-instance',
    tags: [
      { key: 'env', value: 'prod' },
      { key: 'team', value: 'web' },
    ],
    cloudAccount: { id: 'cloud-001', name: 'AWS' },
    ownerId: 'user-123',
    region: 'us-central1',
    groupName: undefined, // No group assigned yet
  },
  {
    id: '2',
    name: 'bucket-3',
    type: 'rd-instance',
    tags: [
      { key: 'env', value: 'prod' },
      { key: 'team', value: 'backup' },
    ],
    cloudAccount: { id: 'cloud-002', name: 'GCP' },
    ownerId: 'user-456',
    region: 'us-east-1',
    groupName: undefined, // No group assigned yet
  },
  {
    id: '3',
    name: 'db-pdev',
    type: 'rds-instance',
    tags: [
      { key: 'env', value: 'dev' },
      { key: 'team', value: 'database' },
    ],
    cloudAccount: { id: 'cloud-001', name: 'AWS' },
    ownerId: 'user-789',
    region: 'us-east-1',
    groupName: undefined, // No group assigned yet
  },
];
