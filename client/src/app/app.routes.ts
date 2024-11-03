import { CanMatchFn, Router, Routes, UrlTree } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RegistroComponent } from './core/auth/views/registro/registro.component';
import { LoginComponent } from './core/auth/views/login/login.component';
import { inject } from '@angular/core';
import { UsuarioService } from './core/auth/services/usuario.service';
import { map, Observable, of } from 'rxjs';
import { contatosRoutes } from './views/contatos/contatos.routes';
import { compromissosRoutes } from './views/compromissos/compromissos.routes';
import { categoriasRoutes } from './views/categorias/categorias.routes';

const authGuard: CanMatchFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const usuarioService = inject(UsuarioService);

  return usuarioService.usuarioAutenticado.pipe(
    map((usuario) => {
      if (!usuario) return router.parseUrl('/login');

      return true;
    })
  );
};

const authUserGuard: CanMatchFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const usuarioService = inject(UsuarioService);

  return usuarioService.usuarioAutenticado.pipe(
    map((usuario) => {
      if (usuario) return router.parseUrl('/dashboard');

      return true;
    })
  );
};

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canMatch: [authGuard],
  },

  { path: 'registro', component: RegistroComponent, canMatch: [authUserGuard] },
  { path: 'login', component: LoginComponent, canMatch: [authUserGuard] },

  { path: 'contatos', children: contatosRoutes, canMatch: [authGuard] },

  { path: 'compromissos', children: compromissosRoutes, canMatch: [authGuard] },
  { path: 'categorias', children: categoriasRoutes, canMatch: [authGuard] },
];
