import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-failed-popup',
  templateUrl: './failed-popup.component.html',
  styleUrls: ['./failed-popup.component.css']
})
export class FailedPopupComponent implements OnInit {

  @Input()
  item:string;

  constructor() { }

  ngOnInit(): void {
  }

}
