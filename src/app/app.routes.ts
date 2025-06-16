import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () =>
          import('./heroes/pages/dashboard-page/dashboard-page.component'),
    
        children: [
          {
            path: 'heroes',
            loadComponent: () =>
              import('./heroes/pages/heroes/heroes.component'),
          },
          {
            path: 'heroes/:id',
            loadComponent: () =>
              import('./heroes/pages/heroe-detail/heroe-detail.component'),
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./heroes/pages/create-hero/create-hero.component'),
          },
          {
            path: '**',
            redirectTo: 'heroes',
          },
        ],
      },
    
      {
        path: '**',
        redirectTo: 'dashboard',
      },
];
