import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISkill } from 'src/app/interfaces/skill.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private httpClient: HttpClient) { }

  getSkills(): Observable<ISkill[]> {
    return this.httpClient.get<ISkill[]>(environment.apiUrl + 'api/skills')
      .pipe()
  }
}
