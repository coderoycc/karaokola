import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  private socket = io.io('http://192.168.110.29:3000');
  constructor() { }

  getMusicList(){
    this.socket.emit('getkaraokola','');
  }

  cargarActual(){
    this.socket.emit('cargarActual','');
  }

  playVideo(){
    this.socket.emit('playVideo','');
  }
  pauseVideo(){
    this.socket.emit('pauseVideo','');
  }
  emitReloadVideo(){
    this.socket.emit('reloadVideo','');
  }

  emitNextVideo(){
    this.socket.emit('nextVideo','');
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

  initVideo(){
    let observable = new Observable<string>(observer => {
      this.socket.on('initVideo', (data) => {
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
