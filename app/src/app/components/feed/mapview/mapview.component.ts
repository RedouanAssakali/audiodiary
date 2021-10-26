import {AfterViewInit, Component, OnInit, Output} from '@angular/core';

// @ts-ignore
import H from '@here/maps-api-for-javascript';
// @ts-ignore
import * as mapboxgl from "mapbox-gl";
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
      ]
    };

    mapboxgl.accessToken = environment.mapboxKey;
    this.map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: [4.897070, 52.377956],
      zoom: 15.5,
      container: 'map-mapbox',
    });

    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'top-left');
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
              'circle-radius': 10,
            },
            'filter': ['==', 'theme', symbol]
          });

          const input = document.createElement('input');
          input.type = 'checkbox';
          input.id = layerID;
          input.checked = true;
          filterGroup.appendChild(input);

          const label = document.createElement('label');
          label.setAttribute('for', layerID);
          label.textContent = symbol;
          filterGroup.appendChild(label);

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
          const coordinates = e.features[0].geometry.coordinates.slice();
          const theme = e.features[0].properties.color;
          const img = e.features[0].properties.image.trim();
          const title = e.features[0].properties.title;
          const description = e.features[0].properties.description;

          let post = new Post(1, title, description, img, theme, true);

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`<div class="postCard" [ngStyle]="{'background-color':` + theme + `}">
                <img class="card-img-top">
                 <div class="postCard">` +
              // @ts-ignore
            `<img class="shadow-lg card-img-top" src="../../../../assets/img/postsimgs/`+img+`">
            <div class="card-body">
            <div class=" shadow-lg title-container">
            <h5 class="card-title">` + title + `</h5>
            </div>
            <div class="shadow-lg text-container">
            <p class="card-text">` + description + `</p>
            </div>
            <div class="icons">
            <i *ngIf="audioPost.isLiked" (click)="audioPost.isLiked = false" class="bi bi-heart-fill"></i>
            <i class="bi bi-chat-dots-fill"></i>
            <i class="bi bi-share-fill"></i>
            <i class="bi bi-flag-fill"></i>
            </div>
            <div class="reportFlag">
            </div>
            </div>`)
            .addTo(this.map);
        });
      }
    });
  }



}
