import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SearchObject } from '../../models/searchObject.interface';
import { NavigationExtras, Router } from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';


@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent {

  @ViewChild('searchInput') searchInput!: ElementRef;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  searchs: string[] = []

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

    this.searchObject.productName = ''
    sessionStorage.setItem('searchObject', JSON.stringify(this.searchObject))
    
    this.router.navigate(['/products'], navigationExtras)

  }

  constructor(public dialogRef: MatDialogRef<SearchDialogComponent>, private router: Router) {}

  ngOnInit(){
    
    let searchObject = sessionStorage.getItem('searchObject')
    let searchs = sessionStorage.getItem('searchs')

    if(searchObject){
      this.searchObject = JSON.parse(searchObject)
    }

    if(searchs && searchs.length > 0){
      this.searchs = JSON.parse(searchs)
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

  add(value: string): void {      
    if (value && !this.searchs.includes(value)) {
      this.searchs.push(value);
      sessionStorage.setItem('searchs', JSON.stringify(this.searchs))
    }
    }

  remove(search: string): void {
    const index = this.searchs.indexOf(search);
  
    if (index >= 0) {
      this.searchs.splice(index, 1);
    }
    if(this.searchs.length > 0){
      sessionStorage.setItem('searchs', JSON.stringify(this.searchs))
    }else{
      sessionStorage.removeItem('searchs')
    }
  }

  setInputValue(value: string){
    this.searchObject.productName = value
  }

}
