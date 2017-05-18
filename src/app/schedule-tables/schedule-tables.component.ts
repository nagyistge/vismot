import { Component, OnInit } from '@angular/core';
import { D3Service, D3, Selection, ScaleLinear, Axis } from 'd3-ng2-service';

// Data
import { STOPS, PURPLE_LINE, STOP_TIMES, SCHEDULE_TITLE } from '../data';

@Component({
  selector: 'app-schedule-tables',
  templateUrl: './schedule-tables.component.html',
  styleUrls: ['./schedule-tables.component.css']
})
export class ScheduleTablesComponent implements OnInit {
  private d3: D3; // <-- Define the private member which will hold the d3 reference
  private scheduleTitle: string;

  constructor(d3Service: D3Service) {
     this.d3 = d3Service.getD3(); // obtain the d3 object from the D3 Service
  }

  ngOnInit() {
    this.scheduleTitle = SCHEDULE_TITLE;
    this.drawTable();
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
    for (let i = 0; i < PURPLE_LINE.length; i++) {
      tr.append('td')
        .html(function(m) { return m[i]; });
    }

    // create column headers
    var columns = [];

    // collect stops used by Purple line
    var purpleLineStops: any[] = PURPLE_LINE.map(
      function(num) {
        return STOPS.find(function(stop) { return stop.id == num; });
      });
    // create table headers for Purple line
    purpleLineStops.forEach(function(stop, i) {
      columns.push({
        head: stop.name,
        cl: 'num',
        html: function (row) { return row[i]; }
      });
    });
    table.append('thead').append('tr')
         .selectAll('th')
         .data(columns).enter()
         .append('th')
         .attr('class', function(d) { return d.cl; })
         .text(function(d) { return d.head; });

  }
}
