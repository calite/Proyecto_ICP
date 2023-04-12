import { Component } from '@angular/core';

import { ApiService } from 'src/app/core/api.service';
import { Reparacion } from 'src/app/core/interfaces/Reparacion.interface';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html',
  styleUrls: ['./reparaciones.component.scss']
})
export class ReparacionesComponent{

  reparaciones : Reparacion[] = [];

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
      });
      
  }

}
