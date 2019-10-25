import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

export interface Credito {
  docId: string;
  usuario: string;
  creditos: string;
  codigos: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class UserCreditService {

  codes = [
    { code: "8c95def646b6127282ed50454b73240300dccabc", value: 10 },
    { code: "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172", value: 50 },
    { code: "2786f4877b9091dcad7f35751bfcf5d5ea712b2f", value: 100 }
  ];

  constructor(
    private MiAuth: AngularFireAuth,
    private firestore: AngularFirestore) { }

  public getCurrentUser() {
    return this.MiAuth.auth.currentUser.email;
  }

  /** Conecta con Firebase para editar los votos de la foto y los usuarios que votaron */
  public async SumarCredito(codigo: string) {

    var codigoRecibido = this.codes.find(function (x) {
      return x.code == codigo;
    });

    if (!codigoRecibido) {
      //alert! 
      return;
    }

    const user = this.MiAuth.auth.currentUser.email;

    await this.firestore.collection('creditos').ref.get().then(async (documento) => {
      var creditosDb = documento.docs.map(function (x) {
        var rv = x.data() as Credito;
        rv.docId = x.id;
        return rv;
      });

      //sumo creditos y hago un push del codigo param si es que NADIE lo tiene
      var existe = creditosDb.some(function (x) {
        return x.codigos.some(function(code){
          return code == codigo;
        });
      });

      if (!existe) {
        var creditosDelUsuario = creditosDb.find(function (x) {
          return x.usuario == user;
        });

       
        if (creditosDelUsuario) {
          creditosDelUsuario.creditos += codigoRecibido.value;
          creditosDelUsuario.codigos.push(codigo);

          this.firestore.collection('creditos').doc(creditosDelUsuario.docId).set({
            creditos: creditosDelUsuario.creditos,
            codigos: creditosDelUsuario.codigos,
            usuario: user
          }).then(async () => {
            //OK!!!!
          }).catch(err => {
            console.log('Error', err);
          });
        }
        else {
          var auxCodigos: Array<string> = new Array<string>(codigo);
          this.firestore.collection('creditos').add({
            usuario: user,
            creditos: codigoRecibido.value,
            codigos: auxCodigos
          }).then(ref => {
            //OK!
          }).catch(err => {
            console.log('Error al añadir en fotos', err);
          });
        }
      }
      else {
        //alert YA ESTA EN USO!
      }

    });
  }
}
