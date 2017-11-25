import { Component, OnInit, Input, ViewEncapsulation, ElementRef, AfterViewInit, Renderer2, ContentChild, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { JigsawStepConnectService } from './step-connect.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector     : 'jigsaw-step-item',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="jigsaw-steps-tail" #stepsTail *ngIf="_last !== true">
      <i></i>
    </div>
    <div class="jigsaw-steps-step">
      <div class="jigsaw-steps-head">
        <div class="jigsaw-steps-head-inner">
          <ng-template [ngIf]="!_processDot">
            <span class="jigsaw-steps-icon anticon anticon-check" *ngIf="_status === 'done' && !jigsawIcon"><a class="fa fa-check"></a></span>
            <span class="jigsaw-steps-icon anticon anticon-cross" *ngIf="_status === 'error'"><a class="fa fa-times"></a></span>
            <span class="jigsaw-steps-icon" *ngIf="(_status === 'processing') && !jigsawIcon"><a class="fa fa-fa-cog fa-1x fa-fw">{{index + 1}}</a></span>
            <span class="jigsaw-steps-icon" *ngIf="(_status === 'waiting') && !jigsawIcon"><a class="fa fa-fa-cog fa-1x fa-fw">{{index + 1}}</a></span>
            <span class="jigsaw-steps-icon" *ngIf="(_status === 'warning') && !jigsawIcon"><a class="fa fa-exclamation-triangle"></a></span>
            <span class="jigsaw-steps-icon" *ngIf="(_status === 'skipped') && !jigsawIcon"><a class="fa fa-ban"></a></span>
            <span class="jigsaw-steps-icon" *ngIf="jigsawIcon">
            <ng-template [ngTemplateOutlet]="jigsawIcon"></ng-template>
          </span>
          </ng-template>
          <ng-template [ngIf]="_processDot">
            <span class="jigsaw-steps-icon">
              <span class="jigsaw-steps-icon-dot"></span>
            </span>
          </ng-template>
        </div>
      </div>
      <div class="jigsaw-steps-main">
        <div class="jigsaw-steps-title">{{jigsawTitle}}</div>
        <div class="jigsaw-steps-description">{{jigsawDescription}}</div>
      </div>
    </div>
  `,
  styleUrls: ['./steps.scss']
})
export class JigsawStepComponent implements OnInit, AfterViewInit, OnDestroy {
  _status = 'waiting';
  _ifCustomStatus = false;
  _currentIndex;
  _el;
  _last = false;
  _processDot = false;
  _direction = 'horizontal';
  _processDotEventSubscription: Subscription;
  _directionEventSubscription: Subscription;
  _currentEventSubscription: Subscription;
  _errorIndexObjectSubscription: Subscription;
  index: number;
  stepStatusClass;
  @ContentChild('jigsawIcon') jigsawIcon: TemplateRef<any>;
  @ViewChild('stepsTail') _stepsTail: ElementRef;

  @Input()
  set status(status) {
    this._status = status;
    this._ifCustomStatus = true;
  }

  get status() {
    return this._status;
  }

  @Input() jigsawTitle: string;

  @Input() jigsawDescription: string;

  get _current() {
    return this._currentIndex;
  }

  set _current(current) {
    this._currentIndex = current;
    if (!this._ifCustomStatus) {
      if (current > this.index) {
        this._status = 'done';
      } else if (current === this.index) {
        if (this.jigsawStepConnectService.errorIndex) {
          this._status = 'error';
        } else {
          this._status = 'processing';
        }
      } else {
        this._status = 'waiting';
      }
    }
    this.initClassMap();
  };

  initClassMap() {
    this.stepStatusClass = {
      ['jigsaw-steps-item']          : true,
      [`jigsaw-steps-status-waiting`]   : this._status === 'waiting',
      [`jigsaw-steps-status-processing`]: this._status === 'processing',
      [`jigsaw-steps-status-done`] : this._status === 'done',
      [`jigsaw-steps-status-error`]  : this._status === 'error',
      [`jigsaw-steps-status-warning`]  : this._status === 'warning',
      [`jigsaw-steps-status-skipped`]  : this._status === 'skipped',
      ['jigsaw-steps-item-last']     : this._last,
      ['jigsaw-steps-custom']        : !!this.jigsawIcon,
      ['jigsaw-steps-next-error']    : (this.jigsawStepConnectService.errorIndex === 'error' && this._current === this.index - 1)
    };
    for (const i in this.stepStatusClass) {
      if (this.stepStatusClass[ i ]) {
        this._renderer.addClass(this._el, i);
      } else {
        this._renderer.removeClass(this._el, i);
      }
    }
  }

  init() {
    // 记录个数
    this.index = this.jigsawStepConnectService.itemIndex;
    this._processDot = this.jigsawStepConnectService.processDot;
    this._direction = this.jigsawStepConnectService.direction;
    this._current = this.jigsawStepConnectService.current;
    this._processDotEventSubscription = this.jigsawStepConnectService.processDotEvent.subscribe(data => {
      this._processDot = data;
    });
    this._directionEventSubscription = this.jigsawStepConnectService.directionEvent.subscribe(data => {
      this._direction = data;
    });
    this._currentEventSubscription = this.jigsawStepConnectService.currentEvent.subscribe(data => {
      this._current = data;
    });
    this._errorIndexObjectSubscription = this.jigsawStepConnectService.errorIndexObject.subscribe(data => {
      if (this._current === this.index) {
        this._status = data;
      }
    });
    this.initClassMap();
    this.jigsawStepConnectService.itemIndex += 1;
    /** judge if last step */
    if (!this.erf.nativeElement.nextElementSibling) {
      this._last = true;
    } else {
      this.jigsawStepConnectService.lastElementSizeEvent.subscribe(data => {
        const { count, width } = data;
        this._renderer.setStyle(this.erf.nativeElement, 'width', (100 / (count - 1)) + '%');
        this._renderer.setStyle(this.erf.nativeElement, 'margin-right', (-(width / (count - 1) + 5)) + 'px');
        if (this._direction === 'horizontal') {
          this._renderer.setStyle(this._stepsTail.nativeElement, 'padding-right', ((width / (count - 1) + 5)) + 'px');
        }
      });
    }
  }

  constructor(private erf: ElementRef,
              private jigsawStepConnectService: JigsawStepConnectService, private _renderer: Renderer2) {
    this._el = erf.nativeElement;
  }

  ngOnInit() {
    this.init();
  }

  ngAfterViewInit() {
    if (this._last) {
      setTimeout(_ => {
        this.jigsawStepConnectService.lastElementSizeEvent.next({
          count: this.erf.nativeElement.parentElement.childElementCount,
          width: this.erf.nativeElement.firstElementChild.offsetWidth
        });
      })
    }
  }

  ngOnDestroy() {
    if (this._processDotEventSubscription) {
      this._processDotEventSubscription.unsubscribe()
    }
    if (this._directionEventSubscription) {
      this._directionEventSubscription.unsubscribe()
    }
    if (this._currentEventSubscription) {
      this._currentEventSubscription.unsubscribe()
    }
    if (this._errorIndexObjectSubscription) {
      this._errorIndexObjectSubscription.unsubscribe()
    }
  }
}
