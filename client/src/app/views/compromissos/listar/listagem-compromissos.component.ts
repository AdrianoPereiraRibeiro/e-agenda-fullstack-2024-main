import { Component, OnInit } from '@angular/core';
import { ListarCompromissoViewModel } from '../models/compromisso.models';
import { NgIf, NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-listagem-compromissos',
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
  templateUrl: './listagem-compromissos.component.html',
})
export class ListagemCompromissosComponent implements OnInit {
  compromissos: ListarCompromissoViewModel[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.compromissos = this.route.snapshot.data['compromissos']
  }
}
