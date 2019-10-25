import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';
import { UserCreditService } from '../servicios/user-credit.service'
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  ngOnInit(): void {
    this.userEmail = this.service.getCurrentUser();
    this.userName = this.userEmail.split('@').shift();
    this.getUserCredit(this.userEmail);
  }

  zbarOptions: any;
  userEmail: string;
  userName: string;
  userCredits: string;

  constructor(
    private zbar: ZBar,
    public toastController: ToastController,
    private service: UserCreditService
  ) {

    this.zbarOptions = {
      flash: 'off',
      drawSight: false
    }

  }

  getUserCredit(userEmail){
    this.service.getCredits().subscribe(async (credits) => {
      this.userCredits = credits.find(function (x) { return x.usuario == userEmail; }).creditos;
    });
  }

  scanCode() {
    this.zbar.scan(this.zbarOptions)
      .then(result => {
        this.service.SumarCredito(result);
      })
      .catch(error => {
        this.presentToast()
        alert(error); // Error message
      });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Error codigo QR invalido',
      duration: 2000,
      color: "dark",
      showCloseButton: true
    });
    toast.present();
  }

  async presentToast2() {
    const toast = await this.toastController.create({
      message: 'Error codigo QR ya escaneado',
      duration: 2000,
      color: "dark",
      showCloseButton: true
    });
    toast.present();
  }

  Borrar() {
    this.service.BorrarCredito();
  }
}
