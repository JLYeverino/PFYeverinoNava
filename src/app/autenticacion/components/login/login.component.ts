import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SesionService } from 'src/app/core/services/sesion.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup 

  constructor(
    private sesionService: SesionService,
    private router: Router
  ) { 
    this.formulario = new FormGroup({
      usuario: new FormControl('Madisyn.Huel75@gmail.com'),
      contrasena: new FormControl('RZHZgRl5vgjyNSQ'),
      admin: new FormControl(true)
    })
  }

  ngOnInit(): void {
  }
  login(){
    let u: Usuario = {
      id: 0,
      usuario: this.formulario.value.usuario,
      contrasena: this.formulario.value.contrasena,
      admin: this.formulario.value.admin
    }
    this.sesionService.login(u);
    // this.sesionService.login(u).subscribe((usuario: Usuario) => {
    //   console.log(usuario);
    // });
    //this.router.navigate(['inicio']);
  }
}
