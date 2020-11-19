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
  tableList: Array<any> = [];
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
      nzContent: ModalComponent,
      // nzAfterClose: this.onEmitterConection ,
      nzOnOk: () => console.log('Click ok')
    });

    this.modalService.afterAllClose.subscribe((e) => this.onEmitterConection(e));

    modal.afterClose.subscribe(result => {
      if (result === undefined) return;
      if( result.table ){
        console.log(result.table);
        this.tableList = result.table
      }
    });


  }



  onEmitterConection(_e){
    console.log( _e , "EMTTER")
  }

}
