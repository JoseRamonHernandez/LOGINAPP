import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from '../../services/auth.services';
import { Router } from '@angular/router';


import Swal from 'sweetalert2';
//import Swal from 'sweetalert2/dist/sweetalert2.js';

//const Swal = require('sweetalert2');
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:UsuarioModel = new UsuarioModel();
  recordarme =true;

  constructor(private auth: AuthService,
              private router: Router ) { }

  ngOnInit() {
  }

login( form:NgForm)
{
  if( form.invalid){return;}

Swal.fire({
  allowOutsideClick: false,
  icon: 'info',
  text: 'Espere por favor...'
  
});
Swal.showLoading();


  this.auth.login( this.usuario)
    .subscribe( resp =>{
      console.log(resp);
      Swal.close();
      this.router.navigateByUrl('/home');
    }, (err) =>{
     // const a="err.error.error.message";
      console.log(err.error.error.message);
      Swal.fire({
        
        icon: 'error',
        title: 'Error al autenticar',
        text: (err.error.error.message)
        
      });
    });

}


}
