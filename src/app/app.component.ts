import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { WorkerService } from '../service/worker.service';
import { Worker } from '../type/worker';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WorkerService],
})
export class AppComponent implements OnInit {
  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  editedWorker: Worker | null = null;
  users: Array<Worker>;
  isNewRecord: boolean;
  statusMessage: string;

  constructor(private http: WorkerService) {
    this.users = new Array<Worker>();
  }

  ngOnInit() {
    this.loadWorker();
  }

  private loadWorker() {
    this.http.getWorker().subscribe((data: Array<Worker>) => this.users = data["workers"]);
  }

  addWorker() {
    this.editedWorker = new Worker(0, '', 0, 0);
    this.users.push(this.editedWorker);
    this.isNewRecord = true;
  }

  editWorker(worker: Worker) {
    this.editedWorker = new Worker(worker.id, worker.fio, worker.day, worker.month);
  }

  loadTemplate(worker: Worker) {
    if (this.editedWorker && this.editedWorker.id === worker.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  saveWorker() {
    if (this.isNewRecord) {
      // добавляем пользователя
      this.http.createWorker(this.editedWorker as Worker).subscribe((data) => {
        (this.statusMessage = 'Данные успешно добавлены'), this.loadWorker();
      });
      this.isNewRecord = false;
      this.editedWorker = null;
    } else {
      // изменяем пользователя
      this.http.updateWorker(this.editedWorker as Worker).subscribe((data) => {
        (this.statusMessage = 'Данные успешно обновлены'), this.loadWorker();
      });
      this.editedWorker = null;
    }
  }

  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.users.pop();
      this.isNewRecord = false;
    }
    this.editedWorker = null;
  }
  // удаление пользователя
  deleteWorker(worker: Worker) {
    this.http.deleteWorker(worker.id).subscribe((data) => {
      (this.statusMessage = 'Данные успешно удалeны'), this.loadWorker();
    });
  }
}
