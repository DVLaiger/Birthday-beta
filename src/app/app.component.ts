import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from '../assets/users.json';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'name', 'age'];

  constructor() {}


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = Users
  }

}  
