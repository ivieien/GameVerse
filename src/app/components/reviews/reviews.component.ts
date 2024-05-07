import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})

export class ReviewsComponent implements OnInit {
  reviewForm: FormGroup = new FormGroup({});
  reviews: any[] = [];

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit() {
    this.reviewForm = new FormGroup({
      gameTitle: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      userReview: new FormControl('', Validators.required)
    });
    this.getReviews();
  }

  getReviews() {
    this.reviewsService.readReviews().subscribe(reviews => {
      this.reviews = reviews;
    });
  }
}
