import { ChangeSizeDirective } from './directive/chang-size.directive';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import {DragDropModule} from '@angular/cdk/drag-drop'
import { FormsModule } from '@angular/forms';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [ChangeSizeDirective,],
  imports:[FormsModule,NzTabsModule,CommonModule,NzSelectModule],
  exports:[NzButtonModule,NzInputModule,DragDropModule,ChangeSizeDirective,FormsModule,NzTabsModule,CommonModule,NzSelectModule]
})
export class ShareModule { }
