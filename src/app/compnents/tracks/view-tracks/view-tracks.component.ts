import { Component, OnInit } from '@angular/core';
import {Track} from "../../../models/instances/track.model";
import {TrackService} from "../../../services/track.service";

@Component({
  selector: 'app-view-tracks',
  templateUrl: './view-tracks.component.html',
  styleUrls: ['./view-tracks.component.css']
})
export class ViewTracksComponent implements OnInit {
  tracks: Track[]=[];
  page=1;

  constructor(private trackService:TrackService) { }

  ngOnInit(): void {

    this.getAllTracks();
  }

  getAllTracks(){
    this.trackService.getAllTracks().subscribe(
      {
        next: (data: any) => {
          data.trackResponsesList.forEach(e => {
              this.tracks.push(e);

            }
          )
        },
        error: (e) => {},
        // complete: () => console.info('complete')
      });

  }





  delete(trackId: any) {

    this.trackService.deleteTrack(trackId).subscribe(
      {
        next: (data: any) => {

        },
        error: (e) => {},
        // complete: () => console.info('complete')
      });

  }


}
