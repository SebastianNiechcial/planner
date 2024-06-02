import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ModalController,
  ItemReorderEventDetail,
} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CardInfo } from '../utils/CardInfo';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  constructor(
    private _http: HttpClient,
    private _fb: FormBuilder
  ) {
    this.planFormGroup = this._fb.group({
      id: [''],
      header: ['', Validators.required],
      location: ['', Validators.required],
      subheader: ['', Validators.required],
      photo: [this.pictureUrl],
    });
  }
  pictureUrl = "https://picsum.photos/400/300"
  planFormGroup: FormGroup;
  URL = 'http://localhost:3000';
  plans: CardInfo[] = [];
  isDeleting = false;

  public ngOnInit(): void {
    this.getPlans();
  }

  private generateUUID() {
    crypto.randomUUID()
  }

  public toggleDelete() {
    this.isDeleting = !this.isDeleting;
  }

  public deletePlan(planId: any) {
    this._http.delete(`${this.URL}/plans/${planId}`).subscribe({
      next: (response) => {
        console.log('deleting:' + response);
      },
      error: (response) => {
        console.log('delete error:' + JSON.stringify(response));
      },
    });
    this.getPlans()
  }

  public onSubmit() {
    let id = this.generateUUID()
    this.planFormGroup.value.id = id
    this._http
      .post<CardInfo>('http://localhost:3000/plans', this.planFormGroup.value)
      .subscribe({
        next: (response) => {
          console.log('sended:' + JSON.stringify(response));
        },
        error: (response) => {
          console.log('add error:' + response);
        },
      });
    this.planFormGroup.reset();
    this.planFormGroup.get('photo')?.setValue(this.pictureUrl)
    setTimeout(() => this.getPlans(), 1000)

  }

  public getPlans() {
    this._http.get<any[]>(`${this.URL}/plans`).subscribe((resp) => {
      this.plans = resp;
    });
  }

  public handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    ev.detail.complete();
  }
}
