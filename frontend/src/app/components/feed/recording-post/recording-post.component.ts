import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../models/post";
import {Theme} from "../../../enums/theme";
import {PostsService} from "../../../services/posts.service";
import {LikesService} from "../../../services/likes.service";
import {AuthService} from "../../../services/auth.service";
import {Like} from "../../../models/like";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {User} from "../../../models/user";
import {Cloudinary, CloudinaryImage, CloudinaryVideo} from "@cloudinary/url-gen";
import {fill, scale} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {Formattedpost} from "../../../models/formattedpost";


@Component({
  selector: 'app-recording-post',
  templateUrl: './recording-post.component.html',
  styleUrls: ['./recording-post.component.css']
})
export class RecordingPostComponent implements OnInit {
  @Input()
  audioPost: Post = new Post();
  isShown: boolean;
  popularThemes: unknown;
  color: string = "transparent";
  theme: String;
  themeValue: string;
  img: CloudinaryImage;
  vid: CloudinaryVideo;
  private childParamsSubscription: Subscription;
  favoritePosts: Post[] = [];
  playBtn: boolean;
  audioUrl: string;

  constructor(private postsService: PostsService, private likesService: LikesService, private authService: AuthService
  , private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'hogeschool-van-amsterdam'
      }
    });

    this.audioUrl = cld.video(this.audioPost.audiofile).toURL();
    this.img = cld.image(this.audioPost.img.toString());

    this.vid = cld.video(this.audioPost.audiofile.toString());

    cld.video(this.audioPost.audiofile.toString()).resize(scale().width(400));
    cld.video(this.audioPost.audiofile.toString()).toURL();

    cld.image(this.audioPost.img.toString()).resize(fill().width(350).height(200)).roundCorners(byRadius(20))
    this.img.resize(fill().width(350).height(200)).roundCorners(byRadius(20));

    this.returnColor();
  }

  playButton() {
    var audio = document.getElementById(this.audioPost.id.toString()) as HTMLAudioElement;

    if (!this.playBtn) {
      this.playBtn = true;
      audio.play()

    } else if (this.playBtn) {
      this.playBtn = false;
      audio.pause()
    }

    if (audio.ended) {
      this.playBtn = false;
    }

  }

  async getMostPopularThemes() {
    await this.postsService.getTopFiveThemes().then(result => {
      this.popularThemes = result;
      this.themeValue = this.audioPost.theme;
    });
  }

  async returnColor() {
    await this.getMostPopularThemes();
    switch (this.audioPost.theme) {
      // @ts-ignore
      case this.popularThemes[0][0]:
        this.color = Theme.SUN;
        // this.audioPost.theme = Theme.SUN;
        break;
      // @ts-ignore
      case this.popularThemes[1][0]:
        this.color = Theme.SAND;
        // this.audioPost.theme = Theme.SAND;
        break;
      // @ts-ignore
      case this.popularThemes[2][0]:
        this.color = Theme.FOREST;
        // this.audioPost.theme = Theme.FOREST;
        break;
      // @ts-ignore
      case this.popularThemes[3][0]:
        this.color = Theme.WATER;
        // this.audioPost.theme = Theme.WATER;
        break;
      // @ts-ignore
      case this.popularThemes[4][0]:
        this.color = Theme.MOUNTAIN;
        // this.audioPost.theme = Theme.MOUNTAIN;
        break;
      default:
        this.color = Theme.CITY;
        // this.audioPost.theme = Theme.CITY;
        break;
    }
    return this.theme;
  }

  toggleShow() {

    this.isShown = !this.isShown;

  }

  like: Like = null;
  updatedLike: Like = null;

  async addToLikes() {
    let currentUser = Object.assign(new User(), this.authService.getUser());
    let post = await Object.assign(new Formattedpost(), this.audioPost);
    this.like = await new Like(null, post, currentUser);
    if (this.like != null) {
      this.likesService.restPostLike(this.like).subscribe(
        (data) => {
          console.log(data);
          this.updatedLike = data;
        },
        (error =>
          console.log(error))
      );
    }
  }

  removeFromLikes() {
    this.likesService.getFavorites(this.authService.getUser().email).subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].post.id == this.audioPost.id) {
            this.likesService.restRemoveLike(data[i].id).subscribe(
              (data) => {
                console.log(data)
              },
              (error =>
                console.log(error))
            );
          }
        }
      }
   );
  }


 async sharePost() {
    if (navigator.share) {

    }
    const shareData = {
      title: this.audioPost.title,
      text: this.audioPost.description,
      url: 'https://audiodiary-fe-team1-staging.herokuapp.com/feedview/'+this.audioPost.id
    }

      await navigator.share(shareData)

  }
}

