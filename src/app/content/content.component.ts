import { Component, OnInit } from '@angular/core';

import { ACCOUNTS } from '../shared/accounts';
import { Account } from '../shared/account';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit {

  constructor() {
  }

  accounts: Account[];
  id: number;
  totals: Account = {
    name: '',
    marketValue: 0,
    cash: 0,
    legend: 'none'
  };

  ngOnInit() {
    this.id = 1;
    this.accounts = ACCOUNTS.slice();
    this.totalSum();
  }

  totalSum() {
    this.accounts.forEach((account) => {
      this.totals.marketValue += account.marketValue;
      this.totals.cash += account.cash;
    });
  }

  addAccount() {
    this.accounts.push({
      name: `New Account ${this.id++}`,
      marketValue: Math.random() * 100000,
      cash: Math.random() * 400000,
      legend: 'cyan'
    });
    this.totalSum();
  }

  refresh() {
    this.accounts = ACCOUNTS.slice();
    this.totals.marketValue = 0;
    this.totals.cash = 0;
    this.id = 1;
    this.totalSum();
  }
}
