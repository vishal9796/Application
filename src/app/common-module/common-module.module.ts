import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorInterceptor } from '../common/http-interceptor.interceptor';
import { SharedService } from '../common/-shared.service';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER } from 'ngx-ui-loader';
import { ModalModule } from 'ngx-bootstrap/modal';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "red",
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.threeStrings, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ModalModule.forRoot()
    
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor, multi: true },
    SharedService,
    DatePipe

  ],
  exports:[
    NgxUiLoaderModule,
    DatePipe,
    ModalModule
  ]  
})
export class CommonModuleModule { }
