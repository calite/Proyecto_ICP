import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from 'src/app/core/services/api.service';
import { RepuestoStock } from 'src/app/core/interfaces/RepuestoStock.interface';
import { CambiarStockComponent } from '../../../shared/dialogs/cambiar-stock/cambiar-stock.component';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {

  repuestosStock !: RepuestoStock[];
  private token : string;
  private datosUsuario;

  constructor(
    private apiService : ApiService,
    private cambiarStockDialog: MatDialog
  ) { 
    this.token = sessionStorage.getItem('token');
    this.datosUsuario = JSON.parse(sessionStorage.getItem('datos'));
  }

  ngOnInit() {
   
    this.cargarStocks()

  }

  perfilActual(){
    return this.datosUsuario['id_Perfil'];
  }

  cargarStocks() {
    this.apiService.getRepuestosStock(this.token)
    .subscribe( repuestosStock => {
      this.repuestosStock = repuestosStock;
    });
  }

  cambiarStock(id_Repuesto : number , cantidad : number) {
    const dialogRef = this.cambiarStockDialog.open(CambiarStockComponent, { 
      data: { id_Repuesto: id_Repuesto, cantidad: cantidad }
    });

    dialogRef.componentInstance.formClosed.subscribe(() => { //recargamos
      this.cargarStocks();
    });

  }

}
