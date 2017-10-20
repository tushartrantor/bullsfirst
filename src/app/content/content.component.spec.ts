import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { ContentComponent } from './content.component';
import { ACCOUNTS } from '../shared/accounts';
import { Account } from '../shared/account';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;
  let addAccntBtnEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    addAccntBtnEl  = fixture.debugElement.query(By.css('.add-account-btn'));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(`should have accounts array after Initialization`, async(() => {
    const fixture = TestBed.createComponent(ContentComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
    expect(app.accounts).toEqual(ACCOUNTS);
  }));

  it(`should have id starting from 1`, async(() => {
    const fixture = TestBed.createComponent(ContentComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
    expect(app.id).toEqual(1);
  }));

  it(`should have totals to be empty values`, async(() => {
    const fixture = TestBed.createComponent(ContentComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.totals.name).toEqual('');
    expect(app.totals.marketValue).toEqual(0);
    expect(app.totals.cash).toEqual(0);
    expect(app.totals.legend).toEqual('none');
  }));

  it(`should have total Amount value for the accounts initially imported`, async(() => {
    const fixture = TestBed.createComponent(ContentComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
    expect(app.totals.marketValue).toEqual(5661174);
    expect(app.totals.cash).toEqual(5535503);
  }));

  it(`should have total Amount & total number of Accounts updated after adding new account`, async(() => {
    const fixture = TestBed.createComponent(ContentComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
    app.addAccount();
    expect(app.accounts.length).toEqual(ACCOUNTS.length + 1);
    expect(app.totals.marketValue).toBeGreaterThan((5661174+100000));
    expect(app.totals.cash).toBeGreaterThan(5535503+400000);
  }));

  it(`should have total Amount & total number of Accounts reset to Original values after Refresh`, async(() => {
    const fixture = TestBed.createComponent(ContentComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
    app.refresh();
    expect(app.accounts.length).toEqual(ACCOUNTS.length);
    expect(app.totals.marketValue).toEqual((5661174));
    expect(app.totals.cash).toEqual(5535503);
  }));

  it('should render Total Value in a total-market-value & total-cash class', async(() => {
    const fixture = TestBed.createComponent(ContentComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.total-market-value').textContent).toContain('$5,661,174.00');
    expect(compiled.querySelector('.total-cash').textContent).toContain('$5,535,503.00');
  }));

  it('should trigger a method when Add Account button is clicked', async(() => {
    spyOn(component, 'addAccount');
    const fixture = TestBed.createComponent(ContentComponent);
    addAccntBtnEl.triggerEventHandler('click', null);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.addAccount).toHaveBeenCalled();
    })
  }));

  // it('should increase Accounts length by 1 when Add Account button is clicked', async(() => {
  //   spyOn(component, 'addAccount');
  //   const fixture = TestBed.createComponent(ContentComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   // component.ngOnInit();
  //   addAccntBtnEl.triggerEventHandler('click', null);

  //   fixture.whenStable().then(() => {
  //     fixture.detectChanges();
  //     expect(app.accounts.length).toEqual(ACCOUNTS.length + 1);
  //     expect(component.addAccount).toHaveBeenCalled();
  //   })
  // }));
});
