import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MusicElement } from 'src/app/interfaces/interface.musica';
import { SocketService } from 'src/app/services/socket.service';
import { VideoState } from 'src/app/interfaces/interface.videostate';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {
  estadoVideoActual: VideoState = {
    play: false,
    usuario: '()',
    descripcion:'Sin Video Actual',
    ruta: '',
    volumen: 50
  }
  items: MusicElement[] = [];
  constructor(private socket: SocketService, private videoService: VideoService){
    this.socket.getMusicList();
    this.socket.cargarActual();
  }
  ngOnInit(){
    this.socket.refreshMusicList().subscribe(data => {
      console.log('evento escuchado -- ')
      this.items = JSON.parse(data);
    });
    this.socket.initVideo().subscribe(data => {
      console.log('Cargando el video INICIO')
      const video = JSON.parse(data)
      this.estadoVideoActual.play = video.play;
      this.estadoVideoActual.usuario = video.usuario;
      this.estadoVideoActual.descripcion = video.descripcion;
      this.estadoVideoActual.ruta = video.ruta;
      this.estadoVideoActual.volumen = video.volumen;
    })
    this.socket.currentVideo().subscribe(data => {
      console.log('Video ActualXDXD', data)
      if(data.length > 0){ 
        const video = JSON.parse(data);
        this.estadoVideoActual.play = video.play;
        this.estadoVideoActual.descripcion = video.descripcion;
        this.estadoVideoActual.ruta = video.ruta;
        this.estadoVideoActual.volumen = 50;
      }else{ // respuesta cadena vacia
        alert()
      }
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    console.log(this.items)
    this.socket.newOrder(JSON.stringify(this.items));
  }
  deleteElement(movie: MusicElement){
    const index = this.items.indexOf(movie);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.socket.delete(JSON.stringify(this.items));
    }
  }

  playVideo(){
    console.log('antes', this.estadoVideoActual.play);
    this.socket.playVideo();
    this.estadoVideoActual.play = !this.estadoVideoActual.play
    console.log('despues', this.estadoVideoActual.play);
  }

  reloadVideo(){
    console.log('ReloadVIDEO')
    this.socket.emitReloadVideo();
  }
  nextVideo(){
    this.socket.emitNextVideo();
  }
  volumen(){
    const value:number = 19;
    this.videoService.volumen(value);
  }
}
