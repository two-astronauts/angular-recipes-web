import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  public getRecipes(): Observable<any> {
    return this.httpClient.get<any>(environment.api + '/', this.httpOptions);
  }

  public getRecipe(id: Number): Observable<any> {
    return this.httpClient.get<any>(environment.api + '/' + id, this.httpOptions);
  }

  public saveRecipe(params: any): Observable<any> {
    return this.httpClient.post<any>(environment.api + '/', params, this.httpOptions);
  }

  public updateRecipe(id: Number, params: any): Observable<any> {
    return this.httpClient.put<any>(environment.api + '/' + id, params, this.httpOptions);
  }
}
