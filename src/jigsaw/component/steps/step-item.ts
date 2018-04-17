
import {
    AfterContentInit, ChangeDetectorRef, Component, ContentChildren, forwardRef, Input, NgModule,
    QueryList,OnInit
} from "@angular/core";
import {AbstractJigsawComponent} from "../common";


@Component({
    selector: 'jigsaw-step-item,j-step-item',
    templateUrl: 'step-item.html',
    host: {
        '[class.jigsaw-step-item]': 'true',

    }
})
export class JigsawStepItem extends AbstractJigsawComponent implements OnInit {

  private _status:"waiting"| "done"|"error"|"warning"|"skipped"|"processing"="waiting";
  @Input()
  public get status():"waiting"| "done"|"error"|"warning"|"skipped"|"processing"{
    return this._status;
  }
  public set status(value:"waiting"| "done"|"error"|"warning"|"skipped"|"processing"){
    if(!value) return;
    this._status=value;
    if(this.initialized){
        this._setstepStatusClass()
    }

  }

  @Input() public waitingIcon:string='fa-file-text-o';
  @Input() public doneIcon:string='fa-check-square-o';
  @Input() public processingIcon:string='fa-cog fa-spin fa-3x fa-fw';
  @Input() public errorIcon:string='fa-times';
  @Input() public skippedIcon:string='fa-ban';
  @Input() public warningIcon:string='fa-exclamation-triangle';

  private stepStatusClass:string;
  private stepStatusIconClass:string;
  private _setstepStatusClass(){
       this.stepStatusClass='jigsaw-step-item-'+this._status;
       switch(this._status){
         case "waiting":
            this.stepStatusIconClass=this.waitingIcon;
            break;
         case "done":
             this.stepStatusIconClass=this.doneIcon;
             break;
         case "processing":
            this.stepStatusIconClass=this.processingIcon;
            break;
         case "error":
           this.stepStatusIconClass=this.errorIcon;
           break;
         case "skipped":
            this.stepStatusIconClass=this.skippedIcon;
            break;
         case "warning":
             this.stepStatusIconClass=this.warningIcon;
             break;
        default:
          this.stepStatusIconClass=this.waitingIcon;
          break;
       }

  }



  ngOnInit(){
    super.ngOnInit();
    this._setstepStatusClass();
  }
}
