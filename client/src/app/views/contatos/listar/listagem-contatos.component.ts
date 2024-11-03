import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ListarContatoViewModel } from '../models/contato.models';
import { ContatoService } from '../services/contato.service';
import { NgForOf, NgIf, AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-listagem-contatos',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './listagem-contatos.component.html',
})
export class ListagemContatosComponent implements OnInit {
  contatos: ListarContatoViewModel[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.contatos = this.route.snapshot.data['contatos'];
  }
}
