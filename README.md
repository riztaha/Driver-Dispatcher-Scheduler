## Visit the project at: https://driver-scheduler.herokuapp.com/
## Created by: Taha Rizvi

<b>Directions:</b> <br />
<b>Navigate Calendar:</b> Scroll left/right, Zoom in/out, or Click Date.<br />
<b>Edit Event Duration/Time/Driver:</b> Click on Event and Drag as desired.<br />
<b>Edit Event Title/Description:</b> Double-Click on Event, make desired changes, unhighlight Event.<br />
<b>Overwrite Event:</b> Create a new Event which overlaps the Time/Driver event.<br />
<b>Delete Event:</b> Right-Click on Event.<br />
 
Minor Bug present: An event can currently be clashed with another item if it is dragged over. Overwrite popup appears only when manually entering a new event.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


To learn React, check out the [React documentation](https://reactjs.org/).

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment


### The Challenge:
In logistics, a dispatcher is someone who is responsible for organizing the movement of resources and personnel. In trucking, a dispatcher oversees the tasks that drivers should complete.
As a dispatcher, I need a basic application to manage the tasks of my drivers to keep my organization running smoothly and my customers happy! This means keeping track of ​where, when and what​ my drivers will be doing.
For this exercise, we’ll assume that drivers can have three types of tasks:
- Pickup​: Where and when the driver picks something up
- Dropoff​: Where and when the driver drops something off
- Other​: Where and when the driver does some other task (like grab a lunch or coffee)
Problem specifications
Part A: Dispatcher/Driver Task Scheduling App
Implement an application view where a ​single​ dispatcher can manage the tasks of ​multiple drivers
1. As a dispatcher, I should be able to ​create​ new tasks for a specified driver over a ​24 hour / 7 day / 52 week period. For simplicity, we recommend adhering to this discrete timescale - you don’t need to worry about minutes, months or years!
2. A task’s time-interval should be between 1-24 hours, but it should not extend across multiple days.
1
3. If a new task conflicts with existing task times, the application should give me the option to overwrite the existing conflicting task(s).
4. I should be able to​ update​ existing tasks’ t​imes, descriptions and locations​. If the new time of an updated task conflicts with existing tasks, the application should give me the option to delete the conflicting task(s).
5. I should be able to ​delete​ tasks.
6. Assume there are only 3 drivers and the timetable will be different for each driver. The
dispatcher should be able to select a driver via a dropdown to view their timetable.
<br /> Part B: Driver Task Spreadsheet Report
7. As a dispatcher, I want to be able to download a .csv file outlining a specific driver’s tasks for a given division of time. The valid divisions for which I can generate a driver report are ​2,4,7,14, and 28 days​.
8. If I were to generate a .csv for a certain driver with a selected time-range of 2 days, I would expect to see something like the following table if I were to open the .csv in a spreadsheet program.
This report would show that for the first 2 days of the “year” (remember, we don’t expect multiple years, just a 52 week period), the specified driver had 2 pickups, 2 drop-offs and 1 other task.
