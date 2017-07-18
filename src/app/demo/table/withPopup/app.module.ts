import { NgModule } from '@angular/core';
import { JigsawButtonModule } from "jigsaw/component/button/button";
import { JigsawDialogModule } from "jigsaw/component/dialog/dialog";
import { JigsawTableModule } from "jigsaw/component/table/table";
import { PopupService } from "jigsaw/service/popup.service";
import { TableDataWithPopupDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawTableModule, JigsawDialogModule, JigsawButtonModule ],
    declarations: [ TableDataWithPopupDemoComponent ],
    bootstrap: [ TableDataWithPopupDemoComponent ],
    providers: [PopupService],
})
export class TableDataWithPopupDemoModule {}
