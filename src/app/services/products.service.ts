import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewProduct } from '../Models/NewProduct';
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
  private getUrl = 'https://bank.atc-servers.com/api/Product/GetPagedProducts';
  private cretaeUpdateUrl = 'https://bank.atc-servers.com/api/Product/CreateUpdateProduct';
  constructor(private http: HttpClient) { }

  getPaginatedProducts(body: ProductSearch): Observable<any> {
    return this.http.post(this.getUrl, body, httpOptions);
  }

  createUpdateProduct(body: NewProduct): Observable<any> {
    return this.http.post(this.cretaeUpdateUrl, body, httpOptions);
  }


}






