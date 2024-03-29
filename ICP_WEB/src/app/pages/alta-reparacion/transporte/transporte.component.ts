import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GeoCode } from 'src/app/core/interfaces/geocode.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { ReverseGeocodeService } from 'src/app/core/services/reverse-geocode.service';
import { MapDialogComponent } from '../../../shared/dialogs/map-dialog/map-dialog.component';
import { ToastService } from '../../../core/services/toast.service';
import { PuntosRecogidaComponent } from '../../../shared/dialogs/puntos-recogida/puntos-recogida.component';

@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.component.html',
  styleUrls: ['./transporte.component.scss']
})
export class TransporteComponent {

  formularioAltaReparacion: FormGroup;
  direccionRecogida: GeoCode;
  escoderBotones = false;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private mapDialog: MatDialog,
    private puntosDialog: MatDialog,
    private geoCodeService: ReverseGeocodeService,
    private toastService: ToastService
  ) { // se genera el form en el constructor
    this.formularioAltaReparacion = this.formBuilder.group({

      duplicar_valores: [localStorage.getItem('duplicar_valores')],

      recogida_calle: [localStorage.getItem('Recogida_Calle'), Validators.required],
      recogida_numero: [localStorage.getItem('Recogida_Numero'), Validators.required],
      recogida_poblacion: [localStorage.getItem('Recogida_Poblacion'), Validators.required],
      recogida_provincia: [localStorage.getItem('Recogida_Provincia'), Validators.required],
      recogida_codigo_postal: [localStorage.getItem('Recogida_Codigo_Postal'), Validators.required],
      recogida_persona_contacto: [localStorage.getItem('Recogida_Persona_Contacto'), Validators.required],
      recogida_telefono: [localStorage.getItem('Recogida_Telefono'), Validators.required],

      envio_calle: [localStorage.getItem('Envio_Calle'), Validators.required],
      envio_numero: [localStorage.getItem('Envio_Numero'), Validators.required],
      envio_poblacion: [localStorage.getItem('Envio_Poblacion'), Validators.required],
      envio_provincia: [localStorage.getItem('Envio_Provincia'), Validators.required],
      envio_codigo_postal: [localStorage.getItem('Envio_Codigo_Postal'), Validators.required],
      envio_persona_contacto: [localStorage.getItem('Envio_Persona_Contacto'), Validators.required],
      envio_telefono: [localStorage.getItem('Envio_Telefono'), Validators.required]
    });

    this.duplicarValores()

  }

  duplicarValores() {

    if (!this.escoderBotones) this.escoderBotones = true
    else this.escoderBotones = false

    if (this.formularioAltaReparacion.controls.duplicar_valores.value) {
      this.formularioAltaReparacion.controls.envio_calle.setValue(this.formularioAltaReparacion.controls.recogida_calle.value)
      this.formularioAltaReparacion.controls.envio_calle.disable()

      this.formularioAltaReparacion.controls.envio_numero.setValue(this.formularioAltaReparacion.controls.recogida_numero.value)
      this.formularioAltaReparacion.controls.envio_numero.disable()

      this.formularioAltaReparacion.controls.envio_poblacion.setValue(this.formularioAltaReparacion.controls.recogida_poblacion.value)
      this.formularioAltaReparacion.controls.envio_poblacion.disable()

      this.formularioAltaReparacion.controls.envio_provincia.setValue(this.formularioAltaReparacion.controls.recogida_provincia.value)
      this.formularioAltaReparacion.controls.envio_provincia.disable()

      this.formularioAltaReparacion.controls.envio_codigo_postal.setValue(this.formularioAltaReparacion.controls.recogida_codigo_postal.value)
      this.formularioAltaReparacion.controls.envio_codigo_postal.disable()

      this.formularioAltaReparacion.controls.envio_persona_contacto.setValue(this.formularioAltaReparacion.controls.recogida_persona_contacto.value)
      this.formularioAltaReparacion.controls.envio_persona_contacto.disable()

      this.formularioAltaReparacion.controls.envio_telefono.setValue(this.formularioAltaReparacion.controls.recogida_telefono.value)
      this.formularioAltaReparacion.controls.envio_telefono.disable()

    } else {
      this.formularioAltaReparacion.controls.envio_calle.enable()
      this.formularioAltaReparacion.controls.envio_numero.enable()
      this.formularioAltaReparacion.controls.envio_poblacion.enable()
      this.formularioAltaReparacion.controls.envio_provincia.enable()
      this.formularioAltaReparacion.controls.envio_codigo_postal.enable()
      this.formularioAltaReparacion.controls.envio_persona_contacto.enable()
      this.formularioAltaReparacion.controls.envio_telefono.enable()
    }


  }

  submitFormularioAltaReparacion() {

    if (this.formularioAltaReparacion.valid) {
      //guardamos datos en local
      localStorage.setItem('duplicar_valores', this.formularioAltaReparacion.controls.duplicar_valores.value)

      localStorage.setItem('Recogida_Calle', this.formularioAltaReparacion.controls.recogida_calle.value)
      localStorage.setItem('Recogida_Numero', this.formularioAltaReparacion.controls.recogida_numero.value)
      localStorage.setItem('Recogida_Poblacion', this.formularioAltaReparacion.controls.recogida_poblacion.value)
      localStorage.setItem('Recogida_Provincia', this.formularioAltaReparacion.controls.recogida_provincia.value)
      localStorage.setItem('Recogida_Codigo_Postal', this.formularioAltaReparacion.controls.recogida_codigo_postal.value)
      localStorage.setItem('Recogida_Persona_Contacto', this.formularioAltaReparacion.controls.recogida_persona_contacto.value)
      localStorage.setItem('Recogida_Telefono', this.formularioAltaReparacion.controls.recogida_telefono.value)

      localStorage.setItem('Envio_Calle', this.formularioAltaReparacion.controls.envio_calle.value)
      localStorage.setItem('Envio_Numero', this.formularioAltaReparacion.controls.envio_numero.value)
      localStorage.setItem('Envio_Poblacion', this.formularioAltaReparacion.controls.envio_poblacion.value)
      localStorage.setItem('Envio_Provincia', this.formularioAltaReparacion.controls.envio_provincia.value)
      localStorage.setItem('Envio_Codigo_Postal', this.formularioAltaReparacion.controls.envio_codigo_postal.value)
      localStorage.setItem('Envio_Persona_Contacto', this.formularioAltaReparacion.controls.envio_persona_contacto.value)
      localStorage.setItem('Envio_Telefono', this.formularioAltaReparacion.controls.envio_telefono.value)

      var json = {}

      json['Id_Articulo'] = localStorage.getItem('Id_Articulo')

      json['Recogida_Calle'] = this.formularioAltaReparacion.controls.recogida_calle.value;
      json['Recogida_Numero'] = this.formularioAltaReparacion.controls.recogida_numero.value;
      json['Recogida_Poblacion'] = this.formularioAltaReparacion.controls.recogida_poblacion.value;
      json['Recogida_Provincia'] = this.formularioAltaReparacion.controls.recogida_provincia.value;
      json['Recogida_Codigo_Postal'] = this.formularioAltaReparacion.controls.recogida_codigo_postal.value;
      json['Recogida_Persona_Contacto'] = this.formularioAltaReparacion.controls.recogida_persona_contacto.value;
      json['Recogida_Telefono'] = this.formularioAltaReparacion.controls.recogida_telefono.value;

      json['Envio_Calle'] = this.formularioAltaReparacion.controls.envio_calle.value;
      json['Envio_Numero'] = this.formularioAltaReparacion.controls.envio_numero.value;
      json['Envio_Poblacion'] = this.formularioAltaReparacion.controls.envio_poblacion.value;
      json['Envio_Provincia'] = this.formularioAltaReparacion.controls.envio_provincia.value;
      json['Envio_Codigo_Postal'] = this.formularioAltaReparacion.controls.envio_codigo_postal.value;
      json['Envio_Persona_Contacto'] = this.formularioAltaReparacion.controls.envio_persona_contacto.value;
      json['Envio_Telefono'] = this.formularioAltaReparacion.controls.envio_telefono.value;

      //sintomas
      let sintomasCache = JSON.parse(localStorage.getItem('Sintomas'))
      let sintomasSeleccionados = [];
      let repuestosCache = JSON.parse(localStorage.getItem('Repuestos'))
      let repuestosNecesarios = [];

      for (let i = 0; i < sintomasCache.length; i++) {

        if (sintomasCache[i] != 0) {
          sintomasSeleccionados.push(sintomasCache[i])
          repuestosNecesarios.push(repuestosCache[i])
        }

      }

      json['Sintomas'] = sintomasSeleccionados
      json['Repuestos'] = repuestosNecesarios

      this.apiService.postAltaReparacion(json).subscribe(x => {
        alert('Reparacion creada.')
        localStorage.clear();
        this.router.navigate(['.'])
      });

    }

  }

  abrirMapaRecogida() {
    const dialogRef = this.mapDialog.open(MapDialogComponent)
    dialogRef.componentInstance.formClosed.subscribe(response => {

      this.reverseGeocode(response[0], response[1]).subscribe(resp => {
        this.direccionRecogida = resp

        console.log(this.direccionRecogida)

        this.formularioAltaReparacion.controls.recogida_calle.setValue(resp.address.road)
        this.formularioAltaReparacion.controls.recogida_numero.setValue(resp.address.house_number)
        this.formularioAltaReparacion.controls.recogida_poblacion.setValue(resp.address['city'])
        this.formularioAltaReparacion.controls.recogida_provincia.setValue(resp.address.state)
        this.formularioAltaReparacion.controls.recogida_codigo_postal.setValue(resp.address.postcode)

        this.toastService.toastGenerator('Aviso', 'Revise los campos de la recogida antes de continuar', 2)
      })
    })
  }

  abrirMapaEnvio() {
    const dialogRef = this.mapDialog.open(MapDialogComponent)
    dialogRef.componentInstance.formClosed.subscribe(response => {

      this.reverseGeocode(response[0], response[1]).subscribe(resp => {
        this.direccionRecogida = resp

        this.formularioAltaReparacion.controls.envio_calle.setValue(resp.address.road)
        this.formularioAltaReparacion.controls.envio_numero.setValue(resp.address.house_number)
        this.formularioAltaReparacion.controls.envio_poblacion.setValue(resp.address['city'])
        this.formularioAltaReparacion.controls.envio_provincia.setValue(resp.address.state)
        this.formularioAltaReparacion.controls.envio_codigo_postal.setValue(resp.address.postcode)

        this.toastService.toastGenerator('Aviso', 'Revise los campos de la recogida antes de continuar', 2)
      })
    })
  }

  abrirPuntosRecogida() {
    const dialogRef = this.puntosDialog.open(PuntosRecogidaComponent)
    dialogRef.componentInstance.formClosed.subscribe(response => {

      this.formularioAltaReparacion.controls.recogida_calle.setValue(response.direccion)
      this.formularioAltaReparacion.controls.recogida_numero.setValue(0)
      this.formularioAltaReparacion.controls.recogida_poblacion.setValue(response.nombre_Ciudad)
      this.formularioAltaReparacion.controls.recogida_provincia.setValue(response.provincia)
      this.formularioAltaReparacion.controls.recogida_codigo_postal.setValue(response.codigo_Postal)
    })
  }

  abrirPuntosEnvio() {
    const dialogRef = this.puntosDialog.open(PuntosRecogidaComponent)
    dialogRef.componentInstance.formClosed.subscribe(response => {

      this.formularioAltaReparacion.controls.envio_calle.setValue(response.direccion)
      this.formularioAltaReparacion.controls.envio_numero.setValue(0)
      this.formularioAltaReparacion.controls.envio_poblacion.setValue(response.nombre_Ciudad)
      this.formularioAltaReparacion.controls.envio_provincia.setValue(response.provincia)
      this.formularioAltaReparacion.controls.envio_codigo_postal.setValue(response.codigo_Postal)
    })
  }

  reverseGeocode(lat, lng): Observable<GeoCode> {

    return this.geoCodeService.obtenerDireccion(lat, lng)

  }

  atras() {
    this.router.navigate(['./alta-reparacion/sintomas'])
  }

}
