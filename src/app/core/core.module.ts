import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

const CORE_COMPONENTS = [HeaderComponent, FooterComponent, LoadingComponent, PageNotFoundComponent];
const MODULES = [MaterialModule, FlexLayoutModule, RouterModule];

@NgModule({
  declarations: [ CORE_COMPONENTS, LoadingComponent, ConfirmationDialogComponent ],
  imports: [ CommonModule, MODULES ],
  exports: [ CORE_COMPONENTS],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
