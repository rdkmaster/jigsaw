import { Component, ChangeDetectionStrategy, Injector, NgModule, Input, Output, EventEmitter, ChangeDetectorRef, forwardRef, ViewEncapsulation, ViewChild, AfterViewInit, Directive, NgZone, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ArrayCollection, LocalPageableArray, PageableArray } from '../../../common/core/data/array-collection';
import { JigsawListModule } from '../../../pc-components/list-and-tile/list';
import { JigsawCheckBoxModule } from '../../../pc-components/checkbox';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { JigsawPaginationModule } from '../../../pc-components/pagination/pagination';
import { JigsawSearchInputModule } from '../../../pc-components/input/search-input';
import { CommonUtils } from '../../../common/core/utils/common-utils';
import { CheckBoxStatus } from '../../../pc-components/checkbox/typings';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { InternalUtils } from '../../../common/core/utils/internal-utils';
import { TranslateHelper } from '../../../common/core/utils/translate-helper';
import { LoadingService } from '../../../common/service/loading.service';
import { RequireMarkForCheck } from '../../../common/decorator/mark-for-check';
import { JigsawTreeExtModule, JigsawTreeExt } from '../../../pc-components/tree/tree-ext';
import { AdditionalColumnDefine, AdditionalTableData } from '../../../pc-components/table/table-typings';
import { TableHeadCheckboxRenderer, TableCellCheckboxRenderer } from '../../../pc-components/table/table-renderer';
import { JigsawTableModule, JigsawTable } from '../../../pc-components/table/table';
import { filter } from 'rxjs/operators';
import { ChartIconCustomPieLegend } from 'jigsaw/pc-components/chart-icon/chart-icon-factory';
import { TableData, TableDataMatrix, TableMatrixRow } from '../../../common/core/data/table-data';
import { AbstractJigsawComponent } from '../../../common/common';


export type listOption = {
    disabled?: boolean;
    label?: string;
    subLabel?: string;
    tableData?: TableMatrixRow;
    [field: string]: string | boolean | TableMatrixRow;
}

export interface transferRenderer {
    data: any;
    transferSelectedItems: ArrayCollection<listOption> | any;
    toggleButton: EventEmitter<boolean>;
    transfer();
    update();
}

@Directive()
export class TransferListRendererBase extends AbstractJigsawComponent {
    /**
     * 宿主transfer实例
     */
    public hostInstance: any;

    /* 渲染器data */
    @RequireMarkForCheck()
    @Input()
    public data: any;

    /**
     * 渲染器已选数据
     * @internal
     */
    public selectedItems: ArrayCollection<listOption> = new ArrayCollection([]);

    /**
     * 设置数据的显示字段
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public labelField: string = "label";

    /**
     * 设置数据的副显示字段
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public subLabelField: string = "subLabel";

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public trackItemBy: string | string[];

    /**
     * @internal
     */
    public get _$trackByFn() {
        return CommonUtils.toTrackByFunction(this.trackItemBy);
    };

    /**
     * @internal
     */
    public _$updateSelectedItems() {
        // this.toggleButton.emit(this._$selectedItems.length > 0);
        // this._checkSelectAll();
        this.selectedItemsChange.emit();
        console.log(this.selectedItems)
    }

    @Output()
    public selectedItemsChange = new EventEmitter();
}

@Component({
    templateUrl: './transfer-list.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferListSourceRenderer extends TransferListRendererBase {
}

@Component({
    templateUrl: './transfer-list.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferListTargetRenderer extends TransferListRendererBase {
}

@Directive()
export class TransferTreeRendererBase {
}

@Component({
    templateUrl: './transfer-tree.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTreeSourceRenderer extends TransferTreeRendererBase {

}


@Component({
    templateUrl: './transfer-list.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTreeTargetRenderer extends TransferListTargetRenderer {
}
@Directive()
export class TransferTableRendererBase {
}

@Component({
    templateUrl: './transfer-table.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTableSourceRenderer extends TransferTableRendererBase {
}
@Component({
    templateUrl: './transfer-table.html',
    encapsulation: ViewEncapsulation.None
})
export class TransferTableTargetRenderer extends TransferTableRendererBase {
}

@NgModule({
    declarations: [TransferListSourceRenderer, TransferListTargetRenderer, TransferTreeSourceRenderer, TransferTreeTargetRenderer, TransferTableSourceRenderer, TransferTableTargetRenderer],
    imports: [CommonModule, JigsawListModule, JigsawCheckBoxModule, PerfectScrollbarModule, JigsawPaginationModule, JigsawSearchInputModule, TranslateModule, JigsawTreeExtModule, JigsawTableModule],
    providers: [TranslateService, LoadingService]
})
export class JigsawTransferRendererModule {
    constructor(translateService: TranslateService) {
        InternalUtils.initI18n(translateService, 'transfer-renderer', {
            zh: {
                items: '项',
                total: '共',
            },
            en: {
                items: 'Items',
                total: 'Total',
            }
        });
        translateService.setDefaultLang(translateService.getBrowserLang());
        TranslateHelper.languageChangEvent.subscribe(langInfo => {
            translateService.use(langInfo.curLang);
        });
    }
}
