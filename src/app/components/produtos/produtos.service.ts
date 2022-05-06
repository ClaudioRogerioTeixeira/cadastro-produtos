import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProduto } from './produto.interface';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private baseUrl = `${environment.baseUrl}/produtos`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<IProduto[]> {
    return this.http.get<IProduto[]>(this.baseUrl).pipe(
      tap( response => {
        // console.log('Produtos tap', response);
      }),
      catchError(err => {
        return throwError(err);
      }),
      finalize( () => {
      })
    );
  }

  create(produto: IProduto): Observable<IProduto> {
    return this.http.post<IProduto>(`${this.baseUrl}`, produto).pipe(
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  update(produto: IProduto): Observable<IProduto> {
    return this.http.put<IProduto>(`${this.baseUrl}/${produto.id}`, produto).pipe(
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  delete(produto: IProduto): Observable<IProduto> {
    return this.http.delete<IProduto>(`${this.baseUrl}/${produto.id}`);
  }

}
