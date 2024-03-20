import { Component } from '@angular/core';
import { Product } from 'src/app/modules/shared/models/product.interface';
import { ProductsService } from 'src/app/modules/shared/services/products.service';

@Component({
  selector: 'app-women-clothing-page',
  templateUrl: './women-clothing-page.component.html',
  styleUrls: ['./women-clothing-page.component.scss']
})
export class WomenClothingPageComponent {

  productList!: Product[]

  constructor(private _productsService: ProductsService){}

  ngOnInit(){
    this._productsService.getProductsInCategory("women's clothing").subscribe({
      next: ((res: Product[]) => this.productList = res),
      error: ((error: any) => console.log(error)),
      complete: (() => {
        console.log('Proceso obtencion de productos terminado')
        console.log(this.productList);
      })
    })
  }

}
