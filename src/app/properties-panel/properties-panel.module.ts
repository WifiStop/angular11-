import { ShareModule } from './../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesPanelComponent } from './properties-panel.component';
import { AttributesComponent } from './attributes/attributes.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { AnimationComponent } from './animation/animation.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTagModule } from 'ng-zorro-antd/tag';



@NgModule({
  declarations: [PropertiesPanelComponent, AttributesComponent, AnimationComponent],
  imports: [
    CommonModule,
    ShareModule,
    ColorPickerModule,
    NzDrawerModule,
    NzTagModule,
  ],
  exports:[PropertiesPanelComponent]
})
export class PropertiesPanelModule { }
