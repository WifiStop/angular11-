import { PreviewCanvasComponent } from './preview-canvas.component';
import { PreviewTextViewComponent } from './preview-componentView/preview-text-view/preview-text-view.component';
import { PreviewImgViewComponent } from './preview-componentView/preview-img-view/preview-img-view.component';
import { PreviewButtonViewComponent } from './preview-componentView/preview-button-view/preview-button-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';


@NgModule({
  declarations: [PreviewCanvasComponent,PreviewTextViewComponent,PreviewImgViewComponent,PreviewButtonViewComponent],
  imports: [
    CommonModule,
    ShareModule
  ]
})
export class PreviewModule { }
