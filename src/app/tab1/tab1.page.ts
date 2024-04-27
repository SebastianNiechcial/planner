import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ModalController,
  ItemReorderEventDetail,
  IonInput,
} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalComponent } from '../components/modal/modal.component';
import { CardInfo } from '../utils/CardInfo';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  @ViewChild('newHeaderInput') newHeaderInput?: IonInput;

  constructor(
    private _modalController: ModalController,
    private _http: HttpClient,
    private _fb: FormBuilder
  ) {
    this.planFormGroup = this._fb.group({
      id: [''],
      header: ['', Validators.required],
      location: ['', Validators.required],
      subheader: ['', Validators.required],
      photo: [''],
    });
  }

  planFormGroup: FormGroup;
  URL = 'http://localhost:3000';
  plans: CardInfo[] = [];
  modelData: any;
  adding = false;
  data = '';
  isDeleting = false;

  public ngOnInit(): void {
    this.getPlans();
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
  public toggleDelete() {
    this.isDeleting = !this.isDeleting;
    console.log(this.isDeleting);
  }

  public deletePlan(planId: any) {
    this._http.delete(`${this.URL}/plans/${planId}`).subscribe({
      next: (response) => {
        console.log('deleting:' + response);
      },
      error: (response) => {
        console.log('delete error:' + response);
      },
    });
    this.getPlans()
  }

  public onSubmit() {
    this._http
      .post<CardInfo>('http://localhost:3000/plans', this.planFormGroup.value)
      .subscribe({
        next: (response) => {
          console.log('sended:' + response);
        },
        error: (response) => {
          console.log('add error:' + response);
        },
      });
    this.adding = !this.adding;
    this.planFormGroup.reset();
  }

  public getPlans() {
    this._http.get<any[]>(`${this.URL}/plans`).subscribe((resp) => {
      console.log(resp);
      this.plans = resp;
    });
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
