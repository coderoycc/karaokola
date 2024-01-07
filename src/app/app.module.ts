import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelComponent } from './components/panel/panel.component';
import {
  CdkDrag,
  CdkDragPlaceholder,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { VideoComponent } from './components/video/video.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ImageComponent } from './components/image/image.component';
import { ToastrModule } from 'ngx-toastr';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    VideoComponent,
    LayoutComponent,
    ImageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSliderModule,
    FormsModule,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3100,
      progressBar: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {  }
