import { Component, OnInit} from '@angular/core';
import { HttpService} from './http.service';
import { User } from './user';
   
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ],
    providers: [HttpService]
})
export class AppComponent implements OnInit { 
   
    users: User[]=[];
     
    constructor(private httpService: HttpService){}
      
    ngOnInit(){
          
        this.httpService.getData().subscribe((data: any) => this.users=data["userList"]);
    }
}
