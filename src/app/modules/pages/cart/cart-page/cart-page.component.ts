import { Component } from '@angular/core';
import { ExtendedCart, ExtendedProductCart } from 'src/app/modules/shared/models/extendedCart.interface';
import { Product } from 'src/app/modules/shared/models/product.interface';
import { CartServiceService } from 'src/app/modules/shared/services/cart-service.service';
import { Location } from '@angular/common';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {

  displayedColumns: string[] = ['image', 'title', 'category', 'price', 'quantity', 'totalPrice'];
  productList: Product[] = []
  dataSource: ExtendedCart | undefined

  constructor(private cartService: CartServiceService, private location: Location, private router: Router){}

  ngOnInit(){
    this.cartService.cart$.subscribe({
      next: ((res: Product[]) => {
        this.productList = res
        this.listToData()
        this.removeDuplicates()
      }),
      error: ((error: any) => console.log(error)),
      complete: () => console.log('Proceso de obtencion de productos finalizado')
    })
  }

  listToData(){
    this.dataSource = {
      products: this.productList.map(product => {
        let quantity = this.productList.filter(p => p.id === product.id)
        return {
          productId: product.id,
          quantity: quantity.length,
          image: product.image,
          title: product.title,
          category: product.category,
          price: product.price,
          totalPrice: product.price * quantity.length,
        }
      }),
      totalPriceCart: this.productList.reduce((sum, product) => sum + product.price, 0),
      id: 0,
      userId: 0,
      date: '',
      __v: 0
    }
  }

  removeDuplicates() {
    const uniqueProducts = Array.from(new Set(this.dataSource?.products.map(product => product.productId)))
        .map(productId => this.dataSource?.products.find(product => product.productId === productId))
        .filter((product): product is ExtendedProductCart => product !== undefined);

    if (this.dataSource && this.dataSource.products) {
        this.dataSource.products = uniqueProducts;
    }
  }

  deleteProduct(productId: number){
    this.cartService.removeFromCart(productId)
  }

  updateCart(productId: number, quantity: number){
    this.cartService.updateCart(productId, quantity)
  }

  goBack(){
    this.location.back()
  }

  goPayment(){
    let storedUser = sessionStorage.getItem('logedUser')
    let navigationExtras: NavigationExtras = {
      state: {
        cart: this.dataSource
      }
    }
    if(storedUser){
      this.router.navigate(['/payment'], navigationExtras)
    }else{
      this.router.navigate(['/login'], navigationExtras)
    }
  }

}
