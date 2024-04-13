import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController, ItemReorderEventDetail } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component';
import { CardInfo } from '../utils/CardInfo';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  constructor(
    private _modalController: ModalController,
    private http: HttpClient
  ) {}

  URL = 'http://localhost:3000';
  plans: any[] = [];
  modelData: any;

  public ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/plans').subscribe((resp) => {
      console.log(resp);
      this.plans = resp;
    });
  }

  // public addPlan(
  //   header: string,
  //   location: string,
  //   subheader: string,
  //   photo: string
  // ) {
  //   fetch(`${this.URL}/plans`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       header,
  //       location,
  //       subheader,
  //       photo,
  //     } as unknown as CardInfo),
  //   });
  // }
  public getPlan() {}

  public deletePlan() {}
  public title() {
    console.log('Title');
  }

  public handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
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
