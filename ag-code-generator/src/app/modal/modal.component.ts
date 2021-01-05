import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  connectionForm!: FormGroup;

  @Output() valuesEmit: EventEmitter<any> = new EventEmitter();
  @Input() isVisible: boolean;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.connectionForm = this.formBuilder.group({
      ddlLanguageProgramming: [null, Validators.required],
      ddlEngineDb: [null, Validators.required],
      txtServerDb: [null, Validators.required],
      txtDataBaseDb: [null, Validators.required],
      txtUserNameDb: [null, Validators.required],
      txtPasswordDb: [null, Validators.required]
    });
  }

  btnCancel() {
    this.valuesEmit.emit({
      data: null
    });
  }

  btnOk() {

    if (!this.validForm())
      return;

    // localStorage.setItem("ddlLanguageProgramming", this.connectionForm.value.ddlLanguageProgramming);
    let data = {
      "dbType": this.connectionForm.value.ddlEngineDb,
      "server": this.connectionForm.value.txtServerDb,
      "dataBase": this.connectionForm.value.txtDataBaseDb,
      "userName": this.connectionForm.value.txtUserNameDb,
      "password": this.connectionForm.value.txtPasswordDb,
      "languageProgramming" : this.connectionForm.value.ddlLanguageProgramming
    }

    this.valuesEmit.emit({
      data: data
    });
  }

  validForm() {
    let errors = [];
    for (const i in this.connectionForm.controls) {
      this.connectionForm.controls[i].markAsDirty();
      this.connectionForm.controls[i].updateValueAndValidity();
      let status = this.connectionForm.controls[i].status;
      if (status === 'INVALID') {
        errors.push(status);
      }
    }
    return errors.length === 0 ? true : false;
  }

}