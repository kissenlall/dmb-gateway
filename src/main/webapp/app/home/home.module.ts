import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DmbGatewaySharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [DmbGatewaySharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class DmbGatewayHomeModule {}
