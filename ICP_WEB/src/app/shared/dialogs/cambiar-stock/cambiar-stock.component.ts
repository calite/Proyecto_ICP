import { Component, EventEmitter, Inject, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-cambiar-stock',
  templateUrl: './cambiar-stock.component.html',
  styleUrls: ['../dialogs-styles.scss']
})
export class CambiarStockComponent implements OnInit {


  formularioStock !: FormGroup;
  private token: string;
  @Output() formClosed = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<CambiarStockComponent>,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: {
      id_Repuesto: number,
      cantidad: number
    }
  ) {
    this.token = sessionStorage.getItem('token');
  }

  ngOnInit(): void {
    this.formularioStock = this.formBuilder.group({
      stock: [this.data.cantidad, Validators.required]
    });
  }

  submitFormularioStock(): void {

    if (this.formularioStock.valid) {

      var id_Repuesto = this.data.id_Repuesto;
      var cantidad = this.formularioStock.get('stock')?.value;

      this.apiService.postCambiarStockRepuesto(id_Repuesto, cantidad, this.token)
        .pipe(
          catchError(response => {

            if (response.error.retCode === 40) {
              this.toastService.toastGenerator("Error", "No se puede poner un stock negativo", 4)
            }

            throw response
          })
        )
        .subscribe((response) => {
          this.formClosed.emit(); //enviamos el aviso para que recarge
        });
      this.dialogRef.close(); //cerramos el dialog
    }



  }

}
