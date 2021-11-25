import {AfterViewInit, Component, Input, OnInit, Output} from '@angular/core';

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
import {PostsService} from "../../../services/posts.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})

export class MapviewComponent implements OnInit, AfterViewInit {

  map: mapboxgl.map;
  places: any;
  posts: Post[] = [];

  @Output()
  feedview: string = "Feedview";

  @Input()
  showOverlay: boolean = false;

  constructor(private postsService: PostsService , private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.postsService.restGetPosts().subscribe(
      (data) => {
        // @ts-ignore
        this.posts = data; console.log(data);
      },
      (error) => console.log("Error: " + error.status + " - " + error.error)
    );
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
            'audioID': 1,
            'color': Theme.SUN,
            'theme': 'sun',
            'image': 'river.jpg',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            'title': 'River Sounds'
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
            'audioID': 2,
            'color': Theme.FOREST,
            'theme': 'forest',
            'image': 'amazon.jpg',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            'title': 'Amazon Birds'
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
            'audioID': 3,
            'color': Theme.WATER,
            'theme': 'water',
            'image': 'seawaves.jpg',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            'title': 'Sound of Waves'
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
            'audioID': 4,
            'color': Theme.WATER,
            'theme': 'river',
            'image': 'river.jpg',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
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
            'audioID': 5,
            'color': Theme.SUN,
            'theme': 'forest',
            'image': 'amazon.jpg',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
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
            'audioID': 6,
            'color': Theme.FOREST,
            'theme': 'forest',
            'image': 'amazon.jpg',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            'title': 'Amazon birds'
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
            'audioID': 7,
            'color': Theme.WATER,
            'theme': 'sun',
            'image': 'seawaves.jpg',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            'title': 'Sound of waves'
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
            'audioID': 8,
            'color': Theme.WATER,
            'theme': 'water',
            'image': 'seawaves.jpg',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            'title': 'Sound of waves'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [6.2167070, 52.377956]
          }
        },
        // {
        //   'type': 'Feature',
        //   'properties': {
        //     'iconSize': [20, 20],
        //     'audioID': 9,
        //     'color': Theme.MOUNTAIN,
        //     'theme': 'mountain',
        //     'image': 'mountain.jpg',
        //     'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        //     'title': 'Brown Mountains'
        //   },
        //   'geometry': {
        //     'type': 'Point',
        //     'coordinates': [1.00000, 42.666668]
        //   }
        // },
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

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
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
        this.map.on('mouseenter', layerID, (e) => {

          this.map.on('click', layerID, (e: { features: { properties: { audioID: number; }; }[]; }) => {

            console.log(e.features[0].properties.audioID);
            this.overlayTrue(true);
            this.openOverlay(e.features[0].properties.audioID);
          });

          this.map.getCanvas().style.cursor = 'pointer';

          // this.map.flyTo({
          //   center: e.features[0].geometry.coordinates
          // });

          const coordinates = e.features[0].geometry.coordinates.slice();
          const theme = e.features[0].properties.color;
          const img = e.features[0].properties.image.trim();
          const title = e.features[0].properties.title;
          const description = e.features[0].properties.description;

          popup
            .setLngLat(coordinates)
            .setHTML('hiiiiii')
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

            </div>
        `)
            .addTo(this.map);
        });
        this.map.on('mouseleave', layerID, () => {
          this.map.getCanvas().style.cursor = '';
          popup.remove();
        });
      }
      //this.map.on('load', () => {
      const id = parseInt(this.router.url.split("/")[2]);
      if (!isNaN(id)) {
        for (let i = 0; i < this.places.features.length; i++) {
            if (this.places.features[i].properties.audioID == id) {
              this.map.flyTo({
                center: this.places.features[i].geometry.coordinates
              });

                const coordinates = this.places.features[i].geometry.coordinates.slice();
                const theme = this.places.features[i].properties.color;
                const img = this.places.features[i].properties.image.trim();
                const title = this.places.features[i].properties.title;
                const description = this.places.features[i].properties.description;
              new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML('hiiiiii')
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

            </div>
        `)
                .addTo(this.map);
             }
        }
        this.map.on('mouseleave', 'places', () => {
          this.map.getCanvas().style.cursor = '';
          popup.remove();
        });
      }
    });
  }

  overlayTrue(condition: boolean) {
    this.showOverlay = condition;
    console.log("overlay activated");
  }

  async openOverlay(pId: number) {
    // console.log(pId);
    // if (pId != null || !isNaN(pId)) {
      await this.router.navigate([pId], {relativeTo: this.activatedRoute});
      this.showOverlay = true;
    //}
  }

}
