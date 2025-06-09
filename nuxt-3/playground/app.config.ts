import menu from '~/constants/menu'

export default defineAppConfig({
  dashboard: {
    title: 'Dashboard',
    menu,
    // sidebar: {
    //   width: '264px',
    //   collapsible: true,
    //   collapsed_width: '74px',
    //   sticky: true,
    // },
    // header: {
    //   height: '72px',
    // },
    // breadcrumbs: {
    //   enabled: true,
    //   height: '28px',
    // },
    // datatable: {
    //   perPage: 10,
    //   perPerOptions: [10, 25, 50],
    // },
  },
  ui: {
    primary: 'green',
  },
})
