import { Component, Input, OnInit } from '@angular/core';
import { TareaService } from '../shared/tarea.service';
import { TareaModel } from '../shared/tarea.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tarea-lista',
  templateUrl: './tarea-lista.component.html',
  styleUrls: ['./tarea-lista.component.css']
})

export class TareaListaComponent implements OnInit {
 
  tareas: TareaModel[] = [];
 
  constructor(
    private tareaService: TareaService,
    private ruta: ActivatedRoute
    ) { }
 
  ngOnInit() : void {

    this.tareaService.getAllTareas().subscribe(
      (resp: any) => {
        this.tareas = [];
        resp.forEach((tareaData: any) =>{
          console.log(tareaData);
          this.tareas.push({
            id: tareaData.payload.doc.id,
            ...tareaData.payload.doc.data()
          })
        });
      }
    )
  }

  borrar(id: string): void{

    this.tareaService.delete(id);
    alert("Tarea Borrada con Exito");
    console.log("Tarea Borrada con Exito");
  }

}
