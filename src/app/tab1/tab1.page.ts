import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ModalController,
  ItemReorderEventDetail,
  IonInput,
} from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalComponent } from '../components/modal/modal.component';
import { CardInfo } from '../utils/CardInfo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  @ViewChild('newHeaderInput') newHeaderInput?: IonInput;

  constructor(
    private _modalController: ModalController,
    private http: HttpClient
  ) {
    this.planFormGroup = new FormGroup({
      header: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      subheader: new FormControl('', Validators.required),
    });
  }

  planFormGroup: FormGroup;
  URL = 'http://localhost:3000';
  plans: any[] = [];
  modelData: any;
  adding = false;

  public ngOnInit(): void {
    this.http.get<any[]>(`${this.URL}/plans`).subscribe((resp) => {
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
  public showPlans() {
    this.adding = !this.adding;
    setTimeout(() => {
      if (this.newHeaderInput) {
        this.newHeaderInput.setFocus();
      }
    }, 50);
  }

  public deletePlan() {}

  public onSubmit(formData: any) {
    this.http.post<any[]>('http://localhost:3000/plans', formData);
    this.adding = !this.adding;
    this.planFormGroup.reset();
  }

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
        modelSubheader: data.subheader,
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
