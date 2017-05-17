# Vismot

#### Capstone project for Epicodus, 05.17.2017

#### By _**Patrick McGreevy**_

## Description
This project features data visualization of transit train schedules. The web application was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.1. D3 is used to parse and display the data in interactive ways.

## Setup
1. Set project root as working directory in CLI after cloning repo.
2. Run `$ npm install`.
3. Run `$ bower install`.
4. Run `$ ng build`.
5. Run `$ ng serve`.
6. Visit **`localhost:4200`**  in web browser.


## Project creation

* `$ ng new vismot`
* `$ cd vismot`
* `$ ng g c home`
* `$ bower init`
* `$ bower install bootstrap --save`


## Technologies Used

* TypeScript
* Angular
* D3
* npm
* Bower
* JSON
* Bootstrap


## Specs/Agenda
* Display programmatically table of stop times for [LA Metro's](https://www.metro.net/) westbound **Purple Line**.
* Draw conceptual route path of line with corresponding station highlighted when data element in table is moused-over.
* Create [Marey diagram](https://sphysics.wordpress.com/11-u-physics/kinematics/paris-lyon-1885-train-schedule/) for schedule.
* Improve animation based on mouse-over along time axis on diagram.
* Add additional lines, in order: Red, Gold, Expo, Green, Blue.
* Create filter controls for which lines, directions, and day of week for display.
* Add pages for other transit systems, incorporating their [GTFS](https://developers.google.com/transit/gtfs/) as the raw datasets.

## Known Bugs

_No known bugs._


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.


## Support

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

_Please contact patrick7490@icloud.com with questions or concerns._


### License

*MIT License*

Copyright (c) 2017 _**Patrick McGreevy**_
