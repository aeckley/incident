# Summary

This application can upload an incident JSON file, display the location of the incident and metadata including the weather at the time of the incident. I spent approximately 8 hours on this project, including several breaks.

## Installation

To Install this app:

- Install the latest LTS release of node.js
- Install the latest Angular CLI
  ```console
  user@yourcomputer: ~$ npm install -g @angular/cli
  ```
- Clone this repo to your desired location
- Run npm install in the root of the download source
  ```console
  user@yourcomputer: ~$ npm install
  ```
- Run ng serve
  ```console
  user@yourcomputer: ~$ ng serve
  ```
- Navigate to http://localhost:4200 in your browser

## How to use the app

Click the "Choose incident to upload" button to upload a JSON file that contains the incident (this file needs to be in the exact format as what was supplied in the project instructions zip file). Once you see a marker on the map, the user can click the marker to view a subset of the metadata. To try a different file click the "Cancel" button at the top, and then re-upload a different file via the "Choose incident to upload" button.

## Example

![ScreenShot](https://github.com/aeckley/incident/blob/0668c58bc374c1b9e72a997395db3d567e25017d/example.png "Example Picture")

## Production Build

In a production build, I would apply API keys in a config or in environmental variables. Additionally, unit tests would be written to validate core functionality and solve for different potential variables that could arise in the JSON file. A login page would also be added as well seperating key features into modules. I would have also forced all observables to unsubscribe when leaving the page. Technically, the http library in Angular should automatically destroy all API calls.
