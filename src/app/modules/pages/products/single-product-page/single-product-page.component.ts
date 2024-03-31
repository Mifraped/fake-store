import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/modules/shared/models/product.interface';
import { SearchObject } from 'src/app/modules/shared/models/searchObject.interface';
import { ProductsService } from 'src/app/modules/shared/services/products.service';

@Component({
  selector: 'app-single-product-page',
  templateUrl: './single-product-page.component.html',
  styleUrls: ['./single-product-page.component.scss']
})
export class SingleProductPageComponent {

  historyStateData: SearchObject | undefined

  orderData: string | undefined

  product!: Product

  constructor(private _activatedRoute: ActivatedRoute, private _productService: ProductsService){}

  ngOnInit(){
    let productId = this._activatedRoute.snapshot.params['productId']
    
    this._productService.getProduct(productId).subscribe({
      next: ((res: Product) => this.product = res),
      error: ((error: any) => console.log(error)),
      complete: (() => console.log('Proceso terminado'))
    })

    if(history.state.data){
      this.historyStateData = history.state.data
    }
    if(history.state.orderData){
      this.orderData = history.state.orderData
    }
  }

  redondeo(num: number) {
    let parteEntera = Math.floor(num);
    let parteDecimal = num - parteEntera;
    if (parteDecimal > 0.5) {
      return Math.ceil(num);
    } else {
      return Math.floor(num);
    }
  }

}
