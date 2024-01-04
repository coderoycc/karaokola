import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  private socket = io.io('http://localhost:3000');
  constructor() { }

  getMusicList(){
    this.socket.emit('getkaraokola','');
  }

  playVideo(){
    this.socket.emit('playVideo','');
  }
  pauseVideo(){
    this.socket.emit('pauseVideo','');
  }

  delete(message: string){
    this.socket.emit('deletekaraokola', message);
  }
  newOrder(message: string){
    console.log('enviando nuevo orden')
    this.socket.emit('refreshkaraokola', message);
  }

  refreshMusicList(){
    let observable = new Observable<string>(observer => {
      this.socket.on('refreshkaraokola', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };  
    });
    return observable;
  }

  currentVideo(){
    let observable = new Observable<string>(observer => {
      this.socket.on('currentVideo', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };  
    });
    return observable;
  }

  playCurrentVideo(){
    let observable = new Observable<string>(observer => {
      this.socket.on('playVideo', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };  
    });
    return observable;
  }
  reloadVideo(){
    let observable = new Observable<string>(observer => {
      this.socket.on('reloadVideo', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };  
    });
    return observable;
  }
  nextVideo(){
    let observable = new Observable<string>(observer => {
      this.socket.on('nextVideo', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };  
    });
    return observable;
  }
}
