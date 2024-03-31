import { Injectable } from '@angular/core';
import { Address } from '../models/address.interface';

declare var google: any;


let streetAutocomplete: any;
let zipcodeAutocomplete: any;
let cityAutocomplete: any;

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  
  geocoder = new google.maps.Geocoder();

  selectedAddress: Address = {
    street: '',
    number: '',
    zipcode: '',
    city: ''
  }

  initialState: Address = {...this.selectedAddress}

  constructor() { }

  initStreetAutocomplete() {
    streetAutocomplete = new google.maps.places.Autocomplete(
      document.getElementById('streetAutocomplete') as HTMLInputElement,
      {
        types: ['route'],
        fields: ['place_id', 'geometry', 'name']
      }
    );
    streetAutocomplete.addListener('place_changed', () => this.onPlaceChanged('streetAutocomplete', this.selectedAddress, 'street'));  }

  initZipcodeAutocomplete() {
    zipcodeAutocomplete = new google.maps.places.Autocomplete(
      document.getElementById('zipcodeAutocomplete') as HTMLInputElement,
      {
        types: ['postal_code'],
        fields: ['place_id', 'geometry', 'name']
      }
    );
    zipcodeAutocomplete.addListener('place_changed', () => this.onPlaceChanged('zipcodeAutocomplete', this.selectedAddress, 'zipcode'));  }

  initCityAutocomplete() {
    cityAutocomplete = new google.maps.places.Autocomplete(
      document.getElementById('cityAutocomplete') as HTMLInputElement,
      {
        types: ['locality'],
        fields: ['place_id', 'geometry', 'name']
      }
    );
    cityAutocomplete.addListener('place_changed', () => this.onPlaceChanged('cityAutocomplete', this.selectedAddress, 'city'));  }

  onPlaceChanged(id: string, selectedAddress: Address, key: string) {

    let autocomplete;

    switch(id) {
      case 'streetAutocomplete':
        autocomplete = streetAutocomplete;
        break;
      case 'zipcodeAutocomplete':
        autocomplete = zipcodeAutocomplete;
        break;
      case 'cityAutocomplete':
        autocomplete = cityAutocomplete;
        break;
    }
    const place = autocomplete.getPlace();

    if (!place.geometry) {
      (document.getElementById(id) as HTMLInputElement).placeholder = 'Enter a place';
    }else {
      selectedAddress[key] = place.name;      
    }
  }

  async initMap(zoom: number, lat?: number, lng?: number): Promise<void> {
    const position = lat && lng ? { lat: lat, lng: lng } : { lat: 40.4167754, lng: -3.7037902 };
  
    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: zoom,
        center: position,

      }
    );
      if(lat && lng){
        const marker = new google.maps.Marker({
          map: map,
          position: position,
        });
      }
  }

}
