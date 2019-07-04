import { Component } from '@angular/core';
import { Router } from "@angular/router"

@Component({
  selector: 'app-workers-tab',
  templateUrl: 'workers-tab.page.html',
  styleUrls: ['workers-tab.page.scss']
})
export class WorkersTabPage {

  constructor(private router: Router) {}

  loadMap() {
    this.router.navigate(['/main/tabs/map-tab'])
  }
}
