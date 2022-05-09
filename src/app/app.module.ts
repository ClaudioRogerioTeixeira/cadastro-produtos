import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProdutoCadastroComponent } from './components/produtos/produto-cadastro/produto-cadastro.component';
import { ProdutosGridComponent } from './components/produtos/produtos-grid/produtos-grid.component';

// import { MAT_DATE_LOCALE } from '@angular/material/core'
import {LOCALE_ID, DEFAULT_CURRENCY_CODE} from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';

import { NgxMaskModule } from 'ngx-mask';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorI18nService } from './shared/mat-paginator-i18n.service';
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from '@angular/flex-layout';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    ProdutosComponent,
    DashboardComponent,
    ProdutoCadastroComponent,
    ProdutosGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true // ao salvar, manterá a mascara
    }),
    TranslateModule.forRoot(),
  ],
  providers: [
    // { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: MatPaginatorIntl, useClass: MatPaginatorI18nService }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
