import type { Role } from '~/constants/roles'

export interface SubMenu {
  label: string
  url: string
  access?: string | string[]
  roles?: Role[] | Role
  includes?: string[]
}

export interface MenuItem {
  label: string
  url?: string
  icon: string
  defaultOpen?: boolean
  submenu?: SubMenu[]
  roles?: Role[] | Role
  includes?: string[]
}

export interface Menu {
  title?: string
  roles?: Role[] | Role
  items: MenuItem[]
}

export const defineMenu = (menus: Menu[]): Menu[] => menus
