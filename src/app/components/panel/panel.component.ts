import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MusicElement } from 'src/app/interfaces/interface.musica';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {
  items: MusicElement[] = [];
  constructor(private socket: SocketService){
    this.socket.getMusicList();
  }
  ngOnInit(){
    this.socket.refreshMusicList().subscribe(data => {
      console.log('evento escuchado -- ')
      this.items = JSON.parse(data);
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
}
