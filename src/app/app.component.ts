import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../services/user.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService],
  
})
export class AppComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'name', 'age'];

  constructor (private http: UserService) {} 


  ngOnInit(): void {
    this.loadUsers ();
  }

  private loadUsers() {
    this.http.getUser().subscribe((data: MatTableDataSource<any>)=> this.dataSource = data ["Users"])
  }

}  
