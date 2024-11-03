import { NgIf, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListarCategoriaViewModel } from '../models/categoria.models';

@Component({
  selector: 'app-listagem-categorias',
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
  templateUrl: './listagem-categorias.component.html',
})
export class ListagemCategoriasComponent implements OnInit{
categorias: ListarCategoriaViewModel[] = []

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void{
this.categorias = this.route.snapshot.data['categorias']
  }
}
