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

}
