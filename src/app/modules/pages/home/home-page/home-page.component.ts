import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from, switchMap, throwError, map, merge } from 'rxjs';
import { Product } from 'src/app/modules/shared/models/product.interface';
import { ProductsService } from 'src/app/modules/shared/services/products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  bestFashionRatedList: Product[] = []

  bestelectronicsList: Product[] = []

  bestJewelryList: Product[] = []

  constructor(private _productService: ProductsService, private router: Router){}

  getBestRatedInCategory(category: string, number: number): Observable<Product[]>{
    return this._productService.getProductsInCategory(category).pipe(
      map((res: Product[]) => {
        if(res){
          return res.sort((a,b) => b.rating.rate - a.rating.rate).slice(0,number)
        }else{
          throw new Error('No se pudo obtener BestRatedList')
        }
      })
    )
  }

  ngOnInit(){

    merge(
      this.getBestRatedInCategory("men's clothing", 2),
      this.getBestRatedInCategory("women's clothing", 2),
    ).subscribe({
      next: ((res: Product[]) => this.bestFashionRatedList.push(...res)),
      error: ((error: any) => console.log(`Algo salio mal: ${error}`)),
      complete: (() => {
        this.bestFashionRatedList = this.bestFashionRatedList.sort((a,b) => b.rating.rate - a.rating.rate)
        console.log('Obtencion BestRatedList completado')
      })
    })

    this.getBestRatedInCategory('electronics', 4).subscribe({
      next: ((value: Product[]) => this.bestelectronicsList = value),
      error: ((error: any) => console.log(`Algo salio mal: ${error}`)),
      complete: (() => console.log('Proceso obtencion productos electronica completado')
      )
    })

    this.getBestRatedInCategory('jewelery', 4).subscribe({
      next: ((value: Product[]) => this.bestJewelryList = value),
      error: ((error: any) => console.log(`Algo salio mal: ${error}`)),
      complete: (() => console.log('Proceso obtencion productos joyeria completado')
      )
    })
  }

  goToProduct(id: number){
    this.router.navigate([`/products/${id}`])
  }
}
