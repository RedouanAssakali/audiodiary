import {Component, OnInit, Output} from '@angular/core';
import {Post} from "../../../models/post";
import {Theme} from "../../../enums/theme";
import {PostsService} from "../../../services/posts.service";

@Component({
  selector: 'app-feedview',
  templateUrl: './feedview.component.html',
  styleUrls: ['./feedview.component.css']
})
export class FeedviewComponent implements OnInit {

  popularPosts: String[];
  posts: Post[];
  text: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  @Output()
  mapview: string = "Mapview";

  constructor(private postsService: PostsService) {

  }
  getAllPosts(): void{
    this.postsService.restGetPosts().subscribe(
      (data) => {
        // @ts-ignore
        this.posts = data;
        //console.log(data);
      },
      (error) => console.log("Error: " + error.status + " - " + error.error)
    );
  }

  getMostPopularThemes(): void {
    this.popularPosts = this.postsService.getTopFiveThemes();
    console.log(this.popularPosts);
  }

  ngOnInit(): void {
    this.getAllPosts();
    console.log(this.getAllPosts());
    this.getMostPopularThemes();
    // this.posts.push(new Post(1,"haji", "River Sounds", this.text,"river.jpg",Theme.SUN, true))
    // this.posts.push(new Post(2,"amshoum", "Brown Mountains", this.text,"mountain.jpg",Theme.MOUNTAIN, false))
    // this.posts.push(new Post(3,"boras", "Amazon Birds", this.text,"amazon.jpg",Theme.FOREST, true))
    // this.posts.push(new Post(4, "farid","Sound of Waves", this.text,"seawaves.jpg",Theme.WATER, false))
    // this.posts.push(new Post(5, "aziz","Sand storm", this.text,"sandstorm.jpg",Theme.SAND, true))
    // this.posts.push(new Post(6, "joost","Amsterdam bikes", this.text,"amsterdamBikes.jpg",Theme.CITY, false))
    //
  }

//  returnColor(post: Post) {
  //   switch (post.theme) {
  //     case this.popularPosts[0]:
  //       post.theme = "red"
  //       break;
  //     case this.popularPosts[1]:
  //       post.theme = "orange"
  //       break;
  //     case this.popularPosts[2]:
  //       post.theme = "yellow"
  //       break;
  //     case this.popularPosts[3]:
  //       post.theme = "green"
  //       break;
  //     case this.popularPosts[4]:
  //       post.theme = "blue"
  //       break;
  //     case this.popularPosts[5]:
  //       post.theme = "grey"
  //       break;
  //   }
  //
  //   return post.theme;
  // }

}
