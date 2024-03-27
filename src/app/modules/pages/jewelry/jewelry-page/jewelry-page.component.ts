import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/modules/shared/models/product.interface';
import { ProductsService } from 'src/app/modules/shared/services/products.service';

@Component({
  selector: 'app-jewelry-page',
  templateUrl: './jewelry-page.component.html',
  styleUrls: ['./jewelry-page.component.scss']
})
export class JewelryPageComponent {

  productList!: Product[]

  selectedValue: string = ''

  constructor(private _productsService: ProductsService, private router: Router){}

  ngOnInit(){
    this._productsService.getProductsInCategory('jewelery').subscribe({
      next: ((res: Product[]) => this.productList = res),
      error: ((error: any) => console.log(error)),
      complete: (() => {
        console.log('Proceso obtencion de productos terminado')
      })
    })
  }

  onSelectedValueChange(value: string){
    if(value === 'asc'){
      this.productList.sort((a,b) => a.price - b.price)
    }else if(value === 'desc'){
      this.productList.sort((a,b) => b.price - a.price)
    }else if(value === 'rat'){
      this.productList.sort((a,b) => b.rating.rate - a.rating.rate)
    }
  }

  goToProduct(id: number){
    this.router.navigate([`/products/${id}`])
  }

}
