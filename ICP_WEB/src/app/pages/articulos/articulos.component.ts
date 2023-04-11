import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Articulo } from 'src/app/core/interfaces/Articulo.interface';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})
export class ArticulosComponent {

  articulos !: Articulo[];

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

  editarArticulo(IdArticulo : number) {

  }

  cambiarEstadoArticulo(IdArticulo : number) {
    
  }

}
