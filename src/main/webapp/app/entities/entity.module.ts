import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'promotion',
        loadChildren: () => import('./promotion/promotion.module').then(m => m.DmbGatewayPromotionModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class DmbGatewayEntityModule {}
