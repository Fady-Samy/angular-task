import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/Models/Products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() isAdmin: boolean;
  @Output() onSelectProduct: EventEmitter<Product> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  selectProduct() {
    //Only Admins can update product
    if (this.isAdmin) {
      this.onSelectProduct.emit(this.product);
    }

  }

}
