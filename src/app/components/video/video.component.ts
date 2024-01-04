import { Component, HostListener, ElementRef } from '@angular/core';
import { MusicElement } from 'src/app/interfaces/interface.musica';
import { VideoState } from 'src/app/interfaces/interface.videostate';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent  {
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.altKey && event.key === 'p'){
      this.playVideo();
    }
  }
  myVideo: HTMLVideoElement;
  estadoVideoActual: VideoState = {
    play: false,
    descripcion:'',
    ruta: '',
    volumen: 50
  }
  colaVideos: MusicElement[] = []
  constructor(private elementRef: ElementRef, private socket: SocketService) {
    this.myVideo = this.elementRef.nativeElement.querySelector('#myVideo');
    this.socket.getMusicList();
  }

  ngOnInit() {
    this.myVideo = this.elementRef.nativeElement.querySelector('#myVideo');
    this.socket.refreshMusicList().subscribe(data => {
      console.log('Videos LIST')
      this.colaVideos = JSON.parse(data);
    });
    this.socket.playCurrentVideo().subscribe(data => {
      console.log('VIDEO PLAY RECIBIDO', data)
      if(data.length > 0){
        const video = JSON.parse(data);
        this.estadoVideoActual.ruta = video.ruta;
        this.estadoVideoActual.descripcion = video.descripcion;
        setTimeout(() => {
          this.myVideo = this.elementRef.nativeElement.querySelector('#myVideo');
          console.log(this.myVideo)
          this.playVideo();
        }, 1000);
      }
    });
    this.socket.reloadVideo().subscribe(data => {

    });
    this.socket.nextVideo().subscribe(data => {

    })
  }

  playVideo(){  
    console.log('VIDEO PLAY RECBIDO')
    console.log(this.myVideo)
    if(this.estadoVideoActual.play){
      this.myVideo.pause();
      this.estadoVideoActual.play = false;
    }else{
      // this.myVideo.muted = true;
      this.myVideo.play();
      this.estadoVideoActual.play = true;

      // setTimeout(() => {
      //   // this.myVideo.volume += 100;
      //   if (this.myVideo.volume < 1.0) {
      //     this.myVideo.volume += 0.1;
      //   }
      // }, 2000);
    }
  }
  reloadVideo(){
    console.log('VIDEO RELOAD RECBIDO')
  }
  nextVideo(){
    console.log('VIDEO NEXT RECBIDO')
  }
  volumen(value:number){
    console.log('VIDEO VOLUME RECBIDO')
  }
  
}
