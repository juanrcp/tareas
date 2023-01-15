import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TareaModel, TareaEstadosSelect } from '../shared/tarea.model';
import { TareaService } from '../shared/tarea.service';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-tarea',
  templateUrl: './edit-tarea.component.html',
  styleUrls: ['./edit-tarea.component.css']
})
export class EditTareaComponent implements OnInit {

  tarea?: TareaModel;
  //Array donde guardaremos los estamos
  tareaEstadosSelect: string[] = [];
  nuevaTarea: boolean = false;
 
  perfileForm = this.fb.group({
    titulo: [''],
    fecha: [''],
    estado: ['']
  });

  constructor(
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private tareaService: TareaService,
    private location: Location

  ) { }

  ngOnInit() {
  
    //Rellenamos la array con los posubles estados 
    this.tareaEstadosSelect = TareaEstadosSelect;

    if(this.route.snapshot.paramMap.get('id')){

      this.nuevaTarea = false;
      let id = String(this.route.snapshot.paramMap.get('id'));
      console.log(id);

      this.tareaService.getTarea(id).subscribe((resp: any) => {
        console.log(resp.payload.data());
        this.perfileForm.setValue({...resp.payload.data()});
      });

    }else{
      this.nuevaTarea = true;
      console.log(this.perfileForm.value);
    }
  }

  guardar(): void {

    if(this.nuevaTarea){
      this.tareaService.addTarea(this.perfileForm.value).then(
        () => {
          alert("Nueva Tarea Creada.");
          console.log("Tarea Modificada");
        }, (error: any) => {
          console.log(error);
        }
      );

    }else{

      let id = String(this.route.snapshot.paramMap.get('id'));
      console.warn(this.perfileForm.value);

      this.tareaService.updateTarea(id, this.perfileForm.value).then(
        () => {
          alert("Tarea Modificada");
          console.log("Tarea Modificada");
        }, (error: any) => {
          console.log(error);
        }
      )
    }
  }

  volver(): void {
    this.location.back();
  }

}
