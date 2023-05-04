import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeoCode } from '../interfaces/geocode.interface';

@Injectable({
  providedIn: 'root'
})
export class ReverseGeocodeService {

  //http://nominatim.openstreetmap.org/reverse?format=json&lat=54.9824031826&lon=9.2833114795&zoom=18&addressdetails=1

  constructor(private http : HttpClient) { }

  obtenerDireccion(lat : number , lng : number ) : Observable<GeoCode> {

    const url = `http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    return this.http.get<GeoCode>(url);
  }

}
