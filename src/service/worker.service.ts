import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Worker } from '../type/worker';

@Injectable()
export class WorkerService {

  constructor(private http: HttpClient) { }

  getWorker () {
    return this.http.get('http://localhost:8081/worker/get')
  }

  createWorker(worker: Worker){
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Worker>(JSON.stringify(worker), {headers: myHeaders});
  }

  updateWorker(worker: Worker) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Worker>(JSON.stringify(worker), {headers:myHeaders});
  }

  deleteWorker(id: number){
    return this.http.delete<Worker>('/' + id);
  }

}
