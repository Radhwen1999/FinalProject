import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {Store} from "../../classes/store";
import {PosteStore} from "../../classes/PostStore";
import {PostLike} from "../../classes/PostLike";
import {PostComment} from "../../classes/PostComment";

// @ts-ignore


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // tslint:disable-next-line:variable-name
  readonly ADD_Store = 'http://localhost:9092/COCO/api/api/store/addStore';
  // tslint:disable-next-line:variable-name
  readonly Get_Store = 'http://localhost:9092/COCO/api/store/get_all_Stores';
  // tslint:disable-next-line:variable-name
  readonly DELETE_Store = 'http://localhost:9092/COCO/api/store/deleteStore/';

  readonly FIND_BY_ID = 'http://localhost:9092/COCO/api/store/retrive_Store/';

  private apiUrl = 'http://localhost:9092/COCO/api/store';

  ForumUrl = 'http://localhost:9092/COCO/api/store/Get-all-Post';

  constructor(private httpClient: HttpClient) {
    // @ts-ignore

  }
  addStore(store: FormData): Observable<any> {
    return this.httpClient.post(this.ADD_Store, store );
  }
  getAllStores() {
    return this.httpClient.get<Store[]>(this.Get_Store);
  }
  deleteStore(storeId: number){
    return this.httpClient.delete(this.DELETE_Store + storeId);
  }
  getStoreDetails(storeId){
    return this.httpClient.get<Store>(this.FIND_BY_ID + storeId);
  }

  getPosts(): Observable<PosteStore[]> {
    return this.httpClient.get<PosteStore[]>(this.ForumUrl);
  }

  addPostLike(id: string, postLike: PostLike) {
    return this.httpClient.post<PostLike>('http://localhost:9092/COCO/api/store/add-Like-post/' + id + '/1', postLike);
  }
  addPostDisLike(id: string, postLike: PostLike) {
    return this.httpClient.post<PostLike>('http://localhost:9092/COCO/api/store/add-DisLike-post/' + id + '/1', postLike);
  }
  ratePost(idp: string , x: string) {
    // @ts-ignore
    return this.httpClient.put<PostComment>('http://localhost:9092/COCO/api/store/Give-post-etoile/' + idp + '/'  + x );

  }
  reportPost(idp: string ) {
    return this.httpClient.get<any>('http://localhost:9092/COCO/api/store/Report-Post/' + idp );

  }
  addCommentPst(idPost: string, postComment: PostComment) {
    return this.httpClient.post<Comment>('http://localhost:9092/COCO/api/store/add-Comment/' + idPost + '/1', postComment);
  }

}
