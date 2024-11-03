import { NgIf, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { CategoriaService } from '../services/categoria.service';
import { CategoriaEditadaViewModel, EditarCategoriaViewModel } from '../models/categoria.models';

@Component({
  selector: 'app-edicao-categoria',
  standalone: true,
  imports: [NgIf,
    NgForOf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,],
  templateUrl: './edicao-categoria.component.html',
})
export class EdicaoCategoriaComponent implements OnInit {
  public form: FormGroup;

  constructor(
private fb: FormBuilder,
private route: ActivatedRoute,
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

  ngOnInit(): void {
    const categoria = this.route.snapshot.data['categoria'];

  this.form.patchValue(categoria);

  }
get titulo(){
  return this.form.get('titulo');
}

public gravar(){
if(this.form.invalid){
this.notificacaoService.aviso(
  'Por favor,preencha o formulário corretamente.'
);
return;
}

const id = this.route.snapshot.params['id'];
const editarCategoria: EditarCategoriaViewModel = this.form.value;

this.categoriaService.editar(id, editarCategoria).subscribe({

  next: (categoriaEditada) => this.processarSucesso(categoriaEditada),
  error: (erro) => this.processarFalha(erro),

})

}

private processarSucesso(registro: CategoriaEditadaViewModel): void {
this.notificacaoService.sucesso(
`Categoria "${registro.titulo}" editada com sucesso!`
);

this.router.navigate(['/categorias','listar']);
}

private processarFalha(erro: Error){
this.notificacaoService.erro(erro.message);
}

}
