import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { TForm } from '../../genericHelper';
import { User } from '../../Models/user';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../_alert';
import { CookieService } from 'ngx-cookie';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
 // user = new User();

  loginForm: TForm<User> = this.fb.group({
    username: ['', Validators.required],
    password: ['',Validators.required],
    // address: this.fb.group({
    //   street: [''],
    //   city: [''],
    //   state: [''],
    //   zip: ['']
    // }),
    // aliases: this.fb.array([this.fb.control('')])
  }) as TForm<User>;

  errormsg:string;
  errorcolor:string;

  constructor(private router : Router,
    private loginservice:LoginService,
    private fb: FormBuilder,
    protected alertService: AlertService,
    private cookieService: CookieService ,
    private ngxLoader: NgxUiLoaderService 
    ) {
      this.cookieService.removeAll();  
  }
  get aliases() {
    return this.loginForm.get('aliases') as FormArray;
  }

  getToken(){
    this.ngxLoader.start();
    this.errormsg="";
    this.loginservice.login(this.loginForm.value.username,this.loginForm.value.password)
    .subscribe(
      (res) => {         
        if(res.Status == 'Failed'){
          this.errorcolor = "red";
          this.errormsg = "Uername or password is incorrect";
        }
        else{
        this.cookieService.put( 'jwttoken', res.Token); // To Set Cookie4
        this.cookieService.put( 'userobject', JSON.stringify(res));
        this.router.navigateByUrl('/dashboard');
        
        }
        this.ngxLoader.stop();
        
        //console.log("jwttoken",this.cookieService.get('jwttoken'));  

        //this.cookieValue = this.cookieService.get('name'); // To Get Cookie     
      }, // success path
      error => {console.log(error)
        this.errorcolor = "red";
        this.errormsg = "Something went wrong.Please contact your administrator";
        this.ngxLoader.stop();
      
      } // error path
        
    ); 
  }
  goToRegister(){
    this.router.navigateByUrl('/register');
  }
 }
