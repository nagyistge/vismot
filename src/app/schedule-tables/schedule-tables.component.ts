import { Component, OnInit } from '@angular/core';
import { D3Service, D3, Selection, ScaleLinear, Axis } from 'd3-ng2-service';

// Data
import { STOPS, PURPLE_LINE, STOP_TIMES, SCHEDULE_TITLE, NETWORK } from '../data';

@Component({
  selector: 'app-schedule-tables',
  templateUrl: './schedule-tables.component.html',
  styleUrls: ['./schedule-tables.component.css']
})
export class ScheduleTablesComponent implements OnInit {
  private d3: D3; // <-- Define the private member which will hold the d3 reference
  private scheduleTitle: string;
  private route;
  private mapWidth: number;
  private mapHeight: number;

  constructor(d3Service: D3Service) {
     this.d3 = d3Service.getD3(); // obtain the d3 object from the D3 Service
  }

  ngOnInit() {
    this.scheduleTitle = SCHEDULE_TITLE;
    this.route = PURPLE_LINE;
    this.drawTable();
    this.establishScale(NETWORK, 50);
    this.drawMap(NETWORK, 50);
  }

  drawTable() {
    var d3 = this.d3;

    // init table
    var table = d3.select('#schedule-container').append('table').attr('class', 'table');

    // create row for each element
    var tr = table.selectAll('tr')
                  .data(STOP_TIMES).enter()
                  .append('tr');

    // write cells
    var td = tr.selectAll('td')
                  .data(function(d) { return d; }) // connect all cells of each row to that row's data element
                  .enter()
                  .append('td')
                  .html(function(d) { return d.time; });

    // collect (ordered) stops used by chosen route
    var routeStops: any[] = this.route.map(
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

  }

  drawMap(graphNodes, scale) {
    var d3 = this.d3;

    var svgContainer = d3.select('#route-map').append('svg')
      .attr('class', 'svg-bordered')
      .attr('width', this.mapWidth)
      .attr('height', this.mapHeight);

    var self = this;
    graphNodes.forEach(function(node) {
      self.drawNode(svgContainer, node, scale);
      node.children.forEach(function(childId) {
        let childNode = graphNodes.find(function(child) { return child.stopId == childId; });
        if (childNode) {  // test that child successfully found
          let coords = {
            x1: node.x,
            y1: node.y,
            x2: childNode.x,
            y2: childNode.y
          };
          // draw line from node to its child
          self.drawLine(svgContainer, coords, scale);
        }
      });
    });

    // color stops exclusive to Purple line
    var purpleStops = STOPS.filter(function(stop) { return stop.color == 'purple'; });
    var purpleNodeIds = purpleStops.map(function(stop) { return '#node-' + stop.id; });
    purpleNodeIds.forEach(function(nodeId) {
      d3.select(nodeId).attr('class', 'network-node node-purple');
    });

    // color stops exclusive to Red line
    var redStops = STOPS.filter(function(stop) { return stop.color == 'red'; });
    var redNodeIds = redStops.map(function(stop) { return '#node-' + stop.id; });
    redNodeIds.forEach(function(nodeId) {
      d3.select(nodeId).attr('class', 'network-node node-red');
    });
  }

  establishScale(graphNodes, scale) {
    var xValues = graphNodes.map(function(el) { return el.x; });
    var xMax = Math.max.apply(null, graphNodes.map(function(el) { return el.x; }));
    var yMax = Math.max.apply(null, graphNodes.map(function(el) { return el.y; }));

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
}
