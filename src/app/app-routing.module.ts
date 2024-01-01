import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KaraokeListComponent } from './components/karaoke-list/karaoke-list.component';
import { MusicListComponent } from './components/music-list/music-list.component';
import { PanelComponent } from './components/panel/panel.component';
import { VideoComponent } from './components/video/video.component';

const routes: Routes = [
  { path:'karaokes', component: KaraokeListComponent },
  { path: 'musicas', component: MusicListComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'video', component: VideoComponent },
  { path: '', redirectTo: '/panel', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
