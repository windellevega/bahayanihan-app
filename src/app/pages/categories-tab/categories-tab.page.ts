import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISkill } from 'src/app/interfaces/skill.interface';
import { SkillService } from 'src/app/services/skill/skill.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-workers-tab',
  templateUrl: 'categories-tab.page.html',
  styleUrls: ['categories-tab.page.scss']
})
export class CategoriesTabPage implements OnInit {

  skills: ISkill[];
  skillsFiltered: ISkill[];
  constructor(
    private router: Router,
    private skillService: SkillService,
    private loadingController: LoadingController) {
    }

  ngOnInit() {
    this.loadSkills();
  }

  loadMap(skillId) {
    this.router.navigate(['/main/tabs/map-tab'], { queryParams: { skillId }});
  }

  async loadSkills() {
    this.showSkillsLoading();

    await this.skillService.getSkills()
      .subscribe(data => {
        this.skills = data;
        this.skillsFiltered = data;
        this.hideSkillsLoading();
      });
  }

  filterList(event) {
    const value = event.target.value;
    this.skillsFiltered = this.skills;
    if (value && value.trim() !== '') {
      this.skillsFiltered = this.skills.filter((skill) => {
        return (skill.skill_name.toLowerCase().indexOf(value.trim().toLowerCase()) > -1);
      });
    }
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
