import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot } from "@angular/router";
import { VisualizarContatoViewModel } from "../models/contato.models";
import { ContatoService } from "./contato.service";

export const visualizarContatoResolver: ResolveFn<VisualizarContatoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  const id = route.params['id'];

  return inject(ContatoService).selecionarPorId(id);
};
