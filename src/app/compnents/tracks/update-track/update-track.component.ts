import {AfterViewInit, Component, OnInit} from '@angular/core';
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
  isSuccess=false;
  isLoading=true;
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
          console.log(this.id);


        }
      );




  }



  private getTrack(trackId: any) {
    console.log(trackId);
    this.trackService.getById(trackId).subscribe(
      {
        next: (data: any) => {
          console.log(data);
          this.track =data;
          this.trackName=data.name;
        } });


  }

  updateTrack(){
    this.track.name=this.trackName;
    this.trackService.update(this.track.id,this.track).subscribe(
      {
        next: (data: any) => {
          this.isLoading=false;
          this.isSuccess=true;

        },
        error: (e) => { this.isLoading=false;this.isSuccess=false},
        // complete: () => console.info('complete')
      });

  }

  getIsSuccess(): boolean{
    return this.isSuccess;
  }


}
