import { Component, OnInit } from '@angular/core';
import { Chart, ChartEvent, LegendElement, LegendItem } from 'chart.js/auto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})

export class ReviewsComponent implements OnInit {
  
  constructor(private reviewsService: ReviewsService) { }

  //CHARTS
   private originalBackgroundColors: string[] = [];
  lineChart: any
  barChart: any
  pieChart: any;
  
  private handlehoover(e: ChartEvent, legendItem: LegendItem, legend: LegendElement<'pie'>) {
    const backgroundColor = legend.chart.data.datasets[0].backgroundColor;

    if (Array.isArray(backgroundColor)) {
      if (this.originalBackgroundColors.length === 0) {
        this.originalBackgroundColors = [...backgroundColor];
      }

      backgroundColor.forEach((color: string, index: number, colors: any) => {
        colors[index] = index === legendItem.index || color.length === 9 ? color : color + '4D';
      });
      legend.chart.update();
    }
  }

  private handleleave(e: ChartEvent, legendItem: LegendItem, legend: LegendElement<'pie'>) {
    const backgroundColor = legend.chart.data.datasets[0].backgroundColor;

    if (Array.isArray(backgroundColor) && this.originalBackgroundColors.length > 0) {
      backgroundColor.forEach((color: string, index: number, colors: any) => {
        colors[index] = this.originalBackgroundColors[index];
      });
      legend.chart.update();
    }
  }

  //REVIEWS
  reviewForm: FormGroup = new FormGroup({});
  reviews: any[] = [];

  ngOnInit() {
    this.initializeCharts();
    this.initializeReviews();
  }

  initializeCharts() {
    this.reviewsService.getChartData().subscribe(data => {
      this.lineChart = new Chart("lineChart", {
        type: "line",
        data: data.lineChart,
        options: {
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                usePointStyle: true,
                pointStyle: 'rect',
                padding: 20,
                color: '#333',
                font: { weight: 'bold' }
              }
            }
          },
          scales: {
            y: {
              title: { display: true, text: 'Número de juegos lanzados' },
              beginAtZero: true
            }
          },
          layout: { padding: { left: 20, right: 20 } }
        }
      });

      this.barChart = new Chart("barChart", {
        type: "bar",
        data: data.barChart,
        options: {
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                usePointStyle: true,
                pointStyle: 'rect',
                padding: 20,
                color: '#333',
                font: { weight: 'bold' }
              }
            },
            tooltip: {
              filter: function (tooltipData) {
                return tooltipData.raw != 0;
              }
            }
          },
          interaction: { intersect: false, mode: 'index' },
          scales: {
            y: {
              title: { display: true, text: 'Ventas en millones de unidades' },
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return value + 'M';
                }
              }
            }
          },
          animation: { duration: 1000, easing: 'easeInOutQuart' },
          layout: { padding: { left: 20, right: 20 } }
        }
      });

      this.pieChart = new Chart("pieChart", {
        type: "pie",
        data: data.pieChart,
        options: {
          aspectRatio: 2.5,
          plugins: {
            legend: {
              onHover: (e, legendItem, legend) => this.handlehoover(e, legendItem, legend),
              onLeave: (e, legendItem, legend) => this.handleleave(e, legendItem, legend),
              position: 'bottom',
              labels: {
                usePointStyle: true,
                pointStyle: 'rect',
                padding: 20,
                color: '#333',
                font: { weight: 'bold' }
              }
            },
          },
          layout: { padding: { left: 20, right: 20 } },
        }
      });

      Chart.defaults.font.family = 'Montserrat, sans-serif';
    });
  }

  initializeReviews() {
    this.reviewForm = new FormGroup({
      gameTitle: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      userReview: new FormControl('', Validators.required)
    });

    this.reviewsService.getReviews().subscribe(data => {
      this.reviews = data.reviews; 
    });
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      const newReview = this.reviewForm.value;
      this.reviews.push(newReview);
      this.reviewForm.reset();
    }
  }
}
