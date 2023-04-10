import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from 'src/app/core/api.service';
import { RepuestosStock } from 'src/app/core/interfaces/RepuestosStock.interface';
import { CambiarStockComponent } from '../dialogs/cambiar-stock/cambiar-stock.component';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent {

  repuestosStock !: RepuestosStock[];

  constructor(
    private apiService : ApiService,
    private cambiarStockDialog: MatDialog
  ) { }

  ngOnInit() {
   
    this.cargarStocks()

  }

  cargarStocks() {
    this.apiService.getRepuestosStock()
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
