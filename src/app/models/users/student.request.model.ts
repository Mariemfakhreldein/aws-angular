import {StudentModel} from "./student.model";


export class StudentRequestModel {
students: StudentModel[];

  constructor(students: StudentModel[]){
      this.students = students;
    }
}
