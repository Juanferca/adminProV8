import { Component, OnInit, Input } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';

import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';




@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  hospital: any;
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor(public _hospitalService: HospitalService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospital()
    this._modalUploadService.notificacion.subscribe(() => this.cargarHospital())
  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'hospitales', id);
}

  cargarHospital() {
    this._hospitalService.cargarHospitales()
      .subscribe( hospitales => {
        this.hospitales = hospitales;
         this.cargando = false;
      })
  }

  buscarHospital( termino: string ) {
    if(termino.length <=0 ) {
      this.cargarHospital();
      return;
    }
    this.cargando = true;

    this._hospitalService.buscarHospital(termino)
      .subscribe( (hospital: Hospital[]) => {
        this.hospitales = hospital;
        this.cargando = false;
      })
  }

  crearHospital() {
     Swal.fire({
         title: 'Introduzca hospital',
         input: 'text'
    }).then(inputHospital =>  {
      if(!inputHospital || inputHospital == '') {
        return;
      }
      this._hospitalService.crearHospital(inputHospital.value)
        .subscribe(e => {
          if(e) {
            Swal.fire('Hospital Creado Correctamente', inputHospital.value, 'success');
          }
          this.cargarHospital(); 
       })
     }).catch(e=> console.log(e))
  }


  borrarHospital( hospital: Hospital ) {
    this._hospitalService.borrarHospital(hospital._id)
        .subscribe(() => this.cargarHospital());
  } 

  cambiarDesde( desde) {
    console.log(desde)
  }

  guardarHospital(hospital: Hospital) {
 
    Swal.fire({
      title: 'Introduzca hospital',
      input: 'text'
 }).then(inputHospital =>  {
   console.log(inputHospital.value, hospital)
  this._hospitalService.actualizarHospital(inputHospital.value, hospital)
     .subscribe(e => {
       if(e) {
         Swal.fire('Hospital actualizado Correctamente', inputHospital.value, 'success');
       }
       this.cargarHospital(); 
    })
    
  })
  }

 
}
