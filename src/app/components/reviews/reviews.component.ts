import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import * as XLSX from 'xlsx';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReviewsService } from 'src/app/services/reviews.service';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})

export class ReviewsComponent implements OnInit {
  //CHARTS
  lineChart: any
  barChart: any
  pieChart: any;

  //TABLE
  columns: string[] = [];
  games: any[] = [];
  filteredGames: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  searchTerm: string = '';

  //REVIEWS
  reviewForm: FormGroup = new FormGroup({});
  reviews: any[] = [];

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit() {
    //CHARTS
    this.reviewsService.getChartData().subscribe(data => {
      this.lineChart = new Chart("lineChart", {
        type: "line",
        data: data.lineChart,
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Lanzamiento Mensual de Videojuegos por Plataforma en 2023',
              font: { size: 18 },
              color: '#333',
              padding: 20,
            },
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
            title: {
              display: true,
              text: 'Ventas Anuales de Consolas de Actual Generación (2017 - 2024)',
              font: { size: 18 },
              color: '#333',
              padding: 20,
            },
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
          plugins: {
            title: {
              display: true,
              text: 'Tiempo semanal dedicado a jugar videojuegos en España en 2023, por dispositivo (en horas)',
              font: { size: 18 },
              color: '#333',
              padding: 20,
            },
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
          },
          layout: { padding: { left: 20, right: 20 } },
        }
      });

      Chart.defaults.font.family = 'Montserrat, sans-serif';
    });

    //TABLE
    this.reviewsService.getGamesAndColumns().subscribe(data => {
      this.columns = data.columns
      this.games = data.games;
      this.filteredGames = this.games
    });

    //REVIEWS
    this.reviewForm = new FormGroup({
      gameTitle: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      userReview: new FormControl('', Validators.required)
    });
    
    this.reviewsService.readReviews().subscribe(data => {
      this.reviews = data.reviews;
    });
  }

  //FILTERS (TABLE)
  searchFilter(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filteredGames = this.games.filter(game =>
      game.title.toLowerCase().includes(this.searchTerm) ||
      game.platform.toLowerCase().includes(this.searchTerm) ||
      game.genre.toLowerCase().includes(this.searchTerm) ||
      game.pegi.toString().toLowerCase().includes(this.searchTerm)
    );
  }

  dateFilter() {
    const startDateValue = (document.getElementById('startDate') as HTMLInputElement).value;
    const endDateValue = (document.getElementById('endDate') as HTMLInputElement).value;

    if (startDateValue && endDateValue) {
      const startDate = new Date(startDateValue);
      const endDate = new Date(endDateValue);
      this.filteredGames = this.games.filter(game => {
        const releaseDate = new Date(game.releaseDate);
        return releaseDate >= startDate && releaseDate <= endDate;
      });
    } else {
      this.filteredGames = this.games;
    }
  }

  priceFilter() {
    const minPriceValue = (document.getElementById('minPrice') as HTMLInputElement).value;
    const maxPriceValue = (document.getElementById('maxPrice') as HTMLInputElement).value;

    if (minPriceValue && maxPriceValue) {
      const minPrice = parseFloat(minPriceValue);
      const maxPrice = parseFloat(maxPriceValue);
      this.filteredGames = this.games.filter(game => {
        const price = parseFloat(game.price);
        return price >= minPrice && price <= maxPrice;
      });
    } else {
      this.filteredGames = this.games;
    }
  }

  //CHANGE TABLE PAGE
  pageChanged(page: number) {
    this.currentPage = page;
  }

  exportToExcel(): void {
    const table = document.getElementById('gamesTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }
}
