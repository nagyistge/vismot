import { Component, OnInit } from '@angular/core';
import { D3Service, D3, Selection, ScaleLinear, Axis } from 'd3-ng2-service';

// Data
import { Trip } from '../trip.model';
import { Route } from '../route.model';
import {
  STOPS,
  NETWORK,
  PURPLE_WESTBOUND_LATE,
  PURPLE_WESTBOUND_LATE_ROUTE
 } from '../data';

@Component({
  selector: 'app-schedule-tables',
  templateUrl: './schedule-tables.component.html',
  styleUrls: ['./schedule-tables.component.css']
})
export class ScheduleTablesComponent implements OnInit {
  private d3: D3; // <-- Define the private member which will hold the d3 reference
  private route: Route;
  private mapWidth: number;
  private mapHeight: number;

  constructor(d3Service: D3Service) {
     this.d3 = d3Service.getD3(); // obtain the d3 object from the D3 Service
  }

  ngOnInit() {
    this.route = PURPLE_WESTBOUND_LATE_ROUTE;
    this.drawTable(this.route);
    this.establishScale(NETWORK, 50);
    this.drawMap(NETWORK, 50);
  }

  drawTable(route: Route) {
    var d3 = this.d3;

    // init table
    var table = d3.select('#schedule-container').append('table').attr('class', 'table');

    // format data into nested arrays
    let stopsTable = route.trips.map(function(trip) {
      return trip.stops;
    });
    // create row for each element
    var tr = table.selectAll('tr')
                  .data(stopsTable).enter()
                  .append('tr');

    let self = this;
    // write cells
    var td = tr.selectAll('td')
                  .data(function(d) { return d; }) // connect all cells of each row to that row's data element
                  .enter()
                  .append('td')
                  .html(function(d) { return self.timeFormat(d.time); });

    // collect (ordered) stops used by chosen route
    var routeStops: any[] = this.route.stopSequence.map(
      function(num) {
        return STOPS.find(function(stop) { return stop.id == num; });
      });


    // populate data for column headers
    var columns = [];
    routeStops.forEach(function(stop, i) {
      columns.push({
        text: stop.name,
        htmlClass: 'num'
      });
    });
    // write table header with column data
    table.append('thead').append('tr')
         .selectAll('th')
         .data(columns).enter()
         .append('th')
         .attr('class', function(d) { return d.htmlClass; })
         .text(function(d) { return d.text; });

    // register nodes to listen to mouseover for table cells
    td.on('mouseover', function(d) {
      d3.select('#node-' + d.stopId)
        .classed('node-highlighted', true);
      d3.select('#time-selected').text(self.timeFormat(d.time));
    }).on('mouseout', function(d) {
      d3.select('#node-' + d.stopId)
        .classed('node-highlighted', false);
      d3.select('#time-selected').text('');
    });
  }

  drawMap(graphNodes, scale) {
    var d3 = this.d3;

    var svgContainer = d3.select('#route-map').append('svg')
      .attr('class', 'svg-bordered')
      .attr('width', this.mapWidth)
      .attr('height', this.mapHeight);

    graphNodes.forEach((node) => {
      this.drawNode(svgContainer, node, scale);
      node.children.forEach((childId) => {
        let childNode = graphNodes.find((child) => child.stopId == childId);
        if (childNode) {  // test that child was successfully found
          let coords = {
            x1: node.x,
            y1: node.y,
            x2: childNode.x,
            y2: childNode.y
          };
          // draw line from node to its child
          this.drawLine(svgContainer, coords, scale);
        }
      });
    });

    // color stops exclusive to Purple line
    var purpleStops = STOPS.filter((stop) => stop.color == 'purple');
    var purpleNodeIds = purpleStops.map((stop) => '#node-' + stop.id);
    purpleNodeIds.forEach((nodeId) => {
      d3.select(nodeId).attr('class', 'network-node node-purple');
    });

    // color stops exclusive to Red line
    var redStops = STOPS.filter((stop) => stop.color == 'red');
    var redNodeIds = redStops.map((stop) => '#node-' + stop.id);
    redNodeIds.forEach((nodeId) => {
      d3.select(nodeId).attr('class', 'network-node node-red');
    });
  }

  establishScale(graphNodes, scale) {
    var xValues = graphNodes.map((el) => el.x);
    var xMax = Math.max.apply(null, graphNodes.map((el) => el.x));
    var yMax = Math.max.apply(null, graphNodes.map((el) => el.y));

    this.mapWidth = (xMax + 1) * scale;
    this.mapHeight = (yMax + 1) * scale;
  }

  drawNode(svg, node, scale) {
    return svg.append('circle').attr('class', 'network-node').attr('id', 'node-' + node.stopId)
              .attr('cx', node.x * scale)
              .attr('cy', node.y * scale)
              .attr('r', 5);
  }

  drawLine(svg, coordinates, scale) {
    return svg.append('line')
              .attr('x1', coordinates.x1 * scale)
              .attr('y1', coordinates.y1 * scale)
              .attr('x2', coordinates.x2 * scale)
              .attr('y2', coordinates.y2 * scale)
              .attr('class', 'network-line');
  }

  timeFormat(time: Date): string {
    let format: string = '';
    let hours = time.getHours();
    let minutes = time.getMinutes();

    // add leading zero
    if (hours < 10) {
      format += '0';
    }

    format += hours + ':' + (minutes < 10 ? '0' : '') + minutes;

    return format;
  }
}
