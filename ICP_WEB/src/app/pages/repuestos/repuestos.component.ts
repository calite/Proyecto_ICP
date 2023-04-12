import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ApiService } from 'src/app/core/api.service';
import { Repuesto } from 'src/app/core/interfaces/Repuesto.interface';
import { EditarRepuestoComponent } from '../dialogs/editar-repuesto/editar-repuesto.component';
import { AltaRepuestoComponent } from '../dialogs/alta-repuesto/alta-repuesto.component';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.component.html',
  styleUrls: ['./repuestos.component.scss']
})
export class RepuestosComponent {

  repuestos !: Repuesto[];
  repuesto !: Repuesto;

  constructor(
    private apiService : ApiService,
    private editarRepuestoDialog: MatDialog,
    private altaRepuestoDialog: MatDialog,
  ) { }

  ngOnInit() {
    
    this.cargarRepuestos()

  }

  cargarRepuestos() {
    this.apiService.getRepuestos()
    .subscribe( repuestos => {
      this.repuestos = repuestos;
    });
  }

  crearRepuesto() {
    const dialogRef = this.altaRepuestoDialog.open(AltaRepuestoComponent);
    dialogRef.componentInstance.formClosed.subscribe(() => { //recargamos
      this.cargarRepuestos();
    });
  }

  editarRepuesto(id_Repuesto : number) {
    this.repuestos.forEach((repuesto) => {
      if (repuesto.id_Repuesto === id_Repuesto) {
        this.repuesto = repuesto;
      }
    });

    const dialogRef = this.editarRepuestoDialog.open(EditarRepuestoComponent, { 
      data: { 
        repuesto: this.repuesto
      }
    });

    dialogRef.componentInstance.formClosed.subscribe(() => { //recargamos
      this.cargarRepuestos();
    });
  }

  cambiarEstadoRepuesto(IdRepuesto : number) {
    this.apiService.postCambiarEstadoRepuesto(IdRepuesto)
      .subscribe(response => {
        if(response == -1) {
          alert('No se puede dar de baja un repuesto si aun queda stock')
        }
        this.cargarRepuestos()
      })
  }
  

}
