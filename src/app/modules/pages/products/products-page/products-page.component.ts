import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { from, mergeMap, throwError, filter, Subscription } from 'rxjs';
import { Product } from 'src/app/modules/shared/models/product.interface';
import { SearchObject } from 'src/app/modules/shared/models/searchObject.interface';
import { FilterService } from 'src/app/modules/shared/services/filter.service';
import { ProductsService } from 'src/app/modules/shared/services/products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent {

  subscription!: Subscription

  findedProducts: Product[] = []
  queryParams!: SearchObject

  selectedValue: string = ''

  constructor(private route: ActivatedRoute, private productService: ProductsService, private filterService: FilterService,
    private router: Router
  ){}

  ngOnInit(){
    this.subscription = this.route.queryParams.subscribe((params: Params) => {
      
      if(Object.keys(params).length !== 0){
        this.queryParams = {
          productName: params['productName'],
          womenClothes: params['womenClothes'] === 'true',
          menClothes: params['menClothes'] === 'true',
          jewelry: params['jewelry'] === 'true',
          electronics: params['electronics'] === 'true',
          maxPrice: Number(params['maxPrice']),
          minPrice: Number(params['minPrice']),
          maxRating: Number(params['maxRating']),
          minRating: Number(params['minRating'])
        }
        this.findedProducts = []
        
        this.productService.getAllProducts().pipe(
          mergeMap((res: Product[]) => {
            if(res){
              return from(res)
            }else{
              return throwError(() => 'No se pudo obtener la lista de productos')
            }
          }),
          filter((product: Product) => this.queryParams.productName ? 
            this.filterService.nameFilter(this.queryParams.productName, product) :
            true
          ),
          filter((product: Product) => {
            if(this.queryParams.electronics === true || this.queryParams.jewelry === true 
              || this.queryParams.menClothes  === true || this.queryParams.womenClothes  === true){
              return this.filterService.categoryFilter(this.queryParams,product)
              
            }
            return true
          }),
          filter((product: Product) => this.filterService.priceFilter(this.queryParams.minPrice, this.queryParams.maxPrice, product)),
          filter((product: Product) => this.filterService.ratingFilter(this.queryParams.minRating, this.queryParams.maxRating, product))
        ).subscribe({
          next: ((product: Product) => this.findedProducts.push(product)),
          error: ((error: any) => console.log(`Ha habido un error: ${error}`)),
          complete: (() => {
            if(history.state.orderData){
              this.selectedValue = history.state.orderData
              this.onSelectedValueChange(history.state.orderData)
            }
            console.log(`Lista filtrada completada`)
          })
        })
      }
    })


  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  onSelectedValueChange(value: string){
    if(value === 'asc'){
      this.findedProducts.sort((a,b) => a.price - b.price)
    }else if(value === 'desc'){
      this.findedProducts.sort((a,b) => b.price - a.price)
    }else if(value === 'rat'){
      this.findedProducts.sort((a,b) => b.rating.rate - a.rating.rate)
    }
  }

  goToProduct(id: number){
    let navigationExtras: NavigationExtras = {
      state: {
        data: this.queryParams,
        orderData: this.selectedValue
      }
    }
    this.router.navigate([`/products/${id}`], navigationExtras)
  }

}
