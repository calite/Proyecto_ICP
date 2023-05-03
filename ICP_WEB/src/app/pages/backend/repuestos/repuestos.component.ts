import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ApiService } from 'src/app/core/services/api.service';
import { Repuesto } from 'src/app/core/interfaces/Repuesto.interface';
import { EditarRepuestoComponent } from '../../../shared/dialogs/editar-repuesto/editar-repuesto.component';
import { AltaRepuestoComponent } from '../../../shared/dialogs/alta-repuesto/alta-repuesto.component';
import { ToastService } from '../../../core/services/toast.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.component.html',
  styleUrls: ['./repuestos.component.scss']
})
export class RepuestosComponent implements OnInit {

  repuestos !: Repuesto[];
  repuesto !: Repuesto;
  private token: string;
  private datosUsuario;


  constructor(
    private apiService: ApiService,
    private editarRepuestoDialog: MatDialog,
    private altaRepuestoDialog: MatDialog,
    private toastService: ToastService,
    private sanitizer: DomSanitizer
  ) {
    this.token = sessionStorage.getItem('token');
    this.datosUsuario = JSON.parse(sessionStorage.getItem('datos'));
  }

  ngOnInit() {

    this.cargarRepuestos()

  }

  perfilActual() {
    return this.datosUsuario['id_Perfil'];
  }

  cargarRepuestos() {
    this.apiService.getRepuestos(this.token)
      .subscribe(repuestos => {
        this.repuestos = repuestos;
      });
  }

  crearRepuesto() {
    const dialogRef = this.altaRepuestoDialog.open(AltaRepuestoComponent);
    dialogRef.componentInstance.formClosed.subscribe(() => { //recargamos
      this.cargarRepuestos();
      this.toastService.toastGenerator("Aviso", "Repuesto creado correctamente", 2)
    });
  }

  editarRepuesto(id_Repuesto: number) {
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
      this.toastService.toastGenerator("Aviso", "Repuesto editado correctamente", 2)
    });
  }

  cambiarEstadoRepuesto(IdRepuesto: number) {
    this.apiService.postCambiarEstadoRepuesto(IdRepuesto, this.token)
      .subscribe(response => {
          this.cargarRepuestos()
          this.toastService.toastGenerator("Aviso", "Estado cambiado correctamente", 2)
      })
  }


  decodeImg64(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${img}`);
  }


}
