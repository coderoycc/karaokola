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
    descripcion:'() Sin Video Actual',
    ruta: '',
    volumen: 50
  }
  items: MusicElement[] = [];
  constructor(private socket: SocketService, private videoService: VideoService){
    this.socket.getMusicList();
  }
  ngOnInit(){
    this.socket.refreshMusicList().subscribe(data => {
      console.log('evento escuchado -- ')
      this.items = JSON.parse(data);
    });
    this.socket.currentVideo().subscribe(data => {
      if(data.length > 0){
        const video = JSON.parse(data);
        this.estadoVideoActual.play = video.play;
        this.estadoVideoActual.descripcion = video.descripcion;
        this.estadoVideoActual.ruta = video.ruta;
        this.estadoVideoActual.volumen = 50;
      }else{
        alert('No hay videos en cola')
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
    this.socket.playVideo();
  }
  pauseVideo(){
    this.socket.pauseVideo();
  }

  reloadVideo(){
    this.videoService.reload();
  }
  nextVideo(){
    this.videoService.nextVideo();
  }
  volumen(){
    const value:number = 19;
    this.videoService.volumen(value);
  }
}
