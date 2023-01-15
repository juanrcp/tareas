import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { TareaModel } from './tarea.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  coleccion = 'tareas';

  constructor(

    private firebase: AngularFirestore) { }

  getAllTareas() : any {
    return this.firebase.collection(this.coleccion).snapshotChanges();
  }

  getTarea(id: string): Observable<any>{
    return this.firebase.collection(this.coleccion).doc(id).snapshotChanges();
  }

  updateTarea(id: string, tarea: any): any{
    return this.firebase.collection(this.coleccion).doc(id).update(tarea);
  }

  addTarea(tarea: any): any{
    return this.firebase.collection(this.coleccion).add(tarea);
  }

  delete(id: string): void{
    this.firebase.collection(this.coleccion).doc(id).delete();
  }
   
}
