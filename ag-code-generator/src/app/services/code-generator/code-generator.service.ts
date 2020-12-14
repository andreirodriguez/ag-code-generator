import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceService } from '../http-service.service';
import { environment } from 'src/environments/environment';
import { Table } from 'src/app/models/response/table';
import { Column } from 'src/app/models/response/column';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CodeGeneratorService {
  constructor(private httpService: HttpServiceService, private httpClient: HttpClient) { }

  postConnection(request: any): Observable<Array<Table>> {
    let url = environment.api.codeGenerator + environment.codeGenerator.tableSearch;
    return this.httpService.post<Array<Table>>(`${url}`, request);
  }

  postSearchColumns(request: any): Observable<Array<Column>> {
    let url = environment.api.codeGenerator + environment.codeGenerator.columnSearch;
    return this.httpService.post<Array<Column>>(`${url}`, request);
  }

  postGenerator(request: any): Observable<any> {
    let url = environment.api.codeGenerator + environment.codeGenerator.generator;
    return this.httpService.post<any>(`${url}`, request);
  }

  postDownloadGenerator(request: any){
    let url = environment.api.codeGenerator + environment.codeGenerator.generator;
    return this.httpClient.post(url, request, {
      responseType: 'arraybuffer'
    });
  }
}