import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';

import { ProdutosService } from './../produtos.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortable} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { IProduto } from '../produto.interface';
import { IDialog } from 'src/app/core/interfaces/dialog.interface';

import { ProdutoCadastroComponent } from '../produto-cadastro/produto-cadastro.component';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-produtos-grid',
  templateUrl: './produtos-grid.component.html',
  styleUrls: ['./produtos-grid.component.scss']
})
export class ProdutosGridComponent implements OnInit {
  displayedColumns: string[] = ['actions', 'id', 'nome', 'descricao', 'tipo', 'preco', 'marca', 'categoria', 'data'];
  produtos!: IProduto[];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private produtosService: ProdutosService,
    private matSnackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getAll();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = 'auto';
    dialogConfig.hasBackdrop = true;
    dialogConfig.direction= 'ltr';
    dialogConfig.panelClass = 'dialogClass'

    const dialogRef =this.dialog.open(ProdutoCadastroComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( (result) => {
      this.getAll();
    })
  }

  getAll() {
    this.produtosService.getAll().subscribe(
      response => {
        this.produtos = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.sort.sort(({ id: 'name', start: 'desc'}) as MatSortable);
        this.dataSource.sort = this.sort;
        // console.log('this.datasource: ', this.dataSource);
      },
      err => {
        this.matSnackBar.open(`Erro: ${err.status} - ${err.statusText} `, '',{duration: 3000, panelClass:'danger-snackbar'});
      },
      () => {
        this.matSnackBar.open(`${this.produtos.length} Produtos carregados com sucesso`, '',{duration: 3000, panelClass:'success-snackbar'});
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(row: IProduto) {
    // const dialogRef = this.dialog.open(ProdutoCadastroComponent, {
    //   width: '30%',
    //   data: row
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = 'auto';
    dialogConfig.hasBackdrop = true;
    dialogConfig.direction= 'ltr';
    dialogConfig.panelClass = 'dialogClass'
    dialogConfig.data = row

    const dialogRef =this.dialog.open(ProdutoCadastroComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( (result) => {
      // console.log('result edit: ', result);
      this.getAll();
    })

  }

  delete(produto: IProduto):void {
    const dialogData: IDialog = {
      cancelText: 'Cancel',
      confirmText: 'Deletar',
      content: `Deletar ${produto.nome} ?`
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
      width: '600px',
      height: '230px'
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.produtosService.delete(produto).subscribe( response => {
          this.getAll();
          this.matSnackBar.open(`Produtos ${produto.nome} excluido com sucesso`, '',{duration: 3000, panelClass:'success-snackbar'});
        });
      }
    })

  }

}
