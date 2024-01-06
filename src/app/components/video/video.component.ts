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
  vhcontainer:number = 88; 
  myVideo: HTMLVideoElement;
  estadoVideoActual: VideoState = {
    play: false,
    usuario: '',
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
    alert('Necesario para iniciar');
    // poner pantalla completa
    // document.body.requestFullscreen();
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
        }, 900);
      }
    });
    this.socket.reloadVideo().subscribe(data => {
      console.log('VIDEO DESDE 0')
      this.reloadVideo();
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
      this.myVideo.play();
      this.estadoVideoActual.play = true;
    }
  }
  reloadVideo(){
    console.log('VIDEO RELOAD RECBIDO')
    this.myVideo.currentTime = 0;
  }
  nextVideo(){
    console.log('VIDEO NEXT RECBIDO')
  }
  volumen(value:number){
    console.log('VIDEO VOLUME RECBIDO')
  }
  
  // cambiar altura contenedor
  cambiarAltura(){
    this.vhcontainer = this.vhcontainer + 1;
  }
}
