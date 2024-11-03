import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { ListagemCompromissosComponent } from './listar/listagem-compromissos.component';
import {
  ListarCompromissoViewModel,
  VisualizarCompromissoViewModel,
} from './models/compromisso.models';
import { inject } from '@angular/core';
import { CompromissoService } from './services/compromisso.service';
import { CadastroCompromissoComponent } from './cadastrar/cadastro-compromisso.component';
import { listagemContatosResolver } from '../contatos/services/listagem-contato.resolver';
import { EdicaoCompromissoComponent } from './editar/edicao-compromisso.component';
import { ExclusaoCompromissoComponent } from './excluir/exclusao-compromisso.component';

const listagemCompromissosResolver: ResolveFn<
  ListarCompromissoViewModel[]
> = () => {
  return inject(CompromissoService).selecionarTodos();
};

const visualizarCompromissoResolver: ResolveFn<
  VisualizarCompromissoViewModel
> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];

  return inject(CompromissoService).selecionarPorId(id);
};

export const compromissosRoutes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListagemCompromissosComponent,
    resolve: { compromissos: listagemCompromissosResolver },
  },
  {
    path: 'cadastrar',
    component: CadastroCompromissoComponent,
    resolve: { contatos: listagemContatosResolver },
  },
  {
    path: 'editar/:id',
    component: EdicaoCompromissoComponent,
    resolve: {
      compromisso: visualizarCompromissoResolver,
      contatos: listagemContatosResolver,
    },
  },
  {
    path: 'excluir/:id',
    component: ExclusaoCompromissoComponent,
    resolve: {
      compromisso: visualizarCompromissoResolver,
    },
  },
];
