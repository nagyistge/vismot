import { Component, OnInit } from '@angular/core';
import { D3Service, D3, Selection, ScaleLinear, Axis } from 'd3-ng2-service';

// Data
import { STOPS, PURPLE_LINE, STOP_TIMES, SCHEDULE_TITLE, NETWORK } from '../data';

// Sample data for proof of concept
const SAMPLE_DATA =
[
  { stopId: 1, time: '00:31' },
  { stopId: 2, time: '00:33' },
  { stopId: 3, time: '00:34' },
  { stopId: 4, time: '00:36' },
  { stopId: 5, time: '00:38' },
  { stopId: 6, time: '00:40' },
  { stopId: 7, time: '00:42' },
  { stopId: 8, time: '00:44' }
];

@Component({
  selector: 'app-marey',
  templateUrl: './marey.component.html',
  styleUrls: ['./marey.component.css']
})
export class MareyComponent implements OnInit {
  private d3: D3; // <-- Define the private member which will hold the d3 reference
  private diagramWidth: number = 500;
  private diagramHeight: number = 500;
  private stopValues: any[];
  private data: any[];

  constructor(d3Service: D3Service) {
     this.d3 = d3Service.getD3(); // obtain the d3 object from the D3 Service
  }

  ngOnInit() {
    this.parseData(PURPLE_LINE);
    this.drawDiagram();
  }

  drawDiagram() {
    var d3 = this.d3;

    // add SVG to page
    var mareySVG = d3.select('#marey').append('svg')
                                      .attr('class', 'svg-bordered')
                                      .attr('width', this.diagramWidth)
                                      .attr('height', this.diagramHeight);

    let stopsScale = d3.scaleLinear()
                       .domain([0, 9])
                       .range([0, this.diagramWidth]);

    let timeScale = d3.scaleTime()
                      .domain([new Date(2000, 0, 1, 0, 0), new Date(2000, 0, 1, 1, 0)]) // give the domain of Saturday Jan 1, 2000 from midnight to 1AM
                      .range([0, this.diagramHeight]);

    let circles = mareySVG.selectAll('.marey-point')
                          .data(this.data).enter()
                          .append('circle')
                          .attr('class', 'marey-point')
                          .attr('cx', function(d) { return stopsScale(d.x); })
                          .attr('cy', function(d) { return timeScale(d.time); })
                          .attr('r', 3);

  }

  parseData(lineSequence) {
    this.stopValues = lineSequence.map(function(el) {
      return STOPS.find(function(stop) {
        return stop.id == el; 
      });
    });

    let self = this;
    this.data = SAMPLE_DATA.map(function(el) {
      return {
        x: el.stopId,
        time: self.parseTime(el.time)
      };
    });
  }

  parseTime(timeString: string) {
    let hours: number;
    let minutes: number;

    let re = /([0-9]+):([0-9]+)/;
    let match = re.exec(timeString);
    hours = parseInt(match[1]);
    minutes = parseInt(match[2]);

    return new Date(2000, 0, 1, hours, minutes);

  }

}
