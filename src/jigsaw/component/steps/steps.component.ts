import { Component, OnInit, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { JigsawStepConnectService } from './step-connect.service';
import { AbstractJigsawComponent } from "../common";

export type direction = 'horizontal' | 'vertical';

@Component({
  selector     : 'jigsaw-steps',
  encapsulation: ViewEncapsulation.None,
  providers    : [ JigsawStepConnectService ],
  template     : `
    <div class="jigsaw-steps" [ngClass]="_stepsClassMap">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls    : ['./steps.scss']
})
export class JigsawStepsComponent extends AbstractJigsawComponent implements OnInit, OnDestroy {
  _status: string;
  _stepsClassMap: Object;
  _direction: direction = 'horizontal';

  @Input()
  set direction(value: direction) {
    this._direction = value;
    this.stepConnectService.direction = value;
    this.stepConnectService.directionEvent.next(value);
  }

  get direction(): direction {
    return this._direction;
  }

  @Input() preSize: 'default' | 'small' | 'large';

  setDirectionClass() {
    this._stepsClassMap = {
      [`jigsaw-steps-${this.direction}`]      : true,
      [`jigsaw-steps-label-${this.direction}`]: true,
      ['jigsaw-steps-small']                    : this.preSize === 'small',
      ['jigsaw-steps-large']                    : this.preSize === 'large'
    };
  }

  constructor(private stepConnectService: JigsawStepConnectService) {
      super();
  }

  ngOnInit() {
    this.setDirectionClass();
    if (this._status) {
      this.stepConnectService.errorIndex = this._status;
      this.stepConnectService.errorIndexObject.next(this._status);
    }
  }

  ngOnDestroy() {
    this.stepConnectService.itemIndex = 0;
  }
}
