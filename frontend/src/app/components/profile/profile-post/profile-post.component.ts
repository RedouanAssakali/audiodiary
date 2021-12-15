import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../../models/post";
import {Theme} from "../../../enums/theme";

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.css']
})
export class ProfilePostComponent implements OnInit {
  @Input() selectedPost: Post | undefined;
  @Input() selectedFavoritePost: Post | undefined;

  @Input() audioPost: Post
  // isShown: boolean;

  @Output() deletedSelected = new EventEmitter<Post>();
  @Output() deletedFavoriteSelected = new EventEmitter<Post>();

  constructor() { }

  ngOnInit(): void {

    switch (this.audioPost.theme) {
      case "Theme.SUN":
        this.audioPost.theme = Theme.SUN;
        break;
      case "Theme.SAND":
        this.audioPost.theme = Theme.SAND;
        break;
      case "Theme.FOREST":
        this.audioPost.theme = Theme.FOREST;
        break;
      case "Theme.WATER":
        this.audioPost.theme = Theme.WATER;
        break;
      case "Theme.CITY":
        this.audioPost.theme = Theme.CITY;
        break;
      case "Theme.MOUNTAIN":
        this.audioPost.theme = Theme.MOUNTAIN;
        break;

    }
  }

  activateSoundWaves(){
    const soundWaves = document.getElementById("soundwavesWrapper");

    soundWaves.classList.remove('onClickWrapper');
    soundWaves.classList.add("wrapper");
  }

  toRemovePost(){
    this.deletedSelected.emit(this.selectedPost);
  }

  toRemoveFavoritePost(){
    this.deletedFavoriteSelected.emit(this.selectedFavoritePost);
  }


}
