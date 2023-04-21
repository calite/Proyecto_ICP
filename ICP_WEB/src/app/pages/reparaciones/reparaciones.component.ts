import { Component } from '@angular/core';

import { ApiService } from 'src/app/core/services/api.service';
import { Reparacion } from 'src/app/core/interfaces/Reparacion.interface';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html',
  styleUrls: ['./reparaciones.component.scss']
})
export class ReparacionesComponent{

  reparaciones !: Reparacion[];
  private token : string;

  
  constructor(
    private apiService: ApiService,
  ) {
    this.token = sessionStorage.getItem('token');
   }

  ngOnInit() {

    this.apiService.getReparaciones(this.token)
      .subscribe( reparaciones => {
        this.reparaciones = reparaciones;
      });
      
  }

}
