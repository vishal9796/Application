import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { registeruser } from '../Models/registeruser';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  currentuser = new registeruser();
  constructor(
    private cookieService: CookieService
  ) {

  }

  getCurrentUser() {
    this.currentuser = JSON.parse(this.cookieService.get('userobject'));
    return this.currentuser;
  }

  getDate() {
    var date = new Date();     
    return date.getDate().toLocaleString();
  }
  getDay() {
    var Wday: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = new Date();
    var TodayDay = Wday[day.getDay()];
   return TodayDay;
  }
}
