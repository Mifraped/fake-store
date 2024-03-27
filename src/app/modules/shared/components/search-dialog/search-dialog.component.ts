import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SearchObject } from '../../models/searchObject.interface';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent {

  searchObject: SearchObject = {
  productName: undefined,
  
  womenClothes: false,
  menClothes: false,
  jewelry: false,
  electronics: false,

  minPrice: 0,
  maxPrice: 1000,
  minRating: 0,
  maxRating: 5
  }

  goToProducts(){

    let navigationExtras: NavigationExtras = {
      queryParams: {
        productName: this.searchObject.productName,
        womenClothes: this.searchObject.womenClothes,
        menClothes: this.searchObject.menClothes,
        jewelry: this.searchObject.jewelry,
        electronics: this.searchObject.electronics,
        minPrice: this.searchObject.minPrice,
        maxPrice: this.searchObject.maxPrice,
        minRating: this.searchObject.minRating,
        maxRating: this.searchObject.maxRating
      }
    }

    sessionStorage.setItem('searchObject', JSON.stringify(this.searchObject))
    
    this.router.navigate(['/products'], navigationExtras)
  }

  constructor(public dialogRef: MatDialogRef<SearchDialogComponent>, private router: Router) {}

  ngOnInit(){
    let searchObject = sessionStorage.getItem('searchObject')

    if(searchObject){
      this.searchObject = JSON.parse(searchObject)
    }
  }

  clearFilters(){
    sessionStorage.removeItem('searchObject')
    
    this.searchObject = {
      productName: undefined,
      
      womenClothes: false,
      menClothes: false,
      jewelry: false,
      electronics: false,
    
      minPrice: 0,
      maxPrice: 1000,
      minRating: 0,
      maxRating: 5
      }

  }

}
