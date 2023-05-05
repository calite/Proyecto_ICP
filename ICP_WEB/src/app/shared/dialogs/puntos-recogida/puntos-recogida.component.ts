import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PuntosRecogida } from 'src/app/core/interfaces/PuntosRecogida.interface';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-puntos-recogida',
  templateUrl: './puntos-recogida.component.html',
  styleUrls: ['../dialogs-styles.scss']
})
export class PuntosRecogidaComponent implements OnInit {

  public puntosRecogida: PuntosRecogida[]
  public selectedItem: PuntosRecogida;

  @Output() formClosed = new EventEmitter<PuntosRecogida>()

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<PuntosRecogidaComponent>
  ) { }

  ngOnInit(): void {

    this.apiService.getPuntosRecogida().subscribe(response => {
      this.puntosRecogida = response
    })

  }

  onItemSelected(selectedItem) {
    const index = this.puntosRecogida.indexOf(this.selectedItem);
    this.selectedItem = selectedItem['value'][0]
  }

  onCloseDialog() {
    this.formClosed.emit(this.selectedItem);
    this.dialogRef.close();
  }

}
