import { Component, OnInit } from '@angular/core';
import { MapMarker } from '@angular/google-maps';
import { Incident } from './models/incident';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public file: any;
  public incident: Incident = undefined!;
  public addressMarker: MapMarker = undefined!;
  public center: google.maps.LatLngLiteral = <google.maps.LatLngLiteral>{
    lng: -77.434769,
    lat: 37.541290
  };

  public options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
    styles: [{
      featureType: 'poi',
      elementType: 'labels',
      stylers: [
        { visibility: "off" }
      ]
    }] as google.maps.MapTypeStyle[]
  }

  constructor() {

  }
  
  ngOnInit(): void {

  }

  public onFileRemoved(): void {
    this.incident = undefined!;
    this.addressMarker = undefined!;

    this.center = <google.maps.LatLngLiteral>{
      lng: -77.434769,
      lat: 37.541290
    };
  }

  public onUploadFile(event: any): void {
    if (event.files && event.files.length > 0) {
      const jsonIncident: File = event.files[0]
      console.log(jsonIncident);

      const fileReader = new FileReader();
      fileReader.readAsText(jsonIncident, "UTF-8");
      fileReader.onload = () => {
        this.incident = JSON.parse(fileReader.result!.toString());
        this.addressMarker = {} as MapMarker
        this.addressMarker.position = <google.maps.LatLngLiteral>{
          lng: this.incident.address.longitude,
          lat: this.incident.address.latitude
        };
        this.addressMarker.label = "Incident Address";
        this.addressMarker.title = this.incident.address.common_place_name;
        this.addressMarker.options = <google.maps.MarkerOptions> {
          animation: google.maps.Animation.BOUNCE
        }

        this.center = <google.maps.LatLngLiteral>{
          lng: this.incident.address.longitude,
          lat: this.incident.address.latitude
        };
      }
      fileReader.onerror = (error) => {
        console.log(error);
      }
    }

  }
}
