import {AfterViewInit, Component, OnInit, Output} from '@angular/core';

// @ts-ignore
import H from '@here/maps-api-for-javascript';
// @ts-ignore
import * as mapboxgl from "mapbox-gl";
// @ts-ignore
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {environment} from "../../../../environments/environment.prod";
import {Theme} from "../../../enums/theme";
import {Post} from "../../../models/post";

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})

export class MapviewComponent implements OnInit, AfterViewInit {

  map: mapboxgl.map;
  places: any;

  @Output()
  feedview: string = "Feedview";

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.places = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {
            'iconSize': [20, 20],
            'color': Theme.CITY,
            'theme': 'city',
            'image': 'paris.jpg',
            'description': 'The bubbly sounds of the centre of Paris',
            'title': 'Bonjour Paris'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [2.294694, 48.858093]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'iconSize': [20, 20],
            'color': Theme.CITY,
            'theme': 'city',
            'image': 'beijing.jpg',
            'description': 'All the chinese people gathering to eat together',
            'title': 'Street food China'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [116.383331, 39.916668]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'iconSize': [20, 20],
            'color': Theme.SAND,
            'theme': 'sand',
            'image': 'safari.jpg',
            'description': 'The noises of lions and elephants at safari',
            'title': 'Safari'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [27.398056, -26.358055]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'iconSize': [20, 20],
            'color': Theme.FOREST,
            'theme': 'forest',
            'image': 'river.jpg',
            'description': 'The beautiful sounds of a river',
            'title': 'River Sounds'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [4.897070, 52.45667]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'iconSize': [20, 20],
            'color': Theme.FOREST,
            'theme': 'forest',
            'image': 'river.jpg',
            'description': 'The beautiful sounds of a river',
            'title': 'River Sounds'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-81.107016, 29.272083]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'iconSize': [20, 20],
            'color': Theme.WATER,
            'theme': 'water',
            'image': 'seawaves.jpg',
            'description': 'Waves shattering the coast',
            'title': 'Wave after wave'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [4.82456, 52.377956]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'iconSize': [20, 20],
            'color': Theme.SUN,
            'theme': 'sun',
            'image': 'sandstorm.jpg',
            'description': 'The burning sun on the sizzling sand',
            'title': 'The desert'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [4.997070, 52.377956]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'iconSize': [20, 20],
            'color': Theme.MOUNTAIN,
            'theme': 'mountain',
            'image': 'mountain.jpg',
            'description': 'The sounds of the birds circling around the mountains',
            'title': 'Brown Mountains'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [6.2167070, 52.377956]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'iconSize': [20, 20],
            'color': Theme.MOUNTAIN,
            'theme': 'mountain',
            'image': 'mountain.jpg',
            'description': 'The sounds of the birds circling around the mountains',
            'title': 'Brown Mountains'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [1.00000, 42.666668]
          }
        },
      ]
    };

    mapboxgl.accessToken = environment.mapboxKey;
    this.map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [4.897070, 50.877956],
      zoom: 5.5,
      container: 'map-mapbox',
    });

    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'top-left');

    this.map.addControl(
      new MapboxGeocoder({
        accessToken: environment.mapboxKey,
        mapboxgl: mapboxgl
      })
    );

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
      })
    );

    const filterGroup = document.getElementById('filter-group');

    this.map.on('load', () => {

      this.map.addSource('places', {
        'type': 'geojson',
        'data': this.places
      });

      for (const feature of this.places.features) {
        const symbol = feature.properties.theme;
        const color = feature.properties.color;
        const layerID = `poi-${symbol}`;

        if (!this.map.getLayer(layerID)) {
          this.map.addLayer({
            'id': layerID,
            'type': 'circle',
            'source': 'places',
            'paint': {
              'circle-color': color,
              'circle-stroke-color': 'white',
              'circle-radius': 10,
            },
            'filter': ['==', 'theme', symbol]
          });

          const container = document.createElement('div');
          container.className = "form-check form-check-inline";

          const input = document.createElement('input');
          input.type = 'checkbox';
          input.className = 'm-1';
          input.id = layerID;
          input.checked = true;
          container.appendChild(input);


          const label = document.createElement('label');
          label.setAttribute('for', layerID);
          label.textContent = symbol;
          label.className = "mr-3";

          container.appendChild(label);

          filterGroup.appendChild(container);

          input.addEventListener('change', (e) => {
            this.map.setLayoutProperty(
              layerID,
              'visibility',
              // @ts-ignore
              e.target.checked ? 'visible' : 'none'
            );
          });
        }


        // @ts-ignore
        this.map.on('click', layerID, (e) => {
          this.map.flyTo({
            center: e.features[0].geometry.coordinates
          });
          const coordinates = e.features[0].geometry.coordinates.slice();
          const theme = e.features[0].properties.color;
          const img = e.features[0].properties.image.trim();
          const title = e.features[0].properties.title;
          const description = e.features[0].properties.description;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`<div class="postCard" style="background-color:` +theme+ `">
            <p class="postedByTag" style="color: white"><i class="bi bi-person-circle" style="color: white"></i>RenouYuyut</p>
          <img class="card-img-top" src="../../../../assets/img/postsimgs/`+img+`">
          <div class="css_animation">
          <div id="soundwavesWrapper" (click)="activateSoundWaves()" class="onClickWrapper" style="z-index: 5">
            </div>
            <div class="card-body">

          <div class=" shadow-lg title-container">
          <h5 class="card-title" style="color: white">` + title + `</h5>
          </div>
          <div class="shadow-lg text-container">
          <p class="card-text" style="color: white">` + description + `</p>
          </div>

          <div class="icons">
          <i *ngIf="audioPost.isLiked" style="color: white" class="bi bi-heart-fill"></i>
            <i class="bi bi-chat-dots-fill" style="color: white"></i>
            <i class="bi bi-share-fill" style="color: white"></i>
            <i class="bi bi-flag-fill" style="color: white"></i>
            </div>
            <div class="reportFlag">
            </div>
            </div>
            <div class="commentsPart">
          <app-comments [postInfo]="audioPost" *ngIf="isShown"></app-comments>
            </div>
            </div>
        `)
            .addTo(this.map);
        });
      }
    });
  }



}
