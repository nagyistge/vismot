import { Component, OnInit } from '@angular/core';
import { D3Service, D3, Selection, ScaleLinear, ScaleOrdinal, Axis } from 'd3-ng2-service';

// Data
import { Trip } from '../trip.model';
import { Route } from '../route.model';
import {
  STOPS,
  NETWORK,
  PURPLE_WESTBOUND_LATE_ROUTE,
  PURPLE_EASTBOUND_LATE_ROUTE,
  RED_WESTBOUND_LATE_ROUTE,
  GOLD_NORTHBOUND_WEEKDAY_ROUTE
 } from '../data';


@Component({
  selector: 'app-marey',
  templateUrl: './marey.component.html',
  styleUrls: ['./marey.component.css']
})
export class MareyComponent implements OnInit {
  private d3: D3; // <-- Define the private member which will hold the d3 reference
  private diagramWidth: number = 1000;
  private diagramHeight: number = 500;
  private plotArea: any;
  private stopValues: any[];
  private plotData: any[][][][];


  constructor(d3Service: D3Service) {
     this.d3 = d3Service.getD3(); // obtain the d3 object from the D3 Service
  }

  ngOnInit() {
    let routes: Route[] = [
      PURPLE_WESTBOUND_LATE_ROUTE,
      PURPLE_EASTBOUND_LATE_ROUTE,
      RED_WESTBOUND_LATE_ROUTE,
      GOLD_NORTHBOUND_WEEKDAY_ROUTE
    ];
    let seq = [];
    let end = 43;
    for (let i = 1; i <= end; i++) {
      seq.push(i);
    }

    this.parseData(routes, seq);
    this.drawDiagram(routes, seq);
  }

  drawDiagram(routes: Route[], includedStopSequence: number[]) {
    var d3 = this.d3;

    var margin = {top: 150, right: 20, bottom: 30, left: 50};
    // add SVG to page
    let svg = d3.select('#marey').append('svg')
                                 .attr('class', 'svg-bordered')
                                 .attr("width", this.diagramWidth + margin.left + margin.right)
                                 .attr("height", this.diagramHeight + margin.top + margin.bottom);
    // add plot area
    this.plotArea = svg.append("g")
                      .attr("id", "global-g")
                      .attr("transform",
                            "translate(" + margin.left + "," + margin.top + ")");

    let stopsIncluded = includedStopSequence;
    let stopData =  stopsIncluded.map(function(id) {
      return {
        stopId: id,
        stopName: STOPS.find(function(stop) {
          return stop.id == id;
        }).name
      };
    });

    let stops = [{
                  stopId: 0,
                  stopName: 'placeholder'
                }].concat(stopData);

    let stopNames = stopData.map(function(el) {
      return el.stopName;
    });

    let stopIdsScale = d3.scaleLinear()
                         .domain([1, includedStopSequence.length+1])
                         .range([0, this.diagramWidth]);
    let stopsScale = d3.scaleBand()
                       .domain(stopNames)
                       .range([0, this.diagramWidth]);
    let timeScale = d3.scaleTime()
                      .domain([this.earliestTime(routes[0]), this.latestTime(routes[routes.length-1])])
                      .range([0, this.diagramHeight]);

    let xAxis = d3.axisTop(stopsScale).ticks(includedStopSequence.length);

    // add main x-axis with rotated text (stops)
    let xAxisLabel = this.plotArea.append("g")
                                  .attr('class', 'stops-axis')
                                  .call(xAxis);
    xAxisLabel.selectAll("text")
              .attr("y", 0) // center along tick
              .attr("x", 9) // adjust 'left' margin past tick
              .attr("dy", ".35em")
              .attr("transform", "rotate(-90)")
              .style("text-anchor", "start");

    function make_x_gridlines() {
      return d3.axisTop(stopsScale)
               .ticks(includedStopSequence.length)
               .tickFormat(function() { return ''; }); // set text format to be blank for all ticks
    }
    // add the X gridlines
    this.plotArea.append("g")
                 .attr("class", "grid")
                 .attr("transform", "translate(0," + this.diagramHeight + ")")
                 .call(make_x_gridlines().tickSize(this.diagramHeight));


    let yAxis = d3.axisLeft(timeScale).tickArguments([d3.timeMinute.every(15)]);
    // add y-axis (time)
    this.plotArea.append("g")
                 .attr("class", "axis")
                 .call(yAxis);


    routes.forEach((route, i) => {
      this.drawLines(route, this.plotData[i], stopIdsScale, timeScale, includedStopSequence);
      // this.drawPoints(route, stopIdsScale, timeScale, includedStopSequence);
    })
  }

  drawPoints(route: Route, xScale, yScale, includedStopSequence: number[]) {
    let d3 = this.d3;
    let columnForStopId = this.stopColumnAligner(includedStopSequence);

    let trips = route.trips.map(function(trip) {
      return trip.stops.map(function(arrival) {
        let stop = STOPS.find(function(stop) {
                    return stop.id == arrival.stopId;
                  });
        return {
          time: arrival.time,
          stopId: arrival.stopId,
          stopName: stop.name
        };
      });
    });
    let margin =
    this.diagramWidth
// this.plotArea.attr('width')
 / (includedStopSequence.length) / 2;
// margin = 50;
    for (let i = 0; i < trips.length; i++) {
      // add group of circles for each trip
      let newGroup = this.plotArea.append('g').attr('id', 'marey-group-' + i);
      let circles = newGroup.selectAll('.marey-point')
                            .data(trips[i]).enter()
                            .append('circle')
                            .attr('class', 'marey-point')
                            .attr('cx', (d) => xScale(columnForStopId(d.stopId)) + margin)
                            .attr('cy', (d) => yScale(d.time))
                            .attr('r', 3);
    }
  }

  drawLines(route: Route, data, xScale, yScale, includedStopSequence: number[]) {
    let d3 = this.d3;
    let margin =
    this.diagramWidth
// this.plotArea.attr('width')
     / (includedStopSequence.length) / 2;
     console.log(margin);
    let columnForStopId = this.stopColumnAligner(includedStopSequence);

    let drawLineFunction = d3.line()
                             .x((d) => xScale(columnForStopId(d[0])) + margin)
                             .y((d) => yScale(d[1]));

    let newRouteSet = this.plotArea.append('g').attr('class', 'route-set');
    let join = newRouteSet.selectAll('path.line').data(data);

    join.exit().remove(); //removes extraneous elements that do not have data

    join.enter()
        .append('path') // this adds new elements for data that had no place to go
        .merge(join) // puts the update and enter sections of the join together so that all following methods will act on all elements.
        .attr('d', drawLineFunction)
        .attr('class', (d, i) => 'line marey-line route-' + route.colorName);
  }

  parseData(routes: Route[], includedStopSequence: number[]) {
    this.stopValues = includedStopSequence.map((el) => {
      return STOPS.find((stop) => stop.id == el);
    });

    // reset plot data
    this.plotData = [];

    routes.forEach((route) => {

    let lineData: any[][][] = [];

    route.trips.forEach(function(trip) {
      let line = trip.stops.map(function(stop) {
        return [stop.stopId, stop.time];
      });
      lineData.push(line);
    });

    this.plotData.push(lineData);
  });
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

    // round down to the hour
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

    // round up to the hour
    endTime.setHours(endTime.getHours()+1);
    endTime.setMinutes(0);

    return endTime;
  }

  stopColumnAligner(stopSequence) {
    let columnFunction = function(stopId) {
      return stopSequence.indexOf(stopId) + 1;
    };
    return columnFunction;
  }

}
