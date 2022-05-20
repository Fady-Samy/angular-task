import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/Products';
import { ProductSearch } from 'src/app/Models/ProductSearch';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
declare var window: any;

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
  userName: string;
  isAdmin: boolean;
  display: string = "none";
  formModal: any;
  createModal: boolean = false;;
  updateModal: boolean = false;
  modalTitle: string;
  modalBtnText: string;


  productForm = new FormGroup({
    nameAr: new FormControl('', Validators.required),
    nameEn: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    barcode: new FormControl('', Validators.required),
    runningBalance: new FormControl('', Validators.required),
    points: new FormControl('', Validators.required),
    minQuantity: new FormControl('', Validators.required),
    maxQuantity: new FormControl('', Validators.required),
    policyAr: new FormControl('', Validators.required),
    policyEn: new FormControl('', Validators.required),
    descriptionAr: new FormControl('', Validators.required),
    descriptionEn: new FormControl('', Validators.required),
    productPhoto: new FormControl(''),
    photo: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
    isActive: new FormControl(false, Validators.required),
    endUserPrice: new FormControl('', Validators.required),
  })

  constructor(private productsService: ProductsService, private authService: AuthService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("editModal")
    )
    if (this.authService.isLoggedIn()) {
      this.userName = this.authService.getUserName()!;
      this.isAdmin = this.authService.isUserAdmin()!;

      let body: ProductSearch = {
        "pageNo": this.page,
        "pageSize": 10,
        "brandCategoryId": 3
      }
      this.productsService.getPaginatedProducts(body).subscribe((result) => {
        console.log(result)
        this.products = result.Data
      });
    } else {
      this.router.navigate(["/"])
    }

  }

  //Show Modal Functions
  openModal(action: string) {
    if (action === "create") {
      this.createModal = true;
      this.updateModal = false;
      this.modalTitle = "Create New Product";
      this.modalBtnText = "Create Product";

    } else {
      this.createModal = false;
      this.updateModal = true;
      this.modalTitle = "Edit Product";
      this.modalBtnText = "Save changes";


    }
    this.formModal.show();
  }
  closeModal() {
    this.formModal.hide();
  }

  //Forms Functions
  get nameAr() {
    return this.productForm.get("nameAr")
  }

  get nameEn() {
    return this.productForm.get("nameEn")
  }

  get code() {
    return this.productForm.get("code")
  }
  get barcode() {
    return this.productForm.get("barcode")
  }
  get runningBalance() {
    return this.productForm.get("runningBalance")
  }
  get points() {
    return this.productForm.get("points")
  }
  get minQuantity() {
    return this.productForm.get("minQuantity")
  }
  get maxQuantity() {
    return this.productForm.get("maxQuantity")
  }
  get policyAr() {
    return this.productForm.get("policyAr")
  }
  get policyEn() {
    return this.productForm.get("policyEn")
  }
  get descriptionAr() {
    return this.productForm.get("descriptionAr")
  }
  get descriptionEn() {
    return this.productForm.get("descriptionEn")
  }
  get productPhoto() {
    return this.productForm.get("productPhoto")
  }
  get photo() {
    return this.productForm.get("photo")
  }
  get userId() {
    return this.productForm.get("userId")
  }
  get isActive() {
    return this.productForm.get("isActive")
  }
  get endUserPrice() {
    return this.productForm.get("endUserPrice")
  }

  // Other Functions
  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }


  handleSubmit() {
    if (this.createModal) {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }

  createProduct() {
    let productDetails = {
      NameAr: this.nameAr?.value,
      NameEn: this.nameEn?.value,
      Code: this.code?.value,
      Barcode: this.barcode?.value,
      RunningBalance: this.runningBalance?.value,
      Points: this.points?.value,
      MinQuantityAlarm: this.minQuantity?.value,
      MaxQuantityAlarm: this.maxQuantity?.value,
      PolicyAr: this.policyAr?.value,
      PolicyEn: this.policyEn?.value,
      DescriptionAr: this.descriptionAr?.value,
      DescriptionEn: this.descriptionEn?.value,
      ProductPhoto: this.productPhoto?.value,
      Photo: this.photo?.value,
      UserId: this.userId?.value,
      IsActive: this.isActive?.value,
      EndUserPrice: this.endUserPrice?.value,
    }
    // console.log(productDetails);
    this.spinner.show();
    this.productsService
      .createUpdateProduct(productDetails)
      .subscribe(
        (result) => {
          console.log(result);
          this.productForm.reset();

          this.spinner.hide();

          this.closeModal()
        }
      );

  }

  updateProduct() {

  }


}
