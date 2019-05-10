import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JigsawMobileRateComponent } from './rate';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [JigsawMobileRateComponent],
  exports: [JigsawMobileRateComponent]
})
export class JigsawMobileRateModule { }

export * from './rate';
