import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent  {
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.altKey && event.key === 'p'){
      if(this.play === 'PAUSE'){
        this.myVideo.play();
        this.play = 'PLAY';
      }else{
        this.myVideo.pause();
        this.play = 'PAUSE';
      }
    }
  }
  myVideo: HTMLVideoElement;
  play: 'PLAY' | 'PAUSE' = 'PAUSE';
  constructor(private elementRef: ElementRef) {
    this.myVideo = this.elementRef.nativeElement.querySelector('#myVideo');
  }

  ngOnInit() {
    this.myVideo = this.elementRef.nativeElement.querySelector('#myVideo');
  }
  
}
