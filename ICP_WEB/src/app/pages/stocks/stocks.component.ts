import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { RepuestosStock } from 'src/app/core/interfaces/RepuestosStock.interface';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent {

  repuestosStock !: RepuestosStock[];

  constructor(
    private apiService : ApiService,
  ) { }

  ngOnInit() {
    this.apiService.getRepuestosStock()
      .subscribe( repuestosStock => {
        this.repuestosStock = repuestosStock;
      });
  }

  cambiarStock(id_Repuesto : number) {
    
  }

}
