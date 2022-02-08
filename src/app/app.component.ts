import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { UserService} from './user.service';
import { User } from './user';
   
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ],
    providers: [UserService]
})
export class AppComponent implements OnInit { 
   
    @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

    editedUser: User|null = null;
    users: Array<User>;
    isNewRecord: boolean;
    statusMessage: string;
     
    constructor(private http: UserService){
        this.users = new Array<User>();
    }
      
    ngOnInit(){
         
        this.loadUser()
    }

    private loadUser() {
        this.http.getUser().subscribe((data: any) => this.users=data["userList"]);
    }

    addUser() {
        this.editedUser = new User(0,"",0);
        this.users.push(this.editedUser);
        this.isNewRecord = true;
    }

    editUser(user: User) {
        this.editedUser = new User (user.id, user.name, user.age)
    }

    loadTemplate(user: User) {
        if (this.editedUser && this.editedUser.id === user.id) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
    }

    saveUser() {
        if (this.isNewRecord) {
            // добавляем пользователя
            this.http.createUser(this.editedUser as User).subscribe(data => {
                this.statusMessage = 'Данные успешно добавлены',
                this.loadUser();
            });
            this.isNewRecord = false;
            this.editedUser = null;
        } else {
            // изменяем пользователя
            this.http.updateUser(this.editedUser as User).subscribe(data => {
                this.statusMessage = 'Данные успешно обновлены',
                this.loadUser();
            });
            this.editedUser = null;
        }
    }

    cancel() {
        // если отмена при добавлении, удаляем последнюю запись
        if (this.isNewRecord) {
            this.users.pop();
            this.isNewRecord = false;
        }
        this.editedUser = null;
    }
    // удаление пользователя
    deleteUser(user: User) {
        this.http.deleteUser(user.id).subscribe(data => {
            this.statusMessage = 'Данные успешно удалены',
            this.loadUser();
        });
    }
}
