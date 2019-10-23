import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  email:string;
  password:string;
  constructor(private authService:AuthService, private publicRouter:Router) { }


  ngOnInit() {
  }
  OnSubmitLogIn(){
    this.authService.logIn(this.email, this.password).then(res => {
      console.log(res['user']['uid']);
      this.publicRouter.navigate(['/home']);
    }).catch(err => alert('Reingresar Datos'));
  }
  Rellenar(usr, password){
    this.email=usr+"@"+usr+".com";
    this.password = password;
  }
}
