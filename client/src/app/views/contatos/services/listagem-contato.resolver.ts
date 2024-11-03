import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { ListarContatoViewModel } from "../models/contato.models";
import { ContatoService } from "./contato.service";

export const listagemContatosResolver: ResolveFn<
  ListarContatoViewModel[]
> = () => {
  return inject(ContatoService).selecionarTodos();
};
