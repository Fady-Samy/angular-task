import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Products';
import { ProductSearch } from 'src/app/Models/ProductSearch';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  page: number = 1;
  loginInfo: any;
  tokenInfo: any;

  constructor(private productsService: ProductsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginInfo = this.authService.getLoginInfo()
    this.tokenInfo = this.authService.getTokenInfo()
    console.log("login info", this.loginInfo)
    let body: ProductSearch = {
      "pageNo": this.page,
      "pageSize": 10,
      "brandCategoryId": 3
    }
    this.productsService.getPaginatedProducts(body).subscribe((result) => {
      console.log(result)
      this.products = result.Data
    });
  }

}
