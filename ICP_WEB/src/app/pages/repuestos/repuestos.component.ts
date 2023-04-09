import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Repuestos } from 'src/app/core/interfaces/Repuestos.interface';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.component.html',
  styleUrls: ['./repuestos.component.scss']
})
export class RepuestosComponent {

  repuestos !: Repuestos[];

  constructor(
    private apiService : ApiService,
  ) { }

  ngOnInit() {
    this.apiService.getRepuestos()
      .subscribe( repuestos => {
        this.repuestos = repuestos;
      });
  }

  crearRepuesto() {

  }

  editarRepuesto(id_Repuesto : number) {
    
  }

  cambiarEstadoRepuesto(id_Repuesto : number) {
    
  }
  

}
