import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  constructor(private _modalController: ModalController) {}

  async closeModel() {
    const close: string = 'Modal Removed';
    await this._modalController.dismiss(close);
  }
}
