import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficadona',
  templateUrl: './graficadona.component.html',
  styles: []
})
export class GraficadonaComponent implements OnInit {
  @Input('chartLabels') doughnutChartLabels:string[] = [];
  @Input('chartData') doughnutChartData:number[] = [];
  @Input('chartType') doughnutChartType:string = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
