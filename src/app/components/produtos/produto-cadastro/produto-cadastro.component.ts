
import { Component, Input, OnInit, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

import { CategoriasService } from './../../../core/services/categorias.service';
import { MarcasService } from './../../../core/services/marcas.service';
import { ProdutosService } from './../produtos.service';

import { ICategoria } from 'src/app/core/interfaces/categoria.interface';
import { IMarca } from 'src/app/core/interfaces/marca.interface';
import { IProduto, EMPTY_PRODUTO } from '../produto.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.scss']
})
export class ProdutoCadastroComponent implements OnInit, AfterViewInit, OnDestroy {
  isEditing!: boolean;
  title = 'Inclusão Produto';
  categorias!: ICategoria[];
  marcas!: IMarca[];
  frmCadastro!: FormGroup;
  model: IProduto = JSON.parse(JSON.stringify(EMPTY_PRODUTO));

  tipos = [
    { id: 1, descricao: 'Básico'},
    { id: 2, descricao: 'Padrão'},
    { id: 3, descricao: 'Premium'},
  ]

  private mediaSub!: Subscription;

  constructor(
    private categoriasService: CategoriasService,
    private matSnackBar: MatSnackBar,
    private marcasService: MarcasService,
    private fb: FormBuilder,
    private produtosService: ProdutosService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private matDialogRef: MatDialogRef<ProdutoCadastroComponent>,
    private mediaObserver: MediaObserver
    ) { }

  ngOnInit(): void {
    this.isEditing = false;
    this.getCategorias();
    this.getMarcas();
    this.initForm();

    // console.log('this.editData: ', this.editData);
    if(this.editData) {
      this.isEditing = true;
      this.frmCadastro.controls['id'].setValue(this.editData.id);
      this.frmCadastro.controls['nome'].setValue(this.editData.nome);
      this.frmCadastro.controls['categoria'].setValue(this.editData.categoria);
      this.frmCadastro.controls['data'].setValue(this.editData.data);
      this.frmCadastro.controls['tipo'].setValue(this.editData.tipo);
      this.frmCadastro.controls['marca'].setValue(this.editData.marca);
      this.frmCadastro.controls['preco'].setValue(this.editData.preco);
      this.frmCadastro.controls['descricao'].setValue(this.editData.descricao);
    }

    this.mediaSub = this.mediaObserver.media$.subscribe(
      // const matDialogConfig = new MatDialogConfig();
      (change: MediaChange) => {
        console.log(change.mqAlias);
        console.log(change);

        if (change.mqAlias === 'sm') {
          const valor = this.matDialogRef.getState();
          console.log('valor', valor);
        }
      }
    );
  }

  initForm() {
    this.frmCadastro = this.fb.group({
      id: new FormControl(this.model.id),
      nome: new FormControl(this.model.nome, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
      categoria: new FormControl(this.model.categoria, [Validators.required]),
      data: new FormControl(this.model.data, [Validators.required]),
      tipo: new FormControl(this.model.tipo, [Validators.required]),
      marca: new FormControl(this.model.marca, [Validators.required]),
      preco: new FormControl(this.model.preco, [Validators.required]),
      descricao: new FormControl(this.model.descricao, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
    });

    this.frmCadastro.get('nome')!.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe( response => {
      if (!response) { return; }
      this.validField('nome', 60);
    })

    this.frmCadastro.get('descricao')!.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe( response => {
      if (!response) { return; }
      this.validField('descricao', 60);
    })

  }

  getCategorias() {
    this.categoriasService.getAll().subscribe(
      response => { this.categorias = response },
      err => {
        this.matSnackBar.open(`Erro: ${err.status} - ${err.statusText} `, '',{duration: 3000, panelClass:'danger-snackbar'});
      },
      () => {
        this.matSnackBar.open(`${this.categorias.length} Categorias carregados com sucesso`, '',{duration: 3000, panelClass:'success-snackbar'});
      }
    );
  }

  getMarcas() {
    this.marcasService.getAll().subscribe(
      response => { this.marcas = response },
      err => {
        this.matSnackBar.open(`Erro: ${err.status} - ${err.statusText} `, '',{duration: 3000, panelClass:'danger-snackbar'});
      },
      () => {
        this.matSnackBar.open(`${this.marcas.length} Marcas carregados com sucesso`, '',{duration: 3000, panelClass:'success-snackbar'});
      }
    );
  }

  validField(field: string, size: number) {
    const control = this.frmCadastro.get(field);
    if (control?.value.length > size) {
      field = control?.value.substr(0, size);
      control!.setValue(field);
    }
  }

  onClick(event: any, field: string) {
    event.stopPropagation();
    const control = this.frmCadastro.get(field);
    control!.setValue('');
  }

  // create(): void {
  //   const { valid, value } = this.frmCadastro;
  //   debugger
  //   if (valid) {
  //     const produto: IProduto = {
  //       nome: value.nome,
  //       categoria: value.categoria,
  //       data: value.data,
  //       tipo: value.tipo,
  //       marca: value.marca,
  //       preco: value.preco,
  //       descricao: value.descricao,
  //     } as IProduto;
  //     this.produtosService.create(produto).subscribe(
  //       response => { this.matSnackBar.open(`${response.nome} Criado com sucesso`, '',{duration: 3000, panelClass:'success-snackbar'}); },
  //       err => {
  //         this.matSnackBar.open(`Erro: ${err.status} - ${err.statusText} `, '',{duration: 3000, panelClass:'danger-snackbar'});
  //       },
  //       )
  //   }
  // }

  create(): void {
    const { valid, value } = this.frmCadastro;
    debugger
    if (valid) {
      this.produtosService.create(value).subscribe(
        response => {
          this.matSnackBar.open(`${response.nome} Criado com sucesso`, '',{duration: 3000, panelClass:'success-snackbar'});
          this.frmCadastro.reset();
          this.matDialogRef.close('save');
        },
        err => {
          this.matSnackBar.open(`Erro: ${err.status} - ${err.statusText} `, '',{duration: 3000, panelClass:'danger-snackbar'});
        },
        )
    }
  }

  update(): void {
    const { valid, value } = this.frmCadastro;
    // const valor = parseInt(value.preco.toString().substring(3));
    if (valid) {
      this.produtosService.update(value).subscribe(
        response => {
          this.matSnackBar.open(`${response.nome} Alterado com sucesso`, '',{duration: 3000, panelClass:'success-snackbar'});
          this.frmCadastro.reset();
          this.matDialogRef.close('update');
          this.isEditing = false;
        },
        err => {
          this.matSnackBar.open(`Erro: ${err.status} - ${err.statusText} `, '',{duration: 3000, panelClass:'danger-snackbar'});
        },
        )
    }
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    if (this.mediaSub) {
      this.mediaSub.unsubscribe();
    }
  }

}
