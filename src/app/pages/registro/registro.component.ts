import { Component, OnInit } from '@angular/core';
import { UsuarioModel} from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.services';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;


  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {

    this.usuario= new UsuarioModel();


   }
onSubmit(form: NgForm)
{

  if(form.invalid){return;}
  Swal.fire({
    allowOutsideClick: false,
    icon: 'info',
    text: 'Espere por favor...'
    
  });
  Swal.showLoading();


  this.auth.nuevoUsuario(this.usuario)
    .subscribe( resp =>{

      console.log(resp);
      Swal.close();
      Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        text: 'Registro exitoso..'
      });           

      this.router.navigateByUrl('/login');
    }, (err) =>{
      console.log(err.error.error.message );
      Swal.fire({
        
        icon: 'error',
        title: 'Error al registrar datos',
        text: (err.error.error.message)
        
      });
    });

}

}
