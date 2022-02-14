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
    return this.http.post<Worker>('http://localhost:8081/worker/create',JSON.stringify(worker), {headers: myHeaders});
  }

  updateWorker(worker: Worker) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Worker>('http://localhost:8081/worker/update',JSON.stringify(worker), {headers:myHeaders});
  }

  deleteWorker(id: number){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id,
      },
    };
    return this.http.delete('http://localhost:8081/worker/delete', options);
  }

}
