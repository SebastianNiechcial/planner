import { Component, model } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component';

interface CardInfo {
  header: string;
  location: string;
  message: string;
  photo: string;
}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(private _modalController: ModalController) {}
  items = {
    header: 'podróż',
    location: 'Włochy',
    message: 'La Prima',
    photo: 'https://ionic-docs-demo-v7.vercel.app/assets/madison.jpg',
  };
  addPlan(Plan: CardInfo) {
    console.log(
      `location: ${Plan.location} message: ${Plan.message} photo: ${Plan.photo}`
    );
  }

  modelData: any;

  async openModal(data: CardInfo) {
    const modal = await this._modalController.create({
      component: ModalComponent,
      componentProps: {
        modelTitle: data.header,
        modelLocation: data.location,
        modelMessage: data.message,
        modelPhoto: data.photo,
      },
    });
    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        this.modelData = modelData.data;
        console.log('Modal Data : ' + modelData.data);
      }
    });
    return await modal.present();
  }
}
