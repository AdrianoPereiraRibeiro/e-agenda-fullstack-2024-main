import { NgIf, NgForOf, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VisualizarContatoViewModel } from '../models/contato.models';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { ContatoService } from '../services/contato.service';

@Component({
  selector: 'app-exclusao-contato',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './exclusao-contato.component.html',
})
export class ExclusaoContatoComponent implements OnInit {
  detalhesContato?: VisualizarContatoViewModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contatoService: ContatoService,
    private notificacaoService: NotificacaoService
  ) {}

  ngOnInit(): void {
    this.detalhesContato = this.route.snapshot.data['contato'];
  }

  public excluir() {
    this.contatoService.excluir(this.detalhesContato!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(): void {
    this.notificacaoService.sucesso('Contato excluído com sucesso!');

    this.router.navigate(['/contatos', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.message);
  }
}
