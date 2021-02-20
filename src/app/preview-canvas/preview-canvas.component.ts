import { Component, OnInit,Optional,Inject } from '@angular/core';
import { share } from '../share/interface/share.interface';
import { CommunicationService } from '../share/service/communication.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-preview-canvas',
  templateUrl: './preview-canvas.component.html',
  styleUrls: ['./preview-canvas.component.scss']
})
export class PreviewCanvasComponent implements OnInit {
  canvasSize: share.size = this._communicationService.canvasSize
  public get componentDataList(): share.componentList[] {
    return this._communicationService.getComponentDataList()
  }
  constructor(
    private _communicationService:CommunicationService,
    @Optional() public dialogRef: MatDialogRef<any>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dalogData: any
  ) { }

  ngOnInit(): void {
  }

}
