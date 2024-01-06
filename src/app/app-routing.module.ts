import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './components/panel/panel.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  { path: 'panel', component: PanelComponent },
  { path: 'video', component: LayoutComponent },
  { path: '', redirectTo: '/panel', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
