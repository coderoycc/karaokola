import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {
  items = [
    '(Pepito) Artista 1 - cancion',
    '(Canelo) Artista 2 - cancion',
    '(Canelo) Artista 3 - cancion',
    '(Javi) Artista 1 - cancion 4',
    '(Nest) Artista 3 - cancion 3',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    console.log(this.items)
  }
  deleteElement(movie: string){
    const index = this.items.indexOf(movie);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
