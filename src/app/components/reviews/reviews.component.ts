import { Component, OnInit } from '@angular/core';
import { Chart, ChartEvent, LegendElement, LegendItem } from 'chart.js/auto';
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

  //FILTERS
  dropdownStates: { [key: string]: boolean } = {};
  letters: string[] = ['#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(letter => letter !== 'Ñ')];
  priceRanges: string[] = ['0 - 20€', '20 - 50€', '50 - 80€'];
  platforms = ['Todas', 'PS5', 'PC', 'Xbox', 'Switch'];
  genres: string [] =  ['Todos', 'Acción', 'Aventura', 'Lucha', 'Supervivencia', 'Deportes', 'Puzles', 'Terror', 'VR'];
  pegiRatings: string[] = ['Todos', '3', '7', '12', '16', '18'];
  months: string[] = ['Todos', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  selectedLetter: string = '';
  selectedPriceRange: string = '';
  selectedPlatform: string = 'Todas';
  selectedGenre: string = 'Todos';
  selectedPegi: string = 'Todos';
  selectedMonth: string = 'Todos';

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
  private originalBackgroundColors: string[] = [];

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit() {
    this.initializeCharts();
    this.initializeTable();
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

  initializeTable() {
    this.reviewsService.getGamesAndColumns().subscribe(data => {
      this.columns = data.columns;
      this.games = data.games;
      this.filteredGames = this.games;
    });
  }

  initializeReviews() {
    this.reviewForm = new FormGroup({
      gameTitle: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      userReview: new FormControl('', Validators.required)
    });
  }

  //FILTERS FUNCTIONS (TABLE)
  toggleDropdown(dropdown: string) {
    this.dropdownStates[dropdown] = !this.dropdownStates[dropdown];

    Object.keys(this.dropdownStates).forEach(key => {
      if (key !== dropdown) {
        this.dropdownStates[key] = false;
      }
    });
  }

  isDropdownOpen(dropdown: string): boolean {
    return this.dropdownStates[dropdown];
  }

  selectLetter(letter: string, event: Event) {
    event.stopPropagation();
    this.selectedLetter = letter;
    this.dropdownStates['letter'] = false;  
    this.applyFilters();
  }

  selectPriceRange(priceRange: string, event: Event) {
    event.stopPropagation();
    this.selectedPriceRange = priceRange;
    this.dropdownStates['price'] = false;
    this.applyFilters();
  }

  matchesPriceRange(price: number): boolean {
    if (this.selectedPriceRange === '') return true;
    const [min, max] = this.selectedPriceRange.split(' - ').map(val => parseFloat(val.replace('€', '')));
    return price >= min && price <= max;
  }

  selectPlatform(platform: string, event: Event) {
    event.stopPropagation();
    this.selectedPlatform = platform;
    this.dropdownStates['platform'] = false;
    this.applyFilters();
  }

  selectGenre(genre: string, event: Event) {
    event.stopPropagation();
    this.selectedGenre = genre;
    this.dropdownStates['genre'] = false;
    this.applyFilters();
  }

  selectPegi(pegi: string, event: Event) {
    event.stopPropagation();
    this.selectedPegi = pegi; 
    this.dropdownStates['pegi'] = false; 
    this.applyFilters(); 
  }

  selectMonth(month: string, event: Event) {
    event.stopPropagation();
    this.selectedMonth = month;
    this.dropdownStates['month'] = false;
    this.applyFilters();
  }

  applyFilters() {
  this.filteredGames = this.games.filter(game => {
    const matchesLetter = this.selectedLetter === '' || (this.selectedLetter === '#' ? /^[0-9]/.test(game.title) : game.title.startsWith(this.selectedLetter));
    const matchesPrice = this.matchesPriceRange(game.price);
    const matchesPlatform = this.selectedPlatform === 'Todas' || game.platform.includes(this.selectedPlatform);
    const matchesGenre = this.selectedGenre === 'Todos' || game.genre.includes(this.selectedGenre);
    const matchesPegi = this.selectedPegi === 'Todos' || game.pegi.toString() === this.selectedPegi;
    const matchesMonth = this.selectedMonth === 'Todos' || game.releaseDate === this.selectedMonth;

    return matchesLetter && matchesPrice && matchesPlatform && matchesGenre && matchesPegi && matchesMonth;
  });
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
