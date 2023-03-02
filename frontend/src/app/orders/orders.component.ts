import { Component, OnInit } from '@angular/core';
import { Order } from '../models/models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  listOfOrders: Order[] = [];
  ordersToDisplay: Order[] = [];
  columns: string[] = [
    'id',
    'userid',
    'name',
    'bookid',
    'book',
    'date',
    'status',
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAllOrders().subscribe({
      next: (res: Order[]) => {
        this.listOfOrders = res;
        this.ordersToDisplay = this.listOfOrders;
      },
      error: (err: any) => console.log(err),
    });
  }

  filter(value: string) {
    if (value === 'all') {
      this.ordersToDisplay = this.listOfOrders.filter((value) => value);
    } else if (value === 'pen') {
      this.ordersToDisplay = this.listOfOrders.filter(
        (value) => value.status == "Ordered"
      );
    } else {
      this.ordersToDisplay = this.listOfOrders.filter(
        (value) => value.status == "Returned"
      );
    }
  }
}
