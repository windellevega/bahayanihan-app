import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  confirmPasswordError: string;

  error_messages = {
    'firstname': [
      { type: 'required', message: 'First Name is required.'},
    ],
    'lastname': [
      { type: 'required', message: 'Last Name is required.'},
    ],
    'email_address': [
      { type: 'required', message: 'Email Address is required.'},
      { type: 'email', message: 'Email Address must be a valid email.'},
    ],
    'username': [
      { type: 'required', message: 'Username is required.'},
    ],
    'password': [
      { type: 'required', message: 'Password is required.'},
    ],
    'confirmPassword': [
      { type: 'required', message: 'Confirm Password is required.'},
    ],
    'mobile_number': [
      { type: 'required', message: 'Mobile Number is required.'},
      { type: 'pattern', message: 'Mobile Number must be valid.'},
    ],
    'address': [
      { type: 'required', message: 'Address is required.'},
    ]
  }

  constructor(
    private userService: UserService,
    private loadingController: LoadingController,
    private router: Router,
    private formBuilder: FormBuilder) {
      this.registerForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        middlename: [''],
        lastname: ['', Validators.required],
        email_address: ['', Validators.compose([Validators.email, Validators.required])],
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        mobile_number: ['', Validators.compose([Validators.pattern('^(09)[0-9]{9}$'), Validators.required])],
        address: ['', Validators.required]
      });
    }

  ngOnInit() {
  }

  async registerUser() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value.mobile_number);
      await this.showSigningUpLoading();

      await this.userService.registerUser(
        this.registerForm.value.firstname,
        this.registerForm.value.middlename,
        this.registerForm.value.lastname,
        this.registerForm.value.email_address,
        this.registerForm.value.username,
        this.registerForm.value.password,
        this.registerForm.value.mobile_number,
        this.registerForm.value.address)
        .subscribe(res => {
          if (res.access_token) {
            localStorage.setItem('access_token', res.access_token);
            this.router.navigate(['/main/tabs']);
          } else {
            this.router.navigate(['/register']);
          }
          this.hideSigningUpLoading();
        });
    } else {
      console.log('Invalid inputs');
    }

  }

  async showSigningUpLoading() {
    const loading = await this.loadingController.create({
      message: 'Signing up...',
      spinner: 'lines'
    });

    await loading.present();
  }

  async hideSigningUpLoading() {
    const loading = await this.loadingController.getTop();
    loading.dismiss();
  }

  validateConfirmPassword() {
    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.confirmPasswordError = 'Confirm Password must be the same with Password.';
    } else {
      this.confirmPasswordError = '';
    }
  }

  checkRegistrationForm() {
    if (this.registerForm.valid && this.confirmPasswordError === '') {
      return true;
    }
    return false;
  }
}
