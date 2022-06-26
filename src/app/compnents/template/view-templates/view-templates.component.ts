import { Component, OnInit } from '@angular/core';
import {TemplateService} from "../../../services/template.service";
import {TemplateResponseModel} from "../../../models/templates/templateResponse.model";



@Component({
  selector: 'app-view-templates',
  templateUrl: './view-templates.component.html',
  styleUrls: ['./view-templates.component.css']
})
export class ViewTemplatesComponent implements OnInit {

  templates: TemplateResponseModel[] = [];
  searchValue: any;
  page: number=1;
  constructor(private templateService: TemplateService) { }

  ngOnInit(): void {
    this.getAllTemplates();
  }

  private getAllTemplates(){
    this.templateService.getAllTemplates().subscribe(
      (response:any)=>{
        console.log(response.templateResponseList)
        this.templates = response.templateResponseList;
      },(error:any)=>{
        console.log(error);
      }
    )
  }

}
