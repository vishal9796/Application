import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-candidate-info',
  templateUrl: './candidate-info.component.html',
  styles: [
  ]
})
export class CandidateInfoComponent implements OnInit {
  @Output() backPressed= new EventEmitter();
  isCollapsed:boolean=false;
  isInterviewCollapsed:boolean=false;
  isSupportCollapsed:boolean=false;
  constructor() { }

  ngOnInit(): void {
  } 
  goBack(){
    this.backPressed.emit(true);
  }
}
