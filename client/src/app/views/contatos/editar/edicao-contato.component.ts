import { NgIf, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import {
  ContatoEditadoViewModel,
  ContatoInseridoViewModel,
} from '../models/contato.models';
import { ContatoService } from '../services/contato.service';

@Component({
  selector: 'app-edicao-contato',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './edicao-contato.component.html',
})
export class EdicaoContatoComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private contatoService: ContatoService,
    private notificacaoService: NotificacaoService
  ) {
    this.form = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      empresa: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      cargo: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  ngOnInit(): void {
    const contato = this.route.snapshot.data['contato'];

    this.form.patchValue(contato);
  }

  get nome() {
    return this.form.get('nome');
  }

  get telefone() {
    return this.form.get('telefone');
  }

  get email() {
    return this.form.get('email');
  }

  get empresa() {
    return this.form.get('empresa');
  }

  get cargo() {
    return this.form.get('cargo');
  }

  public gravar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso(
        'Por favor, preencha o formulário corretamente!'
      );

      return;
    }
    const id = this.route.snapshot.params['id'];
    const editarContatoVm = this.form.value;

    const observer: PartialObserver<ContatoEditadoViewModel> = {
      next: (contatoInserido) => this.processarSucesso(contatoInserido),
      error: (erro) => this.processarFalha(erro),
    };

    this.contatoService.editar(id, editarContatoVm).subscribe(observer);
  }

  private processarSucesso(contato: ContatoEditadoViewModel): void {
    this.notificacaoService.sucesso(
      `Contato ${contato.nome} editado com sucesso!`
    );

    this.router.navigate(['/contatos', 'listar']);
  }

  private processarFalha(erro: Error): any {
    this.notificacaoService.erro(erro.message);
  }
}
