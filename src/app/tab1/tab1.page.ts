import { Component, OnInit } from '@angular/core';
import { ModalController, ItemReorderEventDetail } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component';
import { CardInfo } from '../utils/CardInfo';
import { planList } from '../utils/planList';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  constructor(private _modalController: ModalController) {}

  plans: any[] = [];
  modelData: any;

  ngOnInit(): void {
    this.plans = planList;
  }

  addPlan() {}
  deletePlan() {}
  title() {
    console.log('Title');
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    ev.detail.complete();
  }

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
