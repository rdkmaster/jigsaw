import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JigsawStepsComponent } from './steps.component';
import { JigsawStepComponent } from './step.component';
import { JigsawStepConnectService } from './step-connect.service';

@NgModule({
  imports     : [ CommonModule ],
  exports     : [ JigsawStepsComponent, JigsawStepComponent ],
  declarations: [ JigsawStepsComponent, JigsawStepComponent ],
  providers   : [ JigsawStepConnectService ]
})
export class JigsawStepsModule {
}
