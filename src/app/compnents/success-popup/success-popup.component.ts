import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.css']
})
export class SuccessPopupComponent implements OnInit {

  @Input()
  item:string;

  isSuccess;

  constructor() { }

  ngOnInit(): void {
  }



}
