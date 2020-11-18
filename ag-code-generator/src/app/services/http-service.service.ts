import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private httpClient: HttpClient) { }

  public get<T>(url: string, options: any = {}): Observable<T> {
    return this.httpClient.get<T>(url, options).pipe(
      map((res: any) => { return res; }),
      catchError(this.handleError)
    );
  }

  public post<T>(url: string, data: any, options?: any): Observable<T> {
    return this.httpClient.post(url, data, options).pipe(
      map((res: any) => { return res; }),
      catchError(this.handleError)
    );
  }

  public put<T>(url: string, data: any, options?: any): Observable<T> {
    return this.httpClient.put(url, data, options).pipe(
      map((res: any) => { return res; }),
      catchError(this.handleError)
    );
  }

  public delete<T>(url: string, options?: any): Observable<T> {
    return this.httpClient.delete(url, options).pipe(
      map((res: any) => { return res; }),
      catchError(this.handleError)
    );
  }

  private handleError(httpError: HttpErrorResponse) {
    if (httpError.error instanceof ErrorEvent) {
      return throwError(httpError.error.message);
    } else {
      if (httpError.status == 401)
        return throwError('No Autorizado');
      else
        return throwError(httpError.error);
    }
  };
}
