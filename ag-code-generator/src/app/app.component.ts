import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { CodeGeneratorService } from './services/code-generator/code-generator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  styles: [
    `
      [nz-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }
    `
  ]
})

export class AppComponent implements OnInit {
  searchFormGroup: FormGroup;
  tableSelected = null;
  tableList: Array<any> = [];
  isVisible: boolean;
  columns: Array<any> = [];
  tempData: any;
  tempTable: any;

  constructor(private modalService: NzModalService,
    private formBuilder: FormBuilder,
    private codeGeneratorService: CodeGeneratorService,) {
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.searchFormGroup = this.formBuilder.group({
      tablename: [null],
      entity: [""],
      project: [""]
    });
  }

  openModal() {
    this.isVisible = true;
  }

  emiteConection(event) {
    this.tempData = event.data;
    this.isVisible = false;

    var request = {
      dbType: this.tempData.dbType,
      server: this.tempData.server,
      dataBase: this.tempData.dataBase,
      userName: this.tempData.userName,
      password: this.tempData.password,
    }

    this.codeGeneratorService.postConnection(request).subscribe(response => {
      this.tableList = response;
    });
  }

  searchColumns(tablename) {
    if (tablename == null)
      return;

    this.tempTable = tablename;
    var request = {
      "connectionDb": {
        "dbType": this.tempData.dbType,
        "server": this.tempData.server,
        "dataBase": this.tempData.dataBase,
        "userName": this.tempData.userName,
        "password": this.tempData.password
      },
      "table": tablename,
      "programmingLanguage": this.tempData.languageProgramming
    };

    this.codeGeneratorService.postSearchColumns(request).subscribe(response => {
      var columnsTemp = [];
      response.forEach(col => {
        columnsTemp.push({
          "id": col.id,
          "name": col.nameEntity,
          "dataType": col.dataType,
          "nameDb": col.name,
          "dataTypeDb": col.dataTypeEntity,
          "length": col.length,
          "precision": col.precision,
          "dataTypeLength": col.dataTypeLength,
          "isNull": col.isNull
        });
      });

      this.columns = columnsTemp
    });
  }

  generate() {
    var entity = this.searchFormGroup.value.entity;
    var project = this.searchFormGroup.value.project;
    if(entity.length == 0 || project.length == 0){
      alert("Porfavor ingresar Entidad y Proyecto");
      return;
    }
    var generate = {
      "project": this.searchFormGroup.value.project,
      "dbType": this.tempData.dbType,
      "programmingLanguage": this.tempData.languageProgramming,
      "table": this.tempTable,
      "entity": this.searchFormGroup.value.entity,
      "fields": this.columns
    };

    this.codeGeneratorService.postDownloadGenerator(generate).subscribe(response => {
      this.downloadFile(response);
    });
  }

  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'application/zip' });
    const url = window.URL.createObjectURL(blob);
    var fileLink = document.createElement('a');
    fileLink.href = url;
    fileLink.download = this.searchFormGroup.value.entity + ".zip";
    fileLink.click();
  }

  setColumnValue(id, value) {
    var result = this.columns.find(x => x.id == id);
    result.isNull = value;
  }
}