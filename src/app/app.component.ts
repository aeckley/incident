import { Component, OnInit, ViewChild } from '@angular/core';
import { MapAnchorPoint, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ConnectableObservable } from 'rxjs';
import { Incident } from './models/incident';
import { Weather } from './models/weather';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow | undefined
  
  public file: any;
  public incident: Incident | undefined = undefined;
  public incidentWeather: Weather | undefined = undefined;
  public addressMarker: MapMarker | undefined = undefined;
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

  constructor(
    private weatherService: WeatherService
  ) {

  }
  
  ngOnInit(): void {

  }

  public openInfo(marker: any) {
    this.infoWindow!.open(marker)
  }

  public onFileRemoved(): void {
    this.incident = undefined!;
    this.addressMarker = undefined!;
    this.incidentWeather = undefined!;

    this.center = <google.maps.LatLngLiteral>{
      lng: -77.434769,
      lat: 37.541290
    };
  }

  public onUploadFile(event: any): void {
    if (event.files && event.files.length > 0) {
      const jsonIncident: File = event.files[0]

      const fileReader = new FileReader();
      fileReader.readAsText(jsonIncident, "UTF-8");
      fileReader.onload = () => {
        this.incident = JSON.parse(fileReader.result!.toString());

        this.addressMarker = {} as MapMarker

        this.addressMarker.position = <google.maps.LatLngLiteral>{
          lng: this.incident!.address.longitude,
          lat: this.incident!.address.latitude
        };
        this.addressMarker.label = "A";

        this.addressMarker.title = this.incident!.address.common_place_name;

        this.center = <google.maps.LatLngLiteral>{
          lng: this.incident!.address.longitude,
          lat: this.incident!.address.latitude
        };

        this.weatherService.getNearbyStation(
          this.incident!.address.latitude.toString(), 
          this.incident!.address.longitude.toString()
        ).subscribe((response: any) => {
          if (response && response.data && response.data.length > 0) {
            const stationID: string = response.data[0].id;

            const apiDate: string = this.incident!.description!.event_opened.toString().split('T')[0];

            const apiTime: string = this.incident!.description!.event_opened.toString().split('T')[1].substr(0,2);

            this.weatherService.getWeather(
              stationID,
              apiDate,
              apiDate,
              'America/New_York'
            ).subscribe((weatherResponse: any) => {
              if (weatherResponse && weatherResponse.data && weatherResponse.data.length > 0) {

                const weatherAtTimeOfIncident: any = weatherResponse.data.filter((item: any) => {
                  return item.time.includes(apiTime+':00:00')
                });

                if (weatherAtTimeOfIncident && weatherAtTimeOfIncident.length > 0) {
                  this.incidentWeather = <Weather>{
                    temp: weatherAtTimeOfIncident[0].temp,
                    precipitation: weatherAtTimeOfIncident[0].prcp,
                    windspeed: weatherAtTimeOfIncident[0].wspd
                  }
                }
              }
            })

          }
        })
      }
      fileReader.onerror = (error) => {
        console.log(error);
      }
    }

  }
}
