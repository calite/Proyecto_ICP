import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ApiService } from 'src/app/core/services/api.service';
import { Repuesto } from 'src/app/core/interfaces/Repuesto.interface';
import { EditarRepuestoComponent } from '../../../components/editar-repuesto/editar-repuesto.component';
import { AltaRepuestoComponent } from '../../../components/alta-repuesto/alta-repuesto.component';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.component.html',
  styleUrls: ['./repuestos.component.scss']
})
export class RepuestosComponent implements OnInit {

  repuestos !: Repuesto[];
  repuesto !: Repuesto;
  private token : string;
  private datosUsuario;


  constructor(
    private apiService : ApiService,
    private editarRepuestoDialog: MatDialog,
    private altaRepuestoDialog: MatDialog,
  ) {
    this.token = sessionStorage.getItem('token');
    this.datosUsuario = JSON.parse(sessionStorage.getItem('datos'));
   }

  ngOnInit() {
    
    this.cargarRepuestos()

  }

  perfilActual(){
    return this.datosUsuario['id_Perfil'];
  }

  cargarRepuestos() {
    this.apiService.getRepuestos(this.token)
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
    this.apiService.postCambiarEstadoRepuesto(IdRepuesto, this.token)
      .subscribe(response => {
        if(response == -1) {
          alert('No se puede dar de baja un repuesto si aun queda stock')
        }
        this.cargarRepuestos()
      })
  }
  

}
