import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AlertService } from '../../_alert';
import { Roles, UserCategory } from '../../../appconstant';
import { SettingsService } from '../settings.service';
import { registeruser } from '../../../Models/registeruser';
import { category } from '../../../Models/category';
@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styles: [`
  .headerExtra{
    display: inline-block;
     
    margin-right: -0.25rem;
  }
  `
  ]
})
export class RegistrationsComponent implements OnInit {
  disabled = false;
  ShowFilter = false;
  //limitSelection = false;
  roles = [];
  
  selectedItems = [];
  dropdownSettings:IDropdownSettings;
  catdropdownSettings:IDropdownSettings;

  userlist: registeruser[] = [];
  originaluserlist: registeruser[] = [];
  usercat:category[] = [];
  IsViewMode:boolean=false;
  SearchText:string;
  showpassword:boolean = true;

  constructor(private alertservice :AlertService,
    private _service : SettingsService
    ) { }

  ngOnInit() {
    this.roles = Roles
    
    // this.roles = [
    //   { item_id: 1, item_text: 'Consultant 1' },
    //   { item_id: 2, item_text: 'Consultant 2' },
    //   { item_id: 3, item_text: 'Consultant 3' },
    //   { item_id: 4, item_text: 'Consultant 4' },
    //   { item_id: 5, item_text: 'Consultant 5' },     
    // ];
    //this.selectedItems = [{ item_id: 4, item_text: 'Pune' }, { item_id: 6, item_text: 'Navsari' }];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'roleid',
      textField: 'role',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter    

    };
    this.catdropdownSettings = {
      singleSelection: true,
      idField: 'catid',
      textField: 'category',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter    

    };
     
    // this.myForm = this.fb.group({
    //   city: [this.selectedItems]
    // });
    this.getCategory();
    this.getAll();
     
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

  handleLimitSelection() {
    // if (this.limitSelection) {
    //   this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    // } else {
    //   this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    // }
  }
  getCategory(){
    this._service.getCategory()
    .subscribe(
      (res) => {  
        if(res){
          console.log("getCategory",res);
          this.usercat = res;
        }              
      },  
      error => {console.log(error)
        } 
    ); 
  }
  getAll(){
    this._service.getAllRegistrations()
    .subscribe(
      (res) => {  
        if(res){
          this.userlist = res;
          this.IsViewMode = false;
        }              
      },  
      error => {console.log(error)
        } 
    ); 
  }


  Submit(){
    console.log("posted",this.userlist);
    //this.alertservice.success("Successfuly Saved");
    this._service.updateCategory(this.userlist)
    .subscribe(
      (res) => {  
        if(res){
          //this.userlist = res;
          this.alertservice.success("Successfuly Saved");
          this.getAll();

        }              
      },  
      error => {console.log(error)
        } 
    ); 
  }
  showAssigned(e){
    this.SearchText="";
    if(e.target.checked){
      this._service.getAssignedRegistrations()
    .subscribe(
      (res) => {  
        if(res){
          this.userlist = res;
          this.IsViewMode = true;
        }              
      },  
      error => {console.log(error)
        } 
    ); 
    }
    else{
      this.getAll();
     
    }
  }

  Search(){
    //console.log(this.SearchText);
    console.log(this.userlist)
   this.originaluserlist = this.userlist;
   this.userlist =
   this.userlist.filter(
            a=> a.Name.toLocaleLowerCase().includes(this.SearchText.trim().toLocaleLowerCase()) 
       // || a.CreatedDate.includes(this.SearchText)  
        || a.Email.toLocaleLowerCase().includes(this.SearchText.trim().toLocaleLowerCase())

        ) 
    
  }
  ClearSearch(){
    this.SearchText="";
    this.userlist = this.originaluserlist;
  }

}
