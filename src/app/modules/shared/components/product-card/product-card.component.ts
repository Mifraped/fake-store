import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product!: Product

  constructor(private _router: Router){}

  goToProduct(){
    this._router.navigate([`/products/${this.product.id}`])
  }

}
