import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-cambiar-stock',
  templateUrl: './cambiar-stock.component.html',
  styleUrls: ['./cambiar-stock.component.scss']
})
export class CambiarStockComponent {


  formularioStock !: FormGroup;

  @Output() formClosed = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<CambiarStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      id_Repuesto: number,
      cantidad: number
    }
  ) { }

  ngOnInit(): void {
    this.formularioStock = this.formBuilder.group({
      stock: [this.data.cantidad, Validators.required]
    });
  }

  submitFormularioStock(): void {

    if (this.formularioStock.valid) {

      var id_Repuesto = this.data.id_Repuesto;
      var cantidad = this.formularioStock.get('stock')?.value;

      this.apiService.postCambiarStockRepuesto(id_Repuesto, cantidad)
        .subscribe((response) => {
          this.formClosed.emit(); //enviamos el aviso para que recarge
        });
      this.dialogRef.close(); //cerramos el dialog
    }



  }

}
