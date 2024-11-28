export interface Asset {
  id: string;
  name: string;
  type: string;
  tags: { key: string; value: string }[];
  cloudAccount: { id: string; name: string };
  ownerId: string;
  region: string;
  groupName?: string; // New field for group assignment
}
