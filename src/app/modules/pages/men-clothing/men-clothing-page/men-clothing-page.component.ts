import { Component } from '@angular/core';
import { Product } from 'src/app/modules/shared/models/product.interface';
import { ProductsService } from 'src/app/modules/shared/services/products.service';

@Component({
  selector: 'app-men-clothing-page',
  templateUrl: './men-clothing-page.component.html',
  styleUrls: ['./men-clothing-page.component.scss']
})
export class MenClothingPageComponent {

  productList!: Product[]

  constructor(private _productsService: ProductsService){}

  ngOnInit(){
    this._productsService.getProductsInCategory("men's clothing").subscribe({
      next: ((res: Product[]) => this.productList = res),
      error: ((error: any) => console.log(error)),
      complete: (() => {
        console.log('Proceso obtencion de productos terminado')
        console.log(this.productList);
      })
    })
  }

}
