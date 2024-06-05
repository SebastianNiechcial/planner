import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';

import { ModalComponent } from '../components/modal/modal.component';

@NgModule({ declarations: [Tab1Page, ModalComponent], imports: [IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Tab1PageRoutingModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class Tab1PageModule {}
