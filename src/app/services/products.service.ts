import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSearch } from '../Models/ProductSearch';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://bank.atc-servers.com/api/Product/GetPagedProducts';
  constructor(private http: HttpClient) { }

  getPaginatedProducts(body: ProductSearch): Observable<any> {
    return this.http.post(this.apiUrl, body, httpOptions);
  }
}






