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

  //Variables Declaratoin
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
  imageChoosed: any;
  selectedProduct: any = null;

  // bootstrap toast variables
  showToast: boolean = false;
  toastTitle: string;
  toastMessage: string;
  toastClass: string;


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
    productPhoto: new FormControl(null, Validators.required),
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

      this.getProductsPerPage()
    } else {
      this.router.navigate(["/"])
    }

  }

  //Getting products function
  getProductsPerPage() {
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

  //Show Modal Functions
  openModal(action: string, product: any) {
    if (action === "create") {
      this.createModal = true;
      this.updateModal = false;
      this.modalTitle = "Create New Product";
      this.modalBtnText = "Create Product";
      this.selectedProduct = null
      //remove values from update modal (in case opened update modal first)
      this.productForm.reset()

    } else {
      this.createModal = false;
      this.updateModal = true;
      this.modalTitle = "Edit Product";
      this.modalBtnText = "Save changes";
      this.selectedProduct = product;
      this.setFormValuesFromProduct(product)
      console.log(this.selectedProduct);
    }
    this.formModal.show();
  }
  closeModal() {
    this.formModal.hide();
  }

  setFormValuesFromProduct(product: any) {
    this.productForm.get("nameAr")?.setValue(product.ProductName)
    this.productForm.get("nameEn")?.setValue(product.ProductName)
    this.productForm.get("code")?.setValue(product.Code)
    this.productForm.get("descriptionAr")?.setValue(product.Description)
    this.productForm.get("descriptionEn")?.setValue(product.Description)
    this.productForm.get("endUserPrice")?.setValue(product.EndUserPrice)
  }

  //Form Functions
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

  //Get the photo selected from product photo field
  fileChange(event: any): void {
    const fileList: FileList = event.target.files;
    this.imageChoosed = fileList[0];
  }

  //Return new/update product body object 
  getProductDetailsbody() {
    return {
      BrandId: 2,
      CategoryId: 2,
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
      ProductPhoto: this.imageChoosed,
      Photo: this.photo?.value,
      UserId: this.userId?.value,
      IsActive: this.isActive?.value,
      EndUserPrice: this.endUserPrice?.value,
    }
  }

  //Setting toast variables
  setToast(title: string, msg: string, className: string) {
    this.showToast = true;
    this.toastTitle = title;
    this.toastMessage = msg
    this.toastClass = className
  }

  hideToast() {
    setTimeout(() => {
      this.showToast = false
    }, 3000);
  }

  //Create/Update Product Function
  createUpdateProduct() {
    let productDetails = this.getProductDetailsbody()
    //In case of update model we add the id of the product we want to update in the request body object 
    if (this.updateModal) {
      Object.assign(productDetails, { Id: this.selectedProduct.ProductId });
    }
    console.log(productDetails);
    this.spinner.show();
    this.productsService
      .createUpdateProduct(productDetails)
      .subscribe(
        (result) => {
          console.log(result);
          this.productForm.reset();
          //get the products to the show the update or new without refresh
          this.getProductsPerPage();
          this.spinner.hide();
          this.closeModal()
          //Setting toast values
          if (this.createModal) {
            this.setToast("Succsess", "Product created successfuly", "bg-success")
          } else {
            this.setToast("Succsess", "Product updated successfuly", "bg-success")
          }
          //Dismiss toast after 3 seconds
          this.hideToast()
        },
        err => {
          this.spinner.hide();
          if (this.updateModal) {
            //Setting toast values
            this.setToast("Error", "There was a problem updating the product", "bg-danger")
            //Dismiss toast after 3 seconds
            this.hideToast()
          } else {
            //Setting toast values
            this.setToast("Error", "There was a problem creating the product", "bg-danger")
            //Dismiss toast after 3 seconds
            this.hideToast()
          }

        }
      );

  }
}
