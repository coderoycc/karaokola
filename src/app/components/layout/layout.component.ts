import { Component } from '@angular/core';
import { MusicElement } from 'src/app/interfaces/interface.musica';
import { VideoState } from 'src/app/interfaces/interface.videostate';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  vhcontainer:number = 95;
  verBarra: boolean = true;
  colaVideos: MusicElement[] = []
  mostrarVideo: boolean = false;
  estadoVideoActual: VideoState = {
    play: false,
    usuario: '',
    descripcion:'',
    ruta: '',
    volumen: 50
  }
  constructor(private socket: SocketService) {
    this.socket.getMusicList();
    this.socket.currentVideo();
  }
  ngOnInit(){
    alert('Necesario para iniciar')
    this.socket.refreshMusicList().subscribe(data => {
      console.log('Videos LIST')
      this.colaVideos = JSON.parse(data);
    });
    this.socket.playCurrentVideo().subscribe(data => {
      console.log('VIDEO PLAY RECIBIDO', data)
      if(data.length > 0){// video existe
        const video = JSON.parse(data);
        if(video.ruta.length > 4){
          this.estadoVideoActual.ruta = video.ruta;
          this.estadoVideoActual.play = video.play;
          this.mostrarVideo = true;
          this.estadoVideoActual.usuario = video.usuario;
          this.estadoVideoActual.descripcion = video.descripcion;
          this.estadoVideoActual.volumen = video.volumen;
          const eventoPlay = this.estadoVideoActual.play ? 'play' : 'pause';
          this.socket.emitVideoPlay(eventoPlay);
        }else{
          this.mostrarVideo = false;
        }
      }else{
        this.mostrarVideo = false;
      }
    });
    this.socket.ocultarBarra().subscribe(data => {
      this.verBarra = !this.verBarra;
    })
  }
  cambiarAltura(){
    this.vhcontainer = 100;
  }
}
