import { ActivatedRouteSnapshot, ResolveFn, Routes } from "@angular/router";
import { ListarCategoriaViewModel, VisualizarCategoriaViewModel } from "./models/categoria.models";
import { CategoriaService } from "./services/categoria.service";
import { inject } from "@angular/core";
import { ListagemCategoriasComponent } from "./listar/listagem-categorias.component";
import { CadastroCategoriaComponent } from "./cadastrar/cadastro-categoria.component";
import { EdicaoCategoriaComponent } from "./editar/edicao-categoria.component";
import { ExclusaoCategoriaComponent } from "./excluir/exclusao-categoria.component";

const listagemCategoriasResolver: ResolveFn<ListarCategoriaViewModel[]> = () => {
return inject(CategoriaService).selecionarTodos();
}

const visulizarCategoriaResolver: ResolveFn<VisualizarCategoriaViewModel> = (route: ActivatedRouteSnapshot) => {
const id = route.params['id'];

return inject(CategoriaService).selecionarPorId(id);
};

export const categoriasRoutes: Routes = [
{
path : '',
redirectTo: 'listar',
pathMatch: 'full'
},
{
path:'listar',
component: ListagemCategoriasComponent,
resolve: { categorias: listagemCategoriasResolver }
},

{
path:'cadastrar',
component: CadastroCategoriaComponent,
},
{
  path:'editar/:id',
  component: EdicaoCategoriaComponent,
  resolve: { categoria: visulizarCategoriaResolver }
  },

  {
    path:'excluir/:id',
    component: ExclusaoCategoriaComponent,
    resolve: { categoria: visulizarCategoriaResolver }
    },
]
