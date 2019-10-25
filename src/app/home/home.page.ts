import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';
import {UserCreditService} from '../servicios/user-credit.service'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  ngOnInit(): void {
    this.userEmail = this.service.getCurrentUser();
    this.userEmail = this.userEmail.split('@').shift();
    this.service.SumarCredito("2786f4877b9091dcad7f35751bfcf5d5ea712b2f");
  }
  
  zbarOptions:any;
  scannedResult:any = 0;
  userEmail: string;
 
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
 
  scanCode(){
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
      color:"dark",
      showCloseButton:true
    });
    toast.present();
  }

  async presentToast2() {
    const toast = await this.toastController.create({
      message: 'Error codigo QR ya escaneado',
      duration: 2000,
      color:"dark",
      showCloseButton:true
    });
    toast.present();
  }

  Borrar(){
    this.scannedResult = 0;
  }
}
