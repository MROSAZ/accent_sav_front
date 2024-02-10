import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Data Management',
    icon: 'file-text-outline',
    children: [
      {
        title: 'Admin',
        link: '/pages/data/admin',
      },
      {
        title: 'User',
        link: '/pages/data/user',
      },
      {
        title: 'Citoyen',
        link: '/pages/data/citoyen',
      },
      {
        title: 'Title Suggestion',
        link: '/pages/data/citoyen',
      },
      // {
      //   title: 'Authorities',
      //   link: '/pages/data/authorities',
      // },
      {
        title: 'Categories',
        link: '/pages/data/categories',
      },
      {
        title: 'Sous Category',
        link: '/pages/data/sous-category',
      },
      {
        title: 'News',
        link: '/pages/data/news',
      },
      {
        title: 'Region',
        link: '/pages/data/region',
      },
      {
        title: 'Reclamations',
        link: '/pages/data/reclamations',
      },
    ],
  },
  {
    title: 'Historique',
    icon: 'bar-chart',
    children: [
      {
        title: 'Reclamation',
        link: '/pages/historical/reclamations',
      },
      {
        title: 'Reclamation sous cat',
        link: '/pages/historical/reclamationsouscat',
      },
    ],
  },
];
