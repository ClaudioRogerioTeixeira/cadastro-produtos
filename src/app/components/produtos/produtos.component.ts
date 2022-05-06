import { Component, OnInit } from '@angular/core';

import { IProduto } from './produto.interface';
import { ProdutosService } from './produtos.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
  produtos!: IProduto[];

  constructor(
    private produtosService: ProdutosService,
    private matSnackBar: MatSnackBar
    ) { }

  ngOnInit(): void {

    this.produtosService.getAll().subscribe(
      response => { this.produtos = response },
      err => {
        this.matSnackBar.open(`Erro: ${err.status} - ${err.statusText} `, '',{duration: 3000, panelClass:'danger-snackbar'});
      },
      () => {
        this.matSnackBar.open(`${this.produtos.length} Produtos carregados com sucesso`, '',{duration: 3000, panelClass:'success-snackbar'});
      }
    );

  }

}
