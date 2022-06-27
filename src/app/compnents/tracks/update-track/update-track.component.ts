import {AfterViewInit, Component, OnInit, Output} from '@angular/core';
import {Track} from "../../../models/instances/track.model";
import {ActivatedRoute} from "@angular/router";
import {TrackService} from "../../../services/track.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-update-track',
  templateUrl: './update-track.component.html',
  styleUrls: ['./update-track.component.css']
})
export class UpdateTrackComponent implements OnInit {



  myGroup: FormGroup = new FormGroup({});
  track:Track=new Track();
  private id: any;
  @Output() isSuccess=false;
  isLoading:boolean=true;
  currentItem='track';
  action='updated';
  trackName:any=true;
  constructor(private formBuilder: FormBuilder,private _activatedRoute:ActivatedRoute,private trackService: TrackService ) { }

  ngOnInit(): void {


    this.myGroup=this.formBuilder.group({
      trackName:[this.trackName ,[Validators.required]],
    });



    this._activatedRoute.paramMap
      .subscribe(
        parms=>{
          this.id=parms.get('id');
          this.getTrack(this.id);
        }
      );




  }



  private getTrack(trackId: any) {
    this.trackService.getById(trackId).subscribe(
      {
        next: (data: any) => {
          this.track =data;
          this.trackName=data.name;
        } });


  }

  updateTrack(){
    this.track.name=this.trackName;
    this.trackService.update(this.track.id,this.track).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.isSuccess = true;
      }, (error: any) => {
        this.isLoading = false;
        this.isSuccess = false;
      }
      );

  }

  public getIsSuccess(): boolean{
    return this.isSuccess;
  }


}
