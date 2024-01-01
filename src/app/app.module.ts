import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { KaraokeListComponent } from './components/karaoke-list/karaoke-list.component';
import { MusicListComponent } from './components/music-list/music-list.component';
import { PanelComponent } from './components/panel/panel.component';
import {
  CdkDrag,
  CdkDragPlaceholder,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { VideoComponent } from './components/video/video.component';

@NgModule({
  declarations: [
    AppComponent,
    KaraokeListComponent,
    MusicListComponent,
    PanelComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
