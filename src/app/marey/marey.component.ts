import { Component, OnInit } from '@angular/core';
import { D3Service, D3, Selection, ScaleLinear, ScaleOrdinal, Axis } from 'd3-ng2-service';

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
  private plotArea: any;
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

    let stopData =  PURPLE_LINE.map(function(id) {
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
                         .domain([1, PURPLE_LINE.length+1])
                         .range([0, this.diagramWidth]);
    let stopsScale = d3.scaleBand()
                       .domain(stopNames)
                       .range([0, this.diagramWidth]);
    let timeScale = d3.scaleTime()
                      .domain([this.earliestTime(PURPLE_ROUTE), this.latestTime(PURPLE_ROUTE)])
                      .range([0, this.diagramHeight]);

    this.drawPoints(PURPLE_ROUTE, stopsScale, timeScale);
    this.drawLines(PURPLE_ROUTE, stopIdsScale, timeScale);

    let xAxis = d3.axisTop(stopsScale);
    let yAxis = d3.axisLeft(timeScale);

    yAxis.tickArguments([d3.timeMinute.every(15)]);

    let xAxisLabel = this.plotArea.append("g")
                                  .attr("class", "axis")
                                  .call(xAxis);

    xAxisLabel.selectAll("text")
              .attr("y", 0) // center along tick
              .attr("x", 9) // adjust 'left' margin past tick
              .attr("dy", ".35em")
              .attr("transform", "rotate(-90)")
              .style("text-anchor", "start");
    this.plotArea.append("g")
                 .attr("class", "axis")
                 .call(yAxis);
  }

  drawPoints(route: Route, xScale, yScale) {
    let d3 = this.d3;

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
    let margin = this.diagramWidth / PURPLE_LINE.length / 2;
    for (let i = 0; i < trips.length; i++) {
      // add group of circles for each trip
      let newGroup = this.plotArea.append('g').attr('id', 'marey-group-' + i);
      let circles = newGroup.selectAll('.marey-point')
                            .data(trips[i]).enter()
                            .append('circle')
                            .attr('class', 'marey-point')
                            .attr('cx', function(d) { return xScale(d.stopName) + margin; })
                            .attr('cy', function(d) { return yScale(d.time); })
                            .attr('r', 3);
    }
  }

  drawLines(route: Route, xScale, yScale) {
    let d3 = this.d3;
    let margin =
    this.diagramWidth / PURPLE_LINE.length / 2;

    let join = this.plotArea.selectAll('path.line').data(this.plotData);

    let drawLineFunction = d3.line()
                                   .x(function(d) { return xScale(d[0]) + margin; })
                                   .y(function(d) { return yScale(d[1]); });

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

}
