import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as L from 'leaflet';


@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['../dialogs-styles.scss']
})
export class MapDialogComponent implements AfterViewInit {

  @Output() formClosed = new EventEmitter<number[]>()

  private map;
  public lat = 0;
  public lng = 0;


  constructor(private dialogRef: MatDialogRef<MapDialogComponent>) { }

  ngAfterViewInit(): void {
    this.initMap()
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [40.29628651711716, -3.6474609375000004],
      zoom: 5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    var marks = L.layerGroup();

    this.map.addLayer(marks);

    this.map.on('click', (e) => {

      var marksCounter = marks.getLayers().length;

      if (marksCounter < 1) {

        var marker = L.marker(e.latlng).addTo(marks);

        this.lat = marker['_latlng'].lat
        this.lng = marker['_latlng'].lng

        return;

      }

      marks.clearLayers();

    });

  }

  onCloseDialog() {
    this.formClosed.emit([this.lat,this.lng]);
    this.dialogRef.close();
  }



}
