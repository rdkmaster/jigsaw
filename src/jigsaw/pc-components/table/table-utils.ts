import {
    ColumnDefine, TableCellSetting, TableHeadSetting, TableSyncRenderer
} from "./table-typings";
import {SortAs, SortOrder} from "../../common/core/data/component-data";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {TableCellRendererBase} from "./table-renderer";

export class TableUtils {
    public static updateHeaderSettings(columnDefine: ColumnDefine, settings: TableHeadSetting): TableHeadSetting {
        if (!settings) {
            settings = {
                cellData: null, width: null, visible: true, renderer: null, clazz: '', field: '',
                sortable: false, sortAs: SortAs.string, defaultSortOrder: SortOrder.default
            };
        }
        settings.width = columnDefine.width;
        settings.field = <string>columnDefine.target;
        let headerDef = columnDefine.header;
        if (headerDef) {
            settings.cellData = CommonUtils.isDefined(headerDef.text) ? headerDef.text : settings.cellData;
            settings.renderer = TableUtils.getRenderer(headerDef.renderer);
            settings.clazz = headerDef.clazz;
            settings.sortable = headerDef.sortable;
            settings.sortAs = CommonUtils.isDefined(headerDef.sortAs) ? headerDef.sortAs : settings.sortAs;
            settings.defaultSortOrder = CommonUtils.isDefined(headerDef.sortAs) ?
                headerDef.defaultSortOrder : settings.defaultSortOrder;
        }
        return settings;
    }

    public static updateCellSettings(columnDefine: ColumnDefine, settings: TableCellSetting): TableCellSetting {
        if (!settings) {
            settings = {
                cellData: '', width: null, visible: true, renderer: null, rendererInitData: null, clazz: '', rowSpan: 1,
                editable: false, editorRenderer: null, editorRendererInitData: null, group: null, field: null, tooltip: null, innerHtmlContext: null
            }
        }
        settings.width = columnDefine.width;
        settings.group = columnDefine.group;
        settings.field = <string>columnDefine.target;
        let cellDef = columnDefine.cell;
        if (cellDef) {
            settings.renderer = TableUtils.getRenderer(cellDef.renderer);
            settings.rendererInitData = cellDef.rendererInitData;
            settings.clazz = cellDef.clazz;
            settings.editable = cellDef.editable;
            settings.editorRenderer = TableUtils.getRenderer(cellDef.editorRenderer);
            settings.editorRendererInitData = cellDef.editorRendererInitData;
            settings.tooltip = cellDef.tooltip;
            settings.innerHtmlContext = cellDef.innerHtmlContext;
        }
        return settings;
    }

    public static getRenderer(renderer): TableSyncRenderer {
        if (renderer instanceof Function && !(renderer.prototype instanceof TableCellRendererBase)) {
            try {
                return renderer();
            } catch (e) {
                return undefined;
            }
        }
        return renderer;
    }

    public static getGenerator(columnDefine: ColumnDefine, property: string): Function {
        return columnDefine.cell && columnDefine.cell[property] instanceof Function ? columnDefine.cell[property] : null;
    }
}
