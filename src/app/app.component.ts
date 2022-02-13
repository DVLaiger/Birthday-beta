import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import { Worker } from './workers';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService],
})
export class AppComponent implements OnInit {
  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  editedUser: Worker | null = null;
  users: Array<Worker>;
  isNewRecord: boolean;
  statusMessage: string;

  constructor(private http: UserService) {
    this.users = new Array<Worker>();
  }

  ngOnInit() {
    this.loadUser();
  }

  private loadUser() {
    this.http.getUser().subscribe((data: Array<Worker>) => this.users = data["workers"]);
  }

  addUser() {
    this.editedUser = new Worker(0, '', 0, 0);
    this.users.push(this.editedUser);
    this.isNewRecord = true;
  }

  editUser(user: Worker) {
    this.editedUser = new Worker(user.id, user.fio, user.day, user.month);
  }

  loadTemplate(user: Worker) {
    if (this.editedUser && this.editedUser.id === user.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  saveUser() {
    if (this.isNewRecord) {
      // добавляем пользователя
      this.http.createUser(this.editedUser as Worker).subscribe((data) => {
        (this.statusMessage = 'Данные успешно добавлены'), this.loadUser();
      });
      this.isNewRecord = false;
      this.editedUser = null;
    } else {
      // изменяем пользователя
      this.http.updateUser(this.editedUser as Worker).subscribe((data) => {
        (this.statusMessage = 'Данные успешно обновлены'), this.loadUser();
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
  deleteUser(user: Worker) {
    this.http.deleteUser(user.id).subscribe((data) => {
      (this.statusMessage = 'Данные успешно удалeны'), this.loadUser();
    });
  }
}
