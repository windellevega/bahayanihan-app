import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkersTabPage } from './workers-tab.page';
import { SkillService } from 'src/app/services/skill/skill.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: WorkersTabPage }])
  ],
  providers: [SkillService],
  declarations: [WorkersTabPage]
})
export class WorkersTabPageModule {}
