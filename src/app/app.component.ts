import {Component} from '@angular/core';
import * as d3 from 'd3';
import {OnInit} from '@angular/core/src/metadata/lifecycle_hooks';
import {ScaleLinear, ScaleBand} from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  width = 400;
  height = 600;
  xMin = 2;
  xMax = 12;
  yMin = 0;
  yMax = 1;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number>;
  xTick: XTick[];
  yTick: [number, number];
  circleX = 300;
  circleY = 300;
  dragFlag = false;

  constructor() {
  }

  ngOnInit() {
    this.createXtick();
    this.yScale = this.getYscale();
  }

  private getXscale(x: string) {
    return d3
      .scaleBand()
      .rangeRound([0, this.width])
      .padding(2)
      .domain(this.xTick.map((d) => {
        return d.value;
      }))(x);
  }

  private getYscale() {
    return d3
      .scaleLinear()
      .domain([this.yMin, this.yMax])
      .range([0, this.height]);
  }

  private createXtick() {
    const result = [];
    for (let i = 2; i <= 12; i++) {
      result.push({value: i.toString()});
    }
    this.xTick = result;
  }

  move(event: MouseEvent) {
    if (!this.dragFlag) return;
    this.circleX = event.clientX;
    this.circleY = event.clientY;
  }
}

export class XTick {
  value: string;
}
