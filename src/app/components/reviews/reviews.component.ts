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
  /*GRAFICA*/
  lineChart: any
  barChart: any

  /*TABLA*/
  columns: string[] = [];
  games: any[] = [];
  filteredGames: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  searchTerm: string = '';
  
  /*FORMULARIOS RESEÑAS*/
  reviewForm: FormGroup = new FormGroup({});
  reviews: any[] = [];

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit() {
    /*GRAFICAS*/ 
    this.lineChart = new Chart("lineChart", {
      type: "line",
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [
          {
            label: 'PlayStation',
            data: [29, 55, 61, 58, 51, 55, 39, 52, 70, 79, 78, 41],
            fill: false,
            borderColor: '#004882',
            backgroundColor: '#004882',
            pointRadius: 4,
            tension: 0.1,
            pointHoverRadius: 6,
            hoverBackgroundColor: 'rgba(0, 72, 130, 0.8)',
          },
          {
            label: 'PC',
            data: [79, 106, 127, 114, 120, 98, 102, 116, 129, 148, 124, 77],
            fill: false,
            borderColor: '#0D0D0D',
            backgroundColor: '#0D0D0D',
            pointRadius: 4,
            tension: 0.1,
            pointHoverRadius: 6,
            hoverBackgroundColor: 'rgba(13, 13, 13, 0.8)'
          },
          {
            label: 'Xbox',
            data: [34, 31, 51, 46, 41, 45, 20, 46, 52, 60, 65, 29],
            fill: false,
            borderColor: '#078C03',
            backgroundColor: '#078C03',
            pointRadius: 4,
            tension: 0.1,
            pointHoverRadius: 6,
            hoverBackgroundColor: 'rgba(7, 140, 3, 0.8)'
          },
          {
            label: 'Switch',
            data: [57, 67, 92, 93, 76, 81, 73, 60, 89, 86, 94, 58],
            fill: false,
            borderColor: '#F20519',
            backgroundColor: '#F20519',
            pointRadius: 4,
            tension: 0.1,
            pointHoverRadius: 6,
            hoverBackgroundColor: 'rgba(242, 5, 25, 0.8)'
          },
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Lanzamiento Mensual de Videojuegos por Plataforma en 2023',
            font: {
              size: 18,
            },
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
              font: {
                weight: 'bold',
              }
            }
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Número de juegos lanzados',
            },
            beginAtZero: true
          }
        },
        layout: {
          padding: {
            left: 20,
            right: 20
          }
        }
      }
    });

    this.barChart = new Chart("barChart", {
      type: "bar",
      data: {
        labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
          {
            label: 'PlayStation 4',
            data: [19.71, 18.2, 14.06, 8.43, 2.45, 0.24, 0.26, 0],
            backgroundColor: '#17a2b8',
          },
          {
            label: 'Xbox One',
            data: [9.14, 8.79, 6.53, 3.95, 0.11, 0.01, 0, 0],
            backgroundColor: '#77b300',
          },
          {
            label: 'Nintendo 3DS',
            data: [6.48, 3.59, 1.56, 0.49, 0.03, 0, 0, 0],
            backgroundColor: '#fd7e14',
          },
          {
            label: 'PlayStation 5',
            data: [0, 0, 0, 4.37, 12.73, 13.92, 21.78, 6.3],
            backgroundColor: '#007bff',
          },
          {
            label: 'Xbox S',
            data: [0, 0, 0, 3.06, 8.07, 8.65, 7.5, 1.2],
            backgroundColor: '#28a745',
          },
          {
            label: 'Nintendo Switch',
            data: [13.12, 16.37, 19.33, 28.46, 24.01, 19.05, 16.38, 6.1],
            backgroundColor: '#b22222',
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Ventas Anuales de Consolas de Actual Generación (2017 - 2024)',
            font: {
              size: 18,
            },
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
              font: {
                weight: 'bold',
              }
            }
          },
          tooltip: {
            filter: function (tooltipData) {
              return tooltipData.raw != 0;
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Ventas en millones de unidades'
            },
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + 'M';
              }
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        },
        layout: {
          padding: {
            left: 20,
            right: 20
          }
        }
      }
    });

    Chart.defaults.font.family = 'Montserrat, sans-serif';

    /*TABLA*/  
    const { columns, games } = this.reviewsService.getGamesAndColumns();
    this.columns = columns;
    this.games = games;
    this.filteredGames = games;

    /*FORM RESEÑAS*/
    this.reviewForm = new FormGroup({
      gameTitle: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      userReview: new FormControl('', Validators.required)
    });
    this.getReviews();
  }

  /*FILTROS TABLA*/
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

  /*CAMBIAR DE PAGINA TABLA*/
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

  /*FORM RESEÑAS*/
  getReviews() {
    this.reviewsService.readReviews().subscribe(reviews => {
      this.reviews = reviews;
    });
  }
}
