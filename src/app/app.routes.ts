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
          /* {
            path: 'heroes/:query',
            loadComponent: () =>
              import('./gifs/pages/gif-history/gif-history.component'),
          }, */
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
