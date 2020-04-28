import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPromotion } from 'app/shared/model/promotion.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { PromotionService } from './promotion.service';
import { PromotionDeleteDialogComponent } from './promotion-delete-dialog.component';

@Component({
  selector: 'jhi-promotion',
  templateUrl: './promotion.component.html'
})
export class PromotionComponent implements OnInit, OnDestroy {
  promotions: IPromotion[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected promotionService: PromotionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.promotions = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.promotionService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IPromotion[]>) => this.paginatePromotions(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.promotions = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPromotions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPromotion): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPromotions(): void {
    this.eventSubscriber = this.eventManager.subscribe('promotionListModification', () => this.reset());
  }

  delete(promotion: IPromotion): void {
    const modalRef = this.modalService.open(PromotionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.promotion = promotion;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginatePromotions(data: IPromotion[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.promotions.push(data[i]);
      }
    }
  }
}
