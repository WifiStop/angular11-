import { MarkLineComponent } from './../editor-canvas/componentView/mark-line/mark-line.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomePageComponent} from './home-page.component'
import {ShareModule} from '../share/share.module'
import { Routes, RouterModule } from '@angular/router';
import {ToolbarComponent} from '../toolbar/toolbar.component'
import {ComponentListComponent} from '../component-list/component-list.component'
import {EditorCanvasComponent} from '../editor-canvas/editor-canvas.component';
import { ButtonViewComponent } from '../editor-canvas/componentView/button-view/button-view.component';
import { TextViewComponent } from '../editor-canvas/componentView/text-view/text-view.component';
import { ImgViewComponent } from '../editor-canvas/componentView/img-view/img-view.component'
import {AddComponentDirective} from '../editor-canvas/directive/addConpoment.direvctive'
import {RightClickViewComponent} from '../editor-canvas/componentView/right-click-view/right-click-view.component';
import { ChangeShapeComponent } from '../change-shape/change-shape.component'
import { PropertiesPanelModule } from '../properties-panel/properties-panel.module';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PreviewModule} from '../preview-canvas/preview.module'
const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }
];

@NgModule({
  declarations: [HomePageComponent,ToolbarComponent,ComponentListComponent,EditorCanvasComponent, ButtonViewComponent, TextViewComponent, ImgViewComponent,AddComponentDirective
  ,RightClickViewComponent, ChangeShapeComponent,MarkLineComponent],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes),
    PropertiesPanelModule,
    MatDialogModule,
    PreviewModule
  ],


})
export class HomePageModule { }
