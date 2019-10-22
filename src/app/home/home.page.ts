import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  zbarOptions:any;
  scannedResult:any = 0;
 
  constructor(
    private zbar: ZBar,
    public toastController: ToastController
  ) {
 
    this.zbarOptions = {
      flash: 'off',
      drawSight: false
    }
 
  }
 
  scanCode(){
    this.zbar.scan(this.zbarOptions)
   .then(result => {
      let diez = this.scannedResult == 10;
      let cincuenta = this.scannedResult == 50;
      let sesenta = this.scannedResult == 60;
      let cien = this.scannedResult == 100;
      let cientocincuenta = this.scannedResult == 150;
      let cientosesenta = this.scannedResult == 160;
      if(result=='2786f4877b9091dcad7f35751bfcf5d5ea712b2f'){
        if(!cien && !cientocincuenta && !cientosesenta){
          this.scannedResult+=100;
          return
        }
        this.presentToast2()
      }
      let ex:string = result;
      if(ex.includes('e4bcffaf9ce5b409f')){
        if(!cincuenta && !sesenta && !cientocincuenta && !cientosesenta){
          this.scannedResult+=50;
          return
        }
        this.presentToast2()
      }

      if(result=='8c95def646b6127282ed50454b73240300dccabc'){
        if(!diez && !sesenta && ! cientosesenta){
          this.scannedResult+=10;
          return
        }
        this.presentToast2()
      }
      this.presentToast()
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
