export const ROLES = [
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'super_admin',
    label: 'Super Admin',
  },
] as const

export type Role = typeof ROLES[number]['value']
