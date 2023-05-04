import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Subscription} from "../../shared/classes/subscription";
import {ProductService} from "../../shared/services/product.service";
import {Product} from "../../shared/classes/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sub-dialogue',
  templateUrl: './sub-dialogue.component.html',
  styleUrls: ['./sub-dialogue.component.scss']
})
export class SubDialogueComponent implements OnInit{
  subscription: Subscription = {};
  @Input() product: Product;
  constructor(public dialog: MatDialog, private productService: ProductService, private route: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: { product: Product }) {
    this.product = data.product;
  }

  openDialog() {
    const dialogRef = this.dialog.open(SubDialogueComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log(this.product);
    });

  }
  addSubscription(){
    const endDate = new Date(this.subscription.dateOfSubCreation);
    endDate.setMonth(endDate.getMonth() + this.subscription.subMonths);
    this.subscription.dateEndOfSubscription = endDate;
    this.productService.subscribeToProduct(this.product.productId, this.subscription.subMonths).subscribe((resp) => {
      console.log('subbed successfully');
      console.log(resp);
    });
  }

  ngOnInit(): void {
    console.log(this.product);
  }
}
