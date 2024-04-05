import { Component } from '@angular/core';

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
  constructor() {}
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
}
