import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  videoState: {event:string, value:any} = {
    event: 'start',
    value: '0'
  };
  private videoSubject: BehaviorSubject<{event:string, value:any}> = new BehaviorSubject(this.videoState);
  videoState$: Observable<{event:string, value:any}> = this.videoSubject.asObservable();
  constructor() { }

  play(){
    this.videoState.event = 'play';
    this.videoState.value = 1;
    console.log('ENVIANDO SERVICIO')
    this.videoSubject.next(this.videoState);
  }
  pause(){
    this.videoState.event = 'pause';
    this.videoState.value = 0;
    this.videoSubject.next(this.videoState);
  }
  volumen(value: number){
    this.videoState.event = 'volumen';
    this.videoState.value = value;
    this.videoSubject.next(this.videoState);
  }
  reload(){
    this.videoState.event = 'reload';
    this.videoState.value = 1;
    this.videoSubject.next(this.videoState);
  }

  nextVideo(){
    this.videoState.event = 'next';
    this.videoSubject.next(this.videoState);
  }
}
