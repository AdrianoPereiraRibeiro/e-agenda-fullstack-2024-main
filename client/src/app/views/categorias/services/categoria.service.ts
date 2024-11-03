import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { LocalStorageService } from "../../../core/auth/services/local-storage.service";
import { HttpClient } from "@angular/common/http";
import { CategoriaEditadaViewModel, CategoriaExcluidaViewModel, CategoriaInseridaViewModel, EditarCategoriaViewModel, InserirCategoriaViewModel, ListarCategoriaViewModel, VisualizarCategoriaViewModel } from "../models/categoria.models";
import { Observable, map, catchError, throwError } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly url = `${environment.apiUrl}/categorias`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  public inserir(
    inserirCategoriaVm: InserirCategoriaViewModel
  ): Observable<CategoriaInseridaViewModel> {
    return this.http
      .post<CategoriaInseridaViewModel>(this.url, inserirCategoriaVm)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(
    id: string,
    editarCategoriaVm: EditarCategoriaViewModel
  ): Observable<CategoriaEditadaViewModel> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .put<CategoriaEditadaViewModel>(urlCompleto, editarCategoriaVm)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public excluir(id: string): Observable<CategoriaExcluidaViewModel> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .delete<CategoriaExcluidaViewModel>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarTodos(): Observable<ListarCategoriaViewModel[]> {
    return this.http
      .get<ListarCategoriaViewModel[]>(this.url)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarPorId(id: string): Observable<VisualizarCategoriaViewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;

    return this.http
      .get<VisualizarCategoriaViewModel>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  private processarDados(resposta: any) {
    if (resposta.sucesso) return resposta.dados;

    throw new Error('Erro ao mapear dados requisitados.');
  }

  private processarFalha(resposta: any) {
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}
