import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/api.service';
import { Articulo } from 'src/app/core/interfaces/Articulo.interface';
import { AltaArticuloComponent } from '../dialogs/alta-articulo/alta-articulo.component';
import { EditarArticuloComponent } from '../dialogs/editar-articulo/editar-articulo.component';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})
export class ArticulosComponent {

  articulos !: Articulo[];
  articulo !: Articulo;
  private token : string;

  constructor(
    private apiService: ApiService,
    private editarArticuloDialog: MatDialog,
    private altaArticuloDialog: MatDialog,
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
        articulo: this.articulo
      }
    });

    dialogRef.componentInstance.formClosed.subscribe(() => { //recargamos
      this.cargarArticulos();
    });
  }

  cambiarEstadoArticulo(IdArticulo: number) {
    this.apiService.postCambiarEstadoArticulo(IdArticulo, this.token)
      .subscribe(response => {
        this.cargarArticulos();
      });
  }

}
