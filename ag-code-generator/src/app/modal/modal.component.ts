import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CodeGeneratorService } from '../services/code-generator/code-generator.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
  })
  export class ModalComponent implements OnInit {

    constructor(
      private codeGeneratorService: CodeGeneratorService,
      private fb: FormBuilder){
    }

    validateForm!: FormGroup;

    ngOnInit(): void {
      this.validateForm = this.fb.group({
        email: [null, [Validators.email, Validators.required]]
      });
    }

    handleCancel(){
      console.log(this.validateForm.value);
    }

    handleOk(){
      let data = {
        "test": "test"
      }
      
      this.codeGeneratorService.postConnection(data).subscribe((response: any) => {

      });
    }
  }