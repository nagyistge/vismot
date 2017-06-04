import { Component, OnInit } from '@angular/core';
import { D3Service, D3, Selection, ScaleLinear, Axis } from 'd3-ng2-service';

// Data
import { Trip } from '../trip.model';
import { Route } from '../route.model';
import { STOPS, PURPLE_LINE, STOP_TIMES, SCHEDULE_TITLE, NETWORK, PURPLE_ROUTE } from '../data';


@Component({
  selector: 'app-marey',
  templateUrl: './marey.component.html',
  styleUrls: ['./marey.component.css']
})
export class MareyComponent implements OnInit {
  private d3: D3; // <-- Define the private member which will hold the d3 reference
  private diagramWidth: number = 500;
  private diagramHeight: number = 500;
  private mareySVG: any;
  private stopValues: any[];
  private plotData: any[][][];

  constructor(d3Service: D3Service) {
     this.d3 = d3Service.getD3(); // obtain the d3 object from the D3 Service
  }

  ngOnInit() {
    this.parseData(PURPLE_ROUTE);
    this.drawDiagram();
  }

  drawDiagram() {
    var d3 = this.d3;

    // add SVG to page
    this.mareySVG = d3.select('#marey').append('svg')
                                      .attr('class', 'svg-bordered')
                                      .attr('width', this.diagramWidth)
                                      .attr('height', this.diagramHeight);


    this.drawPoints(PURPLE_ROUTE);
    this.drawLines(PURPLE_ROUTE);
  }

  drawPoints(route: Route) {
    let d3 = this.d3;
    let stopsScale = d3.scaleLinear()
                       .domain([0, 9]) // SPECIFIC TO PURPLE WESTBOUND ROUTE
                       .range([0, this.diagramWidth]);

    let timeScale = d3.scaleTime()
                      .domain([this.earliestTime(route), this.latestTime(route)])
                      .range([0, this.diagramHeight]);

    let trips: Trip[] = route.trips;
    for (let i = 0; i < trips.length; i++) {
      let newGroup = this.mareySVG.append('g').attr('id', 'marey-group-' + i);
      let circles = newGroup.selectAll('.marey-point')
                            .data(trips[i].stops).enter()
                            .append('circle')
                            .attr('class', 'marey-point')
                            .attr('cx', function(d) { return stopsScale(d.stopId); })
                            .attr('cy', function(d) { return timeScale(d.time); })
                            .attr('r', 3);
    }
  }

  drawLines(route: Route) {
    let d3 = this.d3;

    let join = this.mareySVG.selectAll('path.line').data(this.plotData);

    let stopsScale = d3.scaleLinear()
                       .domain([0, 9]) // SPECIFIC TO PURPLE WESTBOUND ROUTE
                       .range([0, this.diagramWidth]);

    let timeScale = d3.scaleTime()
                      .domain([this.earliestTime(route), this.latestTime(route)])
                      .range([0, this.diagramHeight]);

    let drawLineFunction = d3.line()
                                   .x(function(d) { return stopsScale(d[0]); })
                                   .y(function(d) { return timeScale(d[1]); });

    join.exit().remove(); //removes extraneous elements that do not have data

    join.enter()
      .append('path') // this adds new elements for data that had no place to go
      .merge(join) // puts the update and enter sections of the join together so that all following methods will act on all elements.
      .attr('d', drawLineFunction)
      .attr('class', function(d, i) {
        return 'line marey-line ' + 'route-' + route.colorName;
      });
  }

  parseData(route: Route) {
    this.stopValues = route.stopSequence.map(function(el) {
      return STOPS.find(function(stop) {
        return stop.id == el;
      });
    });


    let lineData: any[][][] = [];

    route.trips.forEach(function(trip) {
      let line = trip.stops.map(function(stop) {
        return [stop.stopId, stop.time];
      });
      lineData.push(line);
    });

    this.plotData = lineData;
  }

  earliestTime(route: Route) {
    let schedule = route.trips.map(function(trip) { return trip.stops; });
    let flattened: any[] = [].concat.apply([], schedule);

    let sortedByDate = flattened.sort(function(a, b) {
      if(a.time > b.time)
        return 1;
      else
        return -1;
    });
    let startTime = new Date(sortedByDate[0].time);
    startTime.setMinutes(0);
    return startTime;
  }

  latestTime(route: Route) {
    let schedule = route.trips.map(function(trip) { return trip.stops; });
    let flattened: any[] = [].concat.apply([], schedule);
    let sortedByDate = flattened.sort(function(a, b) {
      if(a.time > b.time)
        return 1;
      else
        return -1;
    });
    let endTime = new Date(sortedByDate.pop().time);
    endTime.setHours(endTime.getHours()+1);
    endTime.setMinutes(0);
    return endTime;
  }

}
