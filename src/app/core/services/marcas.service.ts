import { Injectable } from '@angular/core';
import { IMarca } from './../interfaces/marca.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  private baseUrl = `${environment.baseUrl}/marcas`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<IMarca[]> {
    return this.http.get<IMarca[]>(this.baseUrl).pipe(
      tap( response => {
        // console.log('Categorias', response);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

}
