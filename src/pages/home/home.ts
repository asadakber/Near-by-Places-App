import { Component, NgZone, ElementRef, ViewChild } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { googlemaps } from 'googlemaps';
import { LOGOUT } from '../../store/actions/auth';
import { AppState } from '../../store/reducers/root';
import { NgRedux, select } from 'ng2-redux';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;

  map:any;
  latLng:any;
  markers:any;
  mapOptions:any;  
  isKM:any=500;
  isType:any="";
  constructor(private ngRedux: NgRedux<AppState>,private zone: NgZone,public plt: Platform,private geolocation: Geolocation,public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {

this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          console.log('latLng',this.latLng);
     
      this.mapOptions = {
        center: this.latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }   

this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);

    }, (err) => {
      alert('err '+err);
    });

  }

  nearbyPlace(){
    this.loadMap();
    this.markers = [];
    let service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch({
              location: this.latLng,
              radius: this.isKM,
              types: [this.isType]
            }, (results, status) => {
                this.callback(results, status);
            });
  }

  callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        this.createMarker(results[i]);
      }
    }
  }

  createMarker(place){
    var placeLoc = place;
    console.log('placeLoc',placeLoc);
    this.markers = new google.maps.Marker({
        map: this.map,
        position: place.geometry.location
    });

    let infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(this.markers, 'click', () => {
      this.zone.run(() => {
        infowindow.setContent(place.name);
        infowindow.open(this.map, this.markers);
      });
    });
  }

  logout() {
    this.ngRedux.dispatch({
      type: LOGOUT,
      navCtrl: () => this.navCtrl.pop()
    })
  }

  

}
