import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISkill } from 'src/app/interfaces/skill.interface';
import { SkillService } from 'src/app/services/skill/skill.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-workers-tab',
  templateUrl: 'workers-tab.page.html',
  styleUrls: ['workers-tab.page.scss']
})
export class WorkersTabPage implements OnInit{

  skills: ISkill[];
  constructor(
    private router: Router,
    private skillService: SkillService,
    private loadingController: LoadingController) {}

  ngOnInit() {
    this.loadSkills();
  }

  loadMap(skillId) {
    this.router.navigate(['/main/tabs/map-tab'], { queryParams: { skillId: skillId}});
  }

  async loadSkills() {
    this.showSkillsLoading();

    await this.skillService.getSkills()
      .subscribe(data => {
        this.skills = data;
        this.hideSkillsLoading();
      })
  }

  async showSkillsLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'lines',
      translucent: true
    });
    await loading.present();
  }

  async hideSkillsLoading() {
    const loading = await this.loadingController.getTop();
    loading.dismiss();
  }
}
