import {
    Component,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    QueryList,
    Renderer2,
    ContentChildren
} from "@angular/core";
import {
    ButtonInfo,
    IPopupable,
    PopupEffect,
    PopupInfo,
    PopupOptions,
    PopupPositionType,
    PopupService
} from "../../common/service/popup.service";
import {AbstractJigsawComponent, AbstractJigsawViewBase} from "../../common/common";
import {JigsawGraph} from "./graph";
import {CommonUtils} from "../../common/core/utils/common-utils";
import * as FileSaver from 'file-saver';
import * as JSZip from 'jszip/dist/jszip.min';

declare const echarts: any;

@Directive({
    selector: '[j-graph-download], [jigsaw-graph-download], [jigsawGraphDownload]'
})
export class JigsawGraphDownloadDirective extends AbstractJigsawViewBase implements OnDestroy {
    constructor(private _renderer: Renderer2,
                private _elementRef: ElementRef,
                private _popupService: PopupService) {
        super();
    }

    private _removeMouseOverHandler: Function;
    private _removeMouseOutHandler: Function;
    private _rollOutDenouncesTimer: any = null;
    private _rollInDenouncesTimer: any = null;

    @HostListener('mouseenter', ['$event'])
    onMouseEnter() {
        this.clearCallLater(this._rollOutDenouncesTimer);
        this._addRollInDenouncesTimer();
    }

    @HostListener('mouseleave', ['$event'])
    onMouseLeave() {
        this.clearCallLater(this._rollInDenouncesTimer);
        this._addRollOutDenouncesTimer();
    }

    private _popupInfo: PopupInfo;

    private _getNonModelOptions(): PopupOptions {
        return {
            modal: false,
            showEffect: PopupEffect.fadeIn,
            hideEffect: PopupEffect.fadeOut,
            pos: this._elementRef,
            posOffset: {
                left: this._elementRef.nativeElement.offsetWidth - 10
            },
            posType: PopupPositionType.absolute,
            size: {width: 15},
        };
    }

    @Input()
    public jigsawGraphDownloadExportFileName: string = "graphs.zip";

    @Input()
    public jigsawGraphDownloadTooltip: string = '';

    private _closePopup() {
        if (this._popupInfo) {
            this._popupInfo.dispose();
            this._popupInfo = null;
        }
        this._closeAllListener();
    }

    private _closeAllListener() {
        if (this._removeMouseOverHandler) {
            this._removeMouseOverHandler();
            this._removeMouseOverHandler = null;
        }
        if (this._removeMouseOutHandler) {
            this._removeMouseOutHandler();
            this._removeMouseOutHandler = null;
        }
    }

    private _addRollInDenouncesTimer() {
        this._rollInDenouncesTimer = this.callLater(() => {
            if (this._popupInfo) {
                return;
            }
            this._popupInfo = this._popupService.popup(JigsawGraphDownloadButton, this._getNonModelOptions(), {
                jigsawGraphDownloadExportFileName: this.jigsawGraphDownloadExportFileName,
                jigsawGraphDownloadTooltip: this.jigsawGraphDownloadTooltip,
                dom:this._elementRef
            });

            if (!this._popupInfo || !this._popupInfo.element || !this._popupInfo.instance) {
                console.error('unable to popup drop down, unknown error!');
                return;
            }

            this._closeAllListener();
            this._removeMouseOverHandler = this._renderer.listen(
                this._popupInfo.element, 'mouseenter',
                () => this.clearCallLater(this._rollOutDenouncesTimer));
            this._removeMouseOutHandler = this._renderer.listen(
                this._popupInfo.element, 'mouseleave', () => {
                    this._addRollOutDenouncesTimer();
                });
        }, 100);
    }

    private _addRollOutDenouncesTimer() {
        this._rollOutDenouncesTimer = this.callLater(() => {
            this._closePopup();
        }, 400);
    }


    ngOnDestroy() {
        super.ngOnDestroy();
        this._closePopup();
    }
}

@Component({
    selector: 'jigsaw-graph-download-button, j-upload-download-button',
    template: `
        <div style="width: 15px;height: 10px"
             style="background: #41addc;color: #ffffff;text-align: center;cursor: pointer"
             (click)="_$download()"
             [title]="initData.jigsawGraphDownloadTooltip">
            <span class="fa fa-download"></span>
        </div>
    `
})
export class JigsawGraphDownloadButton extends AbstractJigsawComponent implements IPopupable {
    public answer: EventEmitter<ButtonInfo>;
    @Input()
    public initData: any;

    [index: string]: any;

    private _graphsInDom :any[]= [];

    private _getGraphs(){
        this._getChildren(this.initData.dom.nativeElement);
    }

    private _getChildren(element: any) {
        if (element.localName == 'jigsaw-graph') {
            this._graphsInDom.push(echarts.getInstanceByDom(element.children[1]));
            return;
        }
        if (element.children && element.children.length > 0) {
            for (let i = 0; i < element.children.length; i++) {
                this._getChildren(element.children[i]);
            }
        }
    }

    private _getGraphBase64Codes() {
        let codes = [];
        this._getGraphs();
        this._graphsInDom.forEach((graph, index) => {
            if (!graph) {
                return;
            }
            let option = graph.getOption();
            if(!option){
                return;
            }
            let animation = option.animation;
            graph.setOption({
                animation: false
            });
            let graphTitle = !!option.title && !!option.title[0] && !!option.title[0].text ? `-${option.title[0].text}` : '';
            const chartData = graph.getDataURL();
            if (chartData) {
                codes.push({
                    base64: chartData.replace(/.*?\bbase64,\s*/, ''),
                    title: `chart-${index + 1}${graphTitle}`
                });
            }
            if (CommonUtils.isUndefined(animation)) {
                animation = true;
            }
            graph.setOption({
                animation: animation
            });
        });
        return codes;
    }

    public _$download() {
        let zip = new JSZip();
        const base64Codes = this._getGraphBase64Codes();
        base64Codes.forEach(base64Code => {
            zip.file(`${base64Code.title}.png`, base64Code.base64, {base64: true});
        });
        const jigsawGraphDownloadExportFileName = !!this.initData.jigsawGraphDownloadExportFileName.match(/(.+)\.(.+)/g) ?
            this.initData.jigsawGraphDownloadExportFileName : `${this.initData.jigsawGraphDownloadExportFileName}.zip`;
        zip.generateAsync({type: "blob"}).then(content => {
            FileSaver.saveAs(content, `${jigsawGraphDownloadExportFileName}`);
        });
    }
}

