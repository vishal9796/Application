import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TForm } from '../../genericHelper';
import { registeruser } from '../../Models/registeruser';
import { AlertService } from '../_alert';
import { RegisteruserService } from './registeruser.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm:TForm<registeruser> ;
  
  disabled = false;
  ShowFilter = false;
  //limitSelection = false;
  technologies = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings;
  submitted:boolean=false;
  errormsg:string;
  errorcolor:string;

  constructor(private router : Router,private fb: FormBuilder,private registerService:RegisteruserService
    ,private alertservice :AlertService
    , private ngxLoader: NgxUiLoaderService ) { }
  ngOnInit() {
    this.registerForm= this.fb.group({
      Name: ['', Validators.required],
      Email: ['',[Validators.required, Validators.email]],
      Contact: ['',Validators.required],
      Address: [''],
      RawPassword: ['',[Validators.required,Validators.minLength(6)]],
      Password:['',Validators.required]
      //technology: [[],Validators.required],    
         
    }
    ,{ validator: this.MustMatch('RawPassword', 'Password')}) as TForm<registeruser>;
    this.technologies = [
      { item_id: 1, item_text: '.Net' },
      { item_id: 2, item_text: 'Java' },
      { item_id: 3, item_text: 'ML,Python' },
      { item_id: 4, item_text: 'AI' },
      { item_id: 5, item_text: 'Angular' },     
    ];
    //this.selectedItems = [{ item_id: 4, item_text: 'AI' }, { item_id: 5, item_text: 'Angular' }];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: this.ShowFilter    

    };
    
     
    // this.registerForm = this.fb.group({
    //   technology: [this.selectedItems]
    // });
     
  }
  // comparePasswords(){
  //   //return false;
  // }
  // comparePasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
  //   let pass = this.registerForm.get('RawPassword').value;
  //   let confirmPass = this.registerForm.get('Password').value
  //   return pass === confirmPass ? null : { notSame: true }
  // }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  handleLimitSelection() {
    // if (this.limitSelection) {
    //   this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    // } else {
    //   this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    // }
  }
  registerMe(){
    this.submitted=true;
    if (this.registerForm.invalid) {
      return;
    }    
    this.ngxLoader.start();
    let register = new registeruser();
    register.Name = this.registerForm.value.Name;
    register.Email = this.registerForm.value.Email;
    register.Contact = this.registerForm.value.Contact;
    register.Address = this.registerForm.value.Address;
    register.Password = this.registerForm.value.Password;     
    this.registerService.register(register)
    .subscribe(
      (res) => {  
        if(res.Status == 'Success'){
         // this.alertservice.success("Successfuly Saved");
         this.errormsg = "You have successfully registered";
         this.errorcolor = "darkgreen"
         this.registerForm.reset();
         this.submitted=false;
        }
        else{
          this.errorcolor = "red";
          this.errormsg = res.Message;
          
        }
        this.ngxLoader.stop();
        //console.log("response",res);  
        //this.cookieService.set( 'userobject', res); // To Set Cookie
       // this.cookieValue = this.cookieService.get('name'); // To Get Cookie     
      }, // success path
      error => {console.log(error);
        this.ngxLoader.stop();
        this.errorcolor = "red";
        this.errormsg = "Something went wrong.Please contact your administrator";} // error path
    ); 
  }
  goToLogin(){
    this.router.navigateByUrl('/login');
  }

}
