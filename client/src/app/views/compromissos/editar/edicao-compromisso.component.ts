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
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { ListarContatoViewModel } from '../../contatos/models/contato.models';
import {
  TipoLocalizacaoCompromissoEnum,
  InserirCompromissoViewModel,
  CompromissoInseridoViewModel,
  EditarCompromissoViewModel,
  CompromissoEditadoViewModel,
} from '../models/compromisso.models';
import { CompromissoService } from '../services/compromisso.service';

@Component({
  selector: 'app-edicao-compromisso',
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
    MatSelectModule,
  ],
  templateUrl: './edicao-compromisso.component.html',
})
export class EdicaoCompromissoComponent implements OnInit {
  public form: FormGroup;

  public opcoesLocal = Object.values(TipoLocalizacaoCompromissoEnum).filter(
    (v) => !Number.isFinite(v)
  );

  public contatos: ListarContatoViewModel[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private compromissoService: CompromissoService,
    private notificacaoService: NotificacaoService
  ) {
    this.form = this.fb.group({
      assunto: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      tipoLocal: [0, [Validators.required]],
      link: [''],
      local: [''],
      data: [new Date().toISOString().substring(0, 10), [Validators.required]],
      horaInicio: ['08:00', [Validators.required]],
      horaTermino: ['09:00', [Validators.required]],
      contatoId: [''],
    });
  }

  get assunto() {
    return this.form.get('assunto');
  }

  get tipoLocal() {
    return this.form.get('tipoLocal');
  }

  get local() {
    return this.form.get('local');
  }

  get link() {
    return this.form.get('link');
  }

  get data() {
    return this.form.get('data');
  }

  get horaInicio() {
    return this.form.get('horaInicio');
  }

  get horaTermino() {
    return this.form.get('horaTermino');
  }

  ngOnInit(): void {
    this.contatos = this.route.snapshot.data['contatos'];

    const compromisso = this.route.snapshot.data['compromisso'];

    this.form.patchValue({
      ...compromisso,
      data: new Date(compromisso.data).toISOString().substring(0, 10),
      contatoId: compromisso.contato.id,
    });
  }

  public gravar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso(
        'Por favor, preencha o formulário corretamente.'
      );

      return;
    }

    const id = this.route.snapshot.params['id'];

    const editarCompromissoVm: EditarCompromissoViewModel = this.form.value;

    this.compromissoService.editar(id!, editarCompromissoVm).subscribe({
      next: (compromissoEditado) => this.processarSucesso(compromissoEditado),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(compromisso: CompromissoEditadoViewModel): void {
    this.notificacaoService.sucesso(
      `Compromisso "${compromisso.assunto}" editado com sucesso!`
    );

    this.router.navigate(['/compromissos', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.message);
  }
}
