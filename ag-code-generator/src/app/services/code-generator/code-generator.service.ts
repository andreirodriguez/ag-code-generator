import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceService } from '../http-service.service';
import { environment } from 'src/environments/environment';
import { Table } from 'src/app/models/response/table';
import { Column } from 'src/app/models/response/column';

@Injectable({
  providedIn: 'root'
})
export class CodeGeneratorService {
  constructor(private httpService: HttpServiceService) { }

  postConnection(request: any): Observable<Array<Table>> {
    let url = environment.api.codeGenerator + environment.codeGenerator.tableSearch;
    return this.httpService.post<Array<Table>>(`${url}`, request);
  }

  getSearchColumns(request: any): Observable<Array<Column>> {
    let url = environment.api.codeGenerator + environment.codeGenerator.columnSearch;
    return this.httpService.get<Array<Column>>(`${url}`);
  }

  postGenerator(request: any): Observable<any> {
    let url = environment.api.codeGenerator + environment.codeGenerator.generator;
    return this.httpService.post<any>(`${url}`, request);
  }
}