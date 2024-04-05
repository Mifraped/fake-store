import { Component } from '@angular/core';
import { from, mergeMap, switchMap, throwError } from 'rxjs';
import { Cart, ProductCart } from 'src/app/modules/shared/models/cart.interface';
import { ProductsService } from 'src/app/modules/shared/services/products.service';
import { Product } from 'src/app/modules/shared/models/product.interface';
import { ExtendedCart } from 'src/app/modules/shared/models/extendedCart.interface';
import { CartServiceService } from 'src/app/modules/shared/services/cart-service.service';


@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent {

  cartUserList: Cart[] = []
  cartProductstList: Product[] = []
  EXTENDED_CART: ExtendedCart[] = []
  displayedColumns: string[] = ['image', 'title', 'category', 'price', 'quantity', 'totalPrice'];
  dataSource: any[] = []
  
  extendCart(){
    this.EXTENDED_CART = this.cartUserList.map((cart) => {
      const products = cart.products.map((product) => {
        let findedProduct = this.cartProductstList.find((p) => p.id === product.productId)
        if (!findedProduct) {
          return {
            ...product,
            id: 0,
            image: '',
            title: 'Unknown',
            price: 0,
            category: 'Unknown',
            totalPrice: 0
          }
        }
        return {
          ...product,
          id: findedProduct?.id,
          image: findedProduct?.image,
          title: findedProduct?.title,
          price: findedProduct?.price,
          category: findedProduct?.category,
          totalPrice: findedProduct?.price * product.quantity,
        }
      });
  
      const totalPriceCart = products.reduce((sum, product) => sum + product.totalPrice, 0);
  
      return {
        ...cart,
        products,
        totalPriceCart
      }
    })
  }

  constructor(private cartService: CartServiceService, private _productService: ProductsService){}  

  ngOnInit(){
    let storedUser = sessionStorage.getItem('logedUser')
    if(storedUser){
      
      let parsedUser = JSON.parse(storedUser)
      this.cartService.getCartUser(parsedUser).pipe(
        switchMap((res: Cart[]) => {
          if(res){
            this.cartUserList = res;
            return from(res);
          } else {
            return throwError(() => 'No se pudo obtener la lista de pedidos');
          }
        }),
        mergeMap((cart: Cart) => from(cart.products)),
        mergeMap((product: ProductCart) => this._productService.getProduct(product.productId))
      ).subscribe({
        next: ((product: Product) => {
          if(product){
            this.cartProductstList.push(product)
          }
        }),
        error: ((error: any) => console.error(error)),
        complete: (() => {
          console.log('Proceso obtencion de pedidos finalizado')
          this.extendCart()
          this.EXTENDED_CART.forEach((cart) => this.dataSource.unshift(cart.products))
        })
      })
    }
  }

}
