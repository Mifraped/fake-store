import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product!: Product

  @Output() eventoId = new EventEmitter<number>()

  constructor(private _router: Router){}

  goToProduct(){
    this.eventoId.emit(this.product.id)
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
