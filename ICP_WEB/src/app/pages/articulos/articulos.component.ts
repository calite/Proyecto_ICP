import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Articulos } from 'src/app/core/interfaces/Articulos.interface';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})
export class ArticulosComponent {

  articulos !: Articulos[];

  constructor(
    private apiService : ApiService,
  ) { }

  ngOnInit() {
    this.apiService.getArticulos()
      .subscribe( articulos => {
        this.articulos = articulos;
      });
  }

  crearArticulo() {
    
  }

  editarArticulo(id_Articulo : number) {

  }

  cambiarEstadoArticulo(id_Articulo : number) {
    
  }

}
