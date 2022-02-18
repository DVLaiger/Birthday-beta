import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../services/user.service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService],
})
export class AppComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'name', 'age'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  

  constructor(private http: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers() {
    this.http.getUser().subscribe((data: MatTableDataSource<any>) => (this.dataSource = data['Users']));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
