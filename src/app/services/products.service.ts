import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewProduct } from '../Models/NewProduct';
import { ProductSearch } from '../Models/ProductSearch';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJhMTUwN2UwMS1jNmQyLTQ0NWYtYjU2Yi1kMmIyODU5NDNmZTAiLCJVc2VyTmFtZSI6IkZhZHkiLCJyb2xlIjoiQWRtaW4iLCJQZXJtaXNzaW9uIjpbIlByb2R1Y3QuQ3JlYXRlIiwiQnJhbmQuQ3JlYXRlIiwiQ2F0ZWdvcnkuQ3JlYXRlIl0sIm5iZiI6MTY1MzA1NzAwNywiZXhwIjoxNjUzMTQzNDA3LCJpYXQiOjE2NTMwNTcwMDd9.2JOHQnFBpCgPBlJ-AqZpRvzRW4WHhGnT-6dDgJShmwo"
  }),
};

const createheader = {
  headers: new HttpHeaders({
    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJhMTUwN2UwMS1jNmQyLTQ0NWYtYjU2Yi1kMmIyODU5NDNmZTAiLCJVc2VyTmFtZSI6IkZhZHkiLCJyb2xlIjoiQWRtaW4iLCJQZXJtaXNzaW9uIjpbIlByb2R1Y3QuQ3JlYXRlIiwiQnJhbmQuQ3JlYXRlIiwiQ2F0ZWdvcnkuQ3JlYXRlIl0sIm5iZiI6MTY1MzA1NzAwNywiZXhwIjoxNjUzMTQzNDA3LCJpYXQiOjE2NTMwNTcwMDd9.2JOHQnFBpCgPBlJ-AqZpRvzRW4WHhGnT-6dDgJShmwo"
  }),
};

const formData = new FormData();

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

  createUpdateProduct(body: any): Observable<any> {
    Object.keys(body).forEach(key => {
      formData.append(key, body[key]);
    });

    return this.http.post(this.cretaeUpdateUrl, formData, createheader);
  }


}






