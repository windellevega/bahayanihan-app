import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user/user-auth.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usernameOrEmail: string
  password: string

  constructor(private userAuthService: UserAuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.userAuthService.login(this.usernameOrEmail, this.password).subscribe(status => {
      if(status) {
        this.router.navigate(['/main/tabs']);
      }
      else {
        alert("Incorrect login credentials.");
      }
    });
  }
}
