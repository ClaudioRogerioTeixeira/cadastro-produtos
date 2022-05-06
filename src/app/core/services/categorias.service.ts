import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { ICategoria } from '../interfaces/categoria.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private baseUrl = `${environment.baseUrl}/categorias`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ICategoria[]> {
    return this.http.get<ICategoria[]>(this.baseUrl).pipe(
      tap( response => {
        // console.log('Categorias', response);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

}
