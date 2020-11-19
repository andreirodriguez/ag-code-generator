import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  
export class AppComponent implements OnInit
{
  title = "Generador de Código";
  tableSelected = null;

  constructor(private modalService: NzModalService)
  {
    
  }

  ngOnInit(): void
  {
    
  }

  openConectionModal()
  {
    const modal = this.modalService.create({
      nzTitle: "Conexión de base de datos",
      nzContent: ModalComponent
    });

    modal.afterClose.subscribe(result => {
      if (result === undefined) return;
    });
  }

}
