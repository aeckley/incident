import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
    ) { }

  getNearbyStation(lattitude: string, longitude: string): Observable<any> {
    let params = new HttpParams();

    params = params.append('lat', lattitude);
    params = params.append('lon', longitude);

    return this.http.get('https://meteostat.p.rapidapi.com/stations/nearby', { params: params, headers: this.getHeaders() })
  }

  getWeather(station: string, start: string, end: string, tz: string): Observable<any> {
    let params = new HttpParams();
    
    params = params.append('station', station);
    params = params.append('start', start);
    params = params.append('end', end);
    params = params.append('tz', tz);

    return this.http.get('https://meteostat.p.rapidapi.com/stations/hourly', { params: params, headers: this.getHeaders() })
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('x-rapidapi-host', 'meteostat.p.rapidapi.com');
    // In production I would store api keys in a config or in an env variable
    headers = headers.append('x-rapidapi-key', 'af9fd6fba2mshd7d82655c4af8c1p1f6455jsnfdc0949bb7d7');
    return headers;
  }

  // getWeather(): Observable<any[]> {
  //   return this.http.get(this.ordersUrl)
  //     .map((resp: Response)=> resp.json())
  // }
}
