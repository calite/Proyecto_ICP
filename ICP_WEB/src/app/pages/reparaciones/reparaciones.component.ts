import { Component } from '@angular/core';

import { ApiService } from 'src/app/core/api.service';
import { Reparaciones } from 'src/app/core/interfaces/Reparaciones.interface';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html',
  styleUrls: ['./reparaciones.component.scss']
})
export class ReparacionesComponent{

  reparaciones : Reparaciones[] = [];

  /**
   *
   */
  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit() {

    this.apiService.getReparaciones()
      .subscribe( reparaciones => {
        this.reparaciones = reparaciones;

      }, (err) =>{ 
        console.log(err)
      });
      
  }

  verReparacion( id_Reparacion : string ) {
    console.log(id_Reparacion);
  }


}
