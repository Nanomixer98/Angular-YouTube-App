import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { YoutubeResponse } from '../models/youtbe.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = environment.youTubeApiKey;
  private playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  constructor( private http: HttpClient ) {

  }

  getVideos() {

    const url = `${this.youtubeUrl}/playlistItems`;
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '5')
      .set('playlistId', this.playlist)
      .set('key', this.apiKey)
      .set('pageToken', this.nextPageToken);

    return this.http.get<YoutubeResponse>(url, {params})
      .pipe(
        map( res =>{
          	this.nextPageToken = res.nextPageToken;
            return res.items;
        }),
        map(items => items.map(video => video.snippet) )
      )
  }
}
