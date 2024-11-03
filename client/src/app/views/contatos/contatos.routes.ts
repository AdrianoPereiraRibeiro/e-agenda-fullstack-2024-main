import { Routes } from '@angular/router';
import { ListagemContatosComponent } from './listar/listagem-contatos.component';

import { CadastroContatoComponent } from './cadastrar/cadastro-contato.component';
import { EdicaoContatoComponent } from './editar/edicao-contato.component';
import { ExclusaoContatoComponent } from './excluir/exclusao-contato.component';
import { listagemContatosResolver } from './services/listagem-contato.resolver';
import { visualizarContatoResolver } from './services/visualizar-contato.resolver';

export const contatosRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  {
    path: 'listar',
    component: ListagemContatosComponent,
    resolve: {
      contatos: listagemContatosResolver,
    },
  },

  { path: 'cadastrar', component: CadastroContatoComponent },
  {
    path: 'editar/:id',
    component: EdicaoContatoComponent,
    resolve: {
      contato: visualizarContatoResolver,
    },
  },
  {
    path: 'excluir/:id',
    component: ExclusaoContatoComponent,
    resolve: {
      contato: visualizarContatoResolver,
    },
  },
];
