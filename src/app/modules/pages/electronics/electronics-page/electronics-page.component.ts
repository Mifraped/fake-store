import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/modules/shared/models/product.interface';
import { ProductsService } from 'src/app/modules/shared/services/products.service';

@Component({
  selector: 'app-electronics-page',
  templateUrl: './electronics-page.component.html',
  styleUrls: ['./electronics-page.component.scss']
})
export class ElectronicsPageComponent {

  productList!: Product[]

  constructor(private _productsService: ProductsService){}

  ngOnInit(){
    this._productsService.getProductsInCategory('electronics').subscribe({
      next: ((res: Product[]) => this.productList = res),
      error: ((error: any) => console.log(error)),
      complete: (() => {
        console.log('Proceso obtencion de productos terminado')
        console.log(this.productList);
      })
    })
  }

}
