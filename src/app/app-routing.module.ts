import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/auth/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'citation',
    loadChildren: () => import('./pages/citations/citation-create/citation.module').then( m => m.CitationPageModule)
  },
  {
    path: 'citation-edit',
    loadChildren: () => import('./pages/citations/citation-edit/citation-edit.module').then( m => m.CitationEditPageModule)
  },
  {
    path: 'password-recover',
    loadChildren: () => import('./pages/auth/password-recover/password-recover.module').then( m => m.PasswordRecoverPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
