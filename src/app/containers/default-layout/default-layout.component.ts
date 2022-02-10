import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { SharedService } from '../../common/-shared.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  userObj;
  user:string;
  constructor(private _SharedService: SharedService,private router: Router, private cookieService: CookieService ,){
    //console.log("navItems",this.navItems);
    this.userObj = this._SharedService.getCurrentUser();
    if(this.userObj.Role == 1 || this.userObj.Role == 2 || this.userObj.Role == 3 || this.userObj.Role == 4  ){
      this.navItems = navItems.filter(a=> a.name != 'Settings');
    }

    //console.log("currentUser",this._SharedService.getCurrentUser())
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  ngOnInit(){
    this.user= this._SharedService.getCurrentUser().Name;
  }
  logOut(){
    this.cookieService.removeAll();     

    this.router.navigateByUrl('/login');
  }
}
