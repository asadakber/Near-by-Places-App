import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../../store/reducers/root';
import { SIGNUP } from '../../store/actions/auth';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  signupForm: FormGroup
  constructor(private ngRedux: NgRedux<AppState>,private fb: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  GoToLoginPage() {
    this.navCtrl.push(LoginPage)
  }

  signup() {
    this.ngRedux.dispatch({
      type: SIGNUP,
      payload: this.signupForm.value,
      navCtrl: () => this.navCtrl.push(LoginPage)
    })
    this.signupForm.reset()
  }

}
