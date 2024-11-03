import { NgIf, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { CategoriaInseridaViewModel, InserirCategoriaViewModel } from '../models/categoria.models';

@Component({
  selector: 'app-cadastro-categoria',
  standalone: true,
  imports: [NgIf,
    NgForOf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,],
  templateUrl: './cadastro-categoria.component.html',

})
export class CadastroCategoriaComponent {
 public form: FormGroup;

  constructor(
private fb: FormBuilder,
private router: Router,
private categoriaService: CategoriaService,
private notificacaoService: NotificacaoService
  ){
    this.form = this.fb.group({
      titulo: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
        ],
      ],
    })
  }
get titulo(){
  return this.form.get('titulo');
}

public gravar(){
if(this.form.invalid){
  this.notificacaoService.aviso(
    'Por favor, preencha o formulário corretamente.'
    );
    return;
}

const inserirCategoria: InserirCategoriaViewModel = this.form.value;

this.categoriaService.inserir(inserirCategoria).subscribe({
next: (categoriaInserida) => this.processarSucesso(categoriaInserida),
error: (erro) =>this.processarFalha(erro),
});

}
private processarSucesso(registro: CategoriaInseridaViewModel): void {
  this.notificacaoService.sucesso(
`Categoria " ${registro.titulo}" cadastrada com sucesso!`
  );
  this.router.navigate(['/categorias','listar']);
}

private processarFalha(erro: Error){
  this.notificacaoService.erro(erro.message);
}




}
