import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { Articulo } from 'src/app/core/interfaces/Articulo.interface';
import { AltaArticuloComponent } from '../../../shared/dialogs/alta-articulo/alta-articulo.component';
import { EditarArticuloComponent } from '../../../shared/dialogs/editar-articulo/editar-articulo.component';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})
export class ArticulosComponent implements OnInit {

  articulos !: Articulo[];
  articulo !: Articulo;
  private token : string;

  constructor(
    private apiService: ApiService,
    private editarArticuloDialog: MatDialog,
    private altaArticuloDialog: MatDialog,
    private toastService : ToastService
  ) { 
    this.token = sessionStorage.getItem('token');
  }

  ngOnInit() {

    this.cargarArticulos();

  }

  cargarArticulos() {
    this.apiService.getArticulos()
      .subscribe(articulos => {
        this.articulos = articulos;
      });
  }

  crearArticulo() {
    const dialogRef = this.altaArticuloDialog.open(AltaArticuloComponent);
    dialogRef.componentInstance.formClosed.subscribe(() => { //recargamos
      this.cargarArticulos();
      this.toastService.toastGenerator("Aviso", "Artículo creado correctamente", 2)
    });
  }

  editarArticulo(id_Articulo: number) {
    this.articulos.forEach((articulo) => {
      if (articulo.id_Articulo === id_Articulo) {
        this.articulo = articulo;
      }
    });

    const dialogRef = this.editarArticuloDialog.open(EditarArticuloComponent, {
      data: {
        articulo: this.articulo,
      }
    });
    
    dialogRef.componentInstance.formClosed.subscribe(() => { //recargamos
      this.cargarArticulos();
      this.toastService.toastGenerator("Aviso", "Artículo editado correctamente", 2)
    });
  }

  cambiarEstadoArticulo(IdArticulo: number) {
    this.apiService.postCambiarEstadoArticulo(IdArticulo, this.token)
      .subscribe(response => {
        this.cargarArticulos();

        if(response == -1) {
          this.toastService.toastGenerator("Error", "No se pudo cambiar el estado", 4)
        } else {
          this.toastService.toastGenerator("Aviso", "Estado cambiado correctamente", 2)
        }

      });
  }

}
