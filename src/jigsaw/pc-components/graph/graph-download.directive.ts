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
        if (!this._graphs || this._graphs.length < 1) {
            return;
        }
        this.clearCallLater(this._rollOutDenouncesTimer);
        this._addRollInDenouncesTimer();
    }

    @HostListener('mouseleave', ['$event'])
    onMouseLeave() {
        if (!this._graphs || this._graphs.length < 1) {
            return;
        }
        this.clearCallLater(this._rollInDenouncesTimer);
        this._addRollOutDenouncesTimer();
    }

    @ContentChildren(JigsawGraph, {descendants: true})
    private _graphs: QueryList<JigsawGraph>;

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
                graphs: this._graphs,
                jigsawGraphDownloadExportFileName: this.jigsawGraphDownloadExportFileName,
                jigsawGraphDownloadTooltip: this.jigsawGraphDownloadTooltip
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
             [title]="initData.jigsawGraphDownloadTooltip"><span
            class="fa fa-download"></span></div>`
})
export class JigsawGraphDownloadButton extends AbstractJigsawComponent implements IPopupable {
    public answer: EventEmitter<ButtonInfo>;
    @Input()
    public initData: any;

    [index: string]: any;

    private _getGraphBase64Codes() {
        let codes = [];
        this.initData.graphs.forEach((graph, index) => {
            if (!graph || !graph.data || !graph.data.options) {
                return;
            }
            let animation = graph.echarts.getOption().animation;
            graph.echarts.setOption({
                animation:false
            });
            let graphTitle = !!graph.data.options.title && !!graph.data.options.title.text ? `-${graph.data.options.title.text}` : '';
            const chartData = graph.echarts.getDataURL();
            if (chartData) {
                codes.push({
                    base64: chartData.replace(/.*?\bbase64,\s*/, ''),
                    title: `chart-${index + 1}${graphTitle}`
                });
            }
            if (CommonUtils.isUndefined(animation)) {
                animation = true;
            }
            graph.echarts.setOption({
                animation:animation
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
        zip.generateAsync({type: "blob"})
            .then(function (content) {
                FileSaver.saveAs(content, `${jigsawGraphDownloadExportFileName}`);
            });
    }
}

