import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../../pages/register/register';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../../store/reducers/root';
import { LOGIN } from '../../store/actions/auth';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../../pages/home/home';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @select((s: AppState) => s.auth.isLoggedIn) isLoggedIn$: Observable<boolean>;
  loginForm: FormGroup
  constructor(private ngRedux: NgRedux<AppState>,private fb: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.loginForm = this.fb.group({
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  GoToSignupPage() {
    this.navCtrl.push(RegisterPage)
  }

  login() {
    this.ngRedux.dispatch({
      type: LOGIN,
      payload: this.loginForm.value,
      navCtrl: () => this.navCtrl.push(HomePage)
    })
    this.loginForm.reset()
  }

}
