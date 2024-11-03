import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
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
import { AuthService } from '../../services/auth.service';
import {
  RegistrarUsuarioViewModel,
  TokenViewModel,
} from '../../models/auth.models';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { NotificacaoService } from '../../../notificacao/notificacao.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './registro.component.html',
})
export class RegistroComponent {
  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private notificacaoService: NotificacaoService,
    private localStorageService: LocalStorageService
  ) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get nome() {
    return this.form.get('nome');
  }

  get login() {
    return this.form.get('login');
  }

  get email() {
    return this.form.get('email');
  }

  get senha() {
    return this.form.get('senha');
  }

  public registrar() {
    if (this.form.invalid) return;

    const registro: RegistrarUsuarioViewModel = this.form.value;

    this.authService.registrar(registro).subscribe({
      next: (usuarioAutenticado) => this.processarSucesso(usuarioAutenticado),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(token: TokenViewModel): void {
    this.usuarioService.logarUsuario(token.usuario);
    this.localStorageService.salvarTokenAutenticacao(token);
    this.router.navigate(['/dashboard']);
  }

  private processarFalha(erro: Error): any {
    this.notificacaoService.erro(erro.message);
    this.localStorageService.limparDadosLocais();
  }
}
