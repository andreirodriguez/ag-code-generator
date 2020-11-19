import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CodeGeneratorService } from '../services/code-generator/code-generator.service';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
  })
  export class ModalComponent implements OnInit {
    validateForm!: FormGroup;

    emiteConection: EventEmitter<any> = new EventEmitter();

    constructor(
      private codeGeneratorService: CodeGeneratorService,
      private fb: FormBuilder,
      private modalRef: NzModalRef,
      ){
        this.validateForm = this.fb.group({
          ddlLanguageProgramming: [null , Validators.required],
          ddlEngineDb: [null , Validators.required],
          txtServerDb: [null , Validators.required],
          txtDataBaseDb: [null , Validators.required],
          txtUserNameDb: [null , Validators.required],
          txtPasswordDb: [null , Validators.required]
        });
    }

    ngOnInit(): void {
      
    }

    handleCancel(){
      console.log( this.validateForm.value );
      this.emiteConection.emit({
        name:"eeeeeee"
      });
    }

    handleOk(){
      let error = false;
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
        var status = this.validateForm.controls[i].status;
        if (status === 'INVALID') {
          error = true;
        }
      }

      if( error ) return;

      localStorage.setItem( "ddlLanguageProgramming" , this.validateForm.value.ddlLanguageProgramming );
      let data = {
        dbType: this.validateForm.value.ddlEngineDb ,
        server: this.validateForm.value.txtServerDb,
        dataBase: this.validateForm.value.txtDataBaseDb ,
        userName: this.validateForm.value.txtUserNameDb ,
        password: this.validateForm.value.txtPasswordDb
      }

      this.codeGeneratorService.postConnection(data).subscribe(
        (response: any) => {
          this.modalRef.destroy( { table: response }  )
        },
        (erro: any) => {

        } );

      // this.modalRef.destroy( { table: [{name:"exam" , id: 1}] }  )
    }
  }