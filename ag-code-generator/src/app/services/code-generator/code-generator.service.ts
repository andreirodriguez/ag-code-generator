import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceService } from '../http-service.service';
import { environment } from 'src/environments/environment';
import { Table } from 'src/app/models/response/table';

@Injectable({
    providedIn: 'root'
  })
  export class CodeGeneratorService {
    constructor(private httpService: HttpServiceService) { }

    postConnection(request: any): Observable<Array<Table>> {
        let url = environment.api.codeGenerator + environment.codeGenerator.tableSearch;
        return this.httpService.post<Array<Table>>(`${url}`, request);
    }
  }