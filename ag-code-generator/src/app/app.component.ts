import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { ModalComponent } from './modal/modal.component';
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
      entity: [null]
    });
  }

  openModal() {
    this.isVisible = true;
  }

  emiteConection(event) {
    console.log(event);

    this.tempData = event.data;
    this.isVisible = false;

    var request = {
      dbType: event.data,
      server: event.server,
      dataBase: event.dataBase,
      userName: event.userName,
      password: event.password,
    }

    this.codeGeneratorService.getSearchColumns(request).subscribe(response => {
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

    this.codeGeneratorService.getSearchColumns(request).subscribe(response => {
      this.columns = response;
    });
  }

  generate() {
    console.log(this.searchFormGroup);
    var generate = {
      "project": "Advance",
      "dbType": this.tempData.dbType,
      "programmingLanguage": this.tempData.languageProgramming,
      "table": this.tempTable,
      "entity": this.searchFormGroup.value.entity,
      "fields": this.columns
    };

    console.log(generate)

    this.codeGeneratorService.postGenerator(generate).subscribe(response => {
      this.downloadFile(response);
    });
  }

  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  setColumnValue(id, value) {
    console.log("aqui");
    var result = this.columns.find(x => x.id == id);
    result.isNull = value;
  }


}
