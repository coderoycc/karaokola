import { Component, HostListener, ElementRef, Input, ViewChild } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent  {
  // @HostListener('window:keydown', ['$event'])
  // keyEvent(event: KeyboardEvent) {
  //   if(event.altKey && event.key === 'p'){
      
  //   }
  // }
  @Input() videoUrl: string = '';
  @Input() play: boolean = false;
  @ViewChild('myVideo') listener?: ElementRef;
  firstPlay: boolean;
  myVideo: HTMLVideoElement;
  constructor(private elementRef: ElementRef ,private socket: SocketService) {
    this.myVideo = this.elementRef.nativeElement.querySelector('video');
    this.firstPlay = true;
  }

  ngOnInit() {
    this.myVideo = this.elementRef.nativeElement.querySelector('video');
    this.socket.videoPlay().subscribe((data) => {
      console.log('EVENTO PLAY PAUSE RECIBIDO')
      this.play = data == 'play' ? true : false;
      this.playPause();
    });
    this.socket.reloadVideo().subscribe((data) => {
      console.log('[SOCKET] RELOAD VIDEO');
      this.reloadVideo();
    });

    this.socket.videoVolume().subscribe((data) => {
      console.log('[SOCKET] Volumen video')
      if(this.myVideo){
        const vol = Number(data)/100;
        this.myVideo.volume = vol;
      }
    })
  }

  // Suscriptores para los eventos del video
  playSubscription: any;
  pauseSubscription: any;
  endedSubscription: any;

  ngAfterViewInit() {
    if(this.listener){
      // Configura los eventos del video
      this.playSubscription = this.listener.nativeElement.addEventListener('play', () => {
        this.socket.emitVideoPlay('play');
        if(this.firstPlay && this.myVideo){
          this.myVideo.volume = 0.8;
          this.firstPlay = false;
        }
      });
      this.pauseSubscription = this.listener.nativeElement.addEventListener('pause', () => {
        this.socket.emitVideoPlay('pause');
      });
      this.endedSubscription = this.listener.nativeElement.addEventListener('ended', () => {
        this.socket.emitNextVideo();
      });
    }
  }

  playPause(){
    if(this.play)
      this.myVideo.play();
    else
      this.myVideo.pause();
  }
  reloadVideo(){
    console.log('VIDEO RELOAD RECBIDO')
    this.myVideo.currentTime = 0;
  }

  ngOnDestroy() {
    console.log('ELIMINANDO VIDEO')
    if(this.listener){
      this.listener.nativeElement.removeEventListener('play', this.playSubscription);
      this.listener.nativeElement.removeEventListener('pause', this.pauseSubscription);
      this.listener.nativeElement.removeEventListener('ended', this.endedSubscription);
    }
  }
  
  nextVideo(){
    console.log('VIDEO NEXT RECBIDO')
  }
}
