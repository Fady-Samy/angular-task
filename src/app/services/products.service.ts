import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewProduct } from '../Models/NewProduct';
import { ProductSearch } from '../Models/ProductSearch';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};



const formData = new FormData();

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private getUrl = 'https://bank.atc-servers.com/api/Product/GetPagedProducts';
  private cretaeUpdateUrl = 'https://bank.atc-servers.com/api/Product/CreateUpdateProduct';
  constructor(private http: HttpClient, private authService: AuthService) { }

  getPaginatedProducts(body: ProductSearch): Observable<any> {
    return this.http.post(this.getUrl, body, httpOptions);
  }

  createUpdateProduct(body: any): Observable<any> {
    Object.keys(body).forEach(key => {
      formData.append(key, body[key]);
    });

    return this.http.post(this.cretaeUpdateUrl, formData, this.authService.getHeader());
  }


}






