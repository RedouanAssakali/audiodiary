import {ErrorHandler, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {catchError, map} from "rxjs/operators";
import {environment} from "../../environments/environment.staging";


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class PostsService {

  constructor(private http: HttpClient) {
    this.restGetPosts();
  }

  restGetPosts():Observable<Post[]> {

    return this.http.get<Post[]>(`${environment.apiUrl}/posts`).pipe(
      map( (postCards: any[]) => {
        const posts: Post[] = [];
        for (const post of postCards) {
          posts.push(post);
        }
        return posts;
      }));
  }

  // getTopFiveThemes():Observable<any> {
  //   return this.http.get<any[]>(`${environment.apiUrl}/posts`).pipe(
  //     map( (postCards: any[]) => {
  //       const themes: String[] = [];
  //       let strArray = postCards;
  //       let findDuplicates = (arr: any[]) => arr.filter((item, index) => arr.indexOf(item) != index)
  //
  //       return new Set(findDuplicates(strArray));
  //     }));
  // }

  getTopFiveThemes():any {
    let strArray = [ "q", "q", "w", "w", "w", "e", "i", "u", "r", "u", "u", "u"];
    var count = {};
    strArray.forEach(function(i) { // @ts-ignore
      count[i] = (count[i]||0) + 1;});

    // @ts-ignore
    var result = Object.entries(count);
    //let findDuplicates = (arr: any[]) => arr.filter((item, index) => arr.indexOf(item) != index)
    //let set = new Set(findDuplicates(strArray));
    //let array = Array.from(set);
    result.sort((a: any, b: any) => {
      return b[1] - a[1];
    });
    return result.slice(0, 5);
  }

  getReportedPosts():Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`).pipe(
      map( (postCards: any[]) => {
        const posts: Post[] = [];
        for (const post of postCards) {
          if (post.amountReport > 0) {
            posts.push(post);
          }
        }
        return posts.sort((a: Post, b: Post) => {
          return b.amountReport - a.amountReport;
        });
      }));
  }

  restGetPost(postId: number):Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}/posts/${postId}`);
  }

  restGetPostsOfUser(userId: number) {
    return this.http.get<Post[]>(`${environment.apiUrl}/users/${userId}/posts`).pipe(
      map( (postList: any[]) => {
        const posts: Post[] = [];
        for (const post of postList) {
          posts.push(post);
        }
        return posts;
      }));
  }

  restPostPost(postId: number):Observable<Post[]> {
    const url = `${environment.apiUrl}/posts/${postId}`;
    return this.http.post<Post[]>(url, postId);
    // restPostPost(postId: number):Observable<Post[]> {
    //   const url = `http://localhost:8084/posts/${postId}`;
    //   return this.http.post<Post>(url, postId);
  }

  restCreateNewPost(post: Post):Observable<Post>{
    const url = `${environment.apiUrl}/posts`;
    return this.http.post<Post>(url, post);
  }

  restPutPost(post: Post):Observable<Post[]> {
    console.log(post);
    const url = `${environment.apiUrl}/posts/${post.id}`;
    return this.http.put<Post[]>(url, post);
  }

  restDeletePosts(postId: number):Observable<Post> {
    const url = `${environment.apiUrl}/posts/${postId}`;
     return this.http.delete<Post>(url);
  }

}
