import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlayerComponent } from './player.component';
import { PlayerRoutes } from './player.routes';

@NgModule({
  declarations: [],
  imports: [PlayerComponent, CommonModule, RouterModule.forChild(PlayerRoutes)],
})
export class PlayerModule {}
