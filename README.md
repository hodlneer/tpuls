# Installation
1. Use `git clone` to pull down the project code. Navigate to project root folder
2. Start the lando services and build the containers:
   `lando start`
   
   It may take serveral seconds during the phase "Scanning to determine which services are ready.."
Lando successfully started once you see the APPSERVER URLS in green.

3. Execute lando to create the Docker containers and install node modules:
   `lando npm install`
4. Execute gulp to compile the sass and build html files to /dist folder:
   `lando gulp build`
   
## Rebuilding Lando
If there are changes made to settings in .lando.yml, or if the container seems to be running wonky, you can execute a `lando rebuild` which rebuilds the containers but does not lose any content

## Stopping Lando
To just stop this container, use `lando stop`
To stop both the container and Docker, use `lando poweroff`

*generally, execute `lando poweroff` before shutting down computer

# Building Files
## Using Gulp
`lando gulp`  
Execute `lando gulp` will start a running process in background to watch and compile changes in files.  If you save a file with error, it won't compile correctly and error message would show in terminal.  Use ctrl+c to stop the running process.
  
`lando gulp css`  
Runs process to compile scss files
  
`lando gulp compile`  
Runs process to compile handlebar and html files
  
`lando gulp build`  
Runs process to both compile scss and handlebar/html files

# File Structure and Setup
Setup using:  
  - Bootstrap 5.2.0  
  - jQuery 3.2.0  
  
  (note: jQuery added but Bootstrap 5.2.0 does not require jQuery. Need to confirm versions with TravelPulse Dev)
  
  Template files are based on Handlebars.js and JSON files populate content of page and the reusable components.
- All template files should be saved as handlebar files (.hbs).  NOTE: template files don't have to include handlebar synatax; they can be straight HTML that will be inserted into the other files

## Directory Structure
The directories are setup in a hierarchy to define the order that SASS files get compiled:
1. **00-base**  
   Base styling goes here  
   
2. **01-elements**  
   Sytling for standard elements.  For example, styling for `<h1>`, `<h2>`, or `<ul>`  
   
3. **02-components**  
   Each directory represents a component.  It should include a .hbs template and the styling that's specific for component  
   
4. **03-sections**  
   Page sections and regions templates and its styling  
   
5. **04-content**  
   Page-specific styling  
   
6. **05-pages**  
   Each directory represents a page.  Use same name for html template and json file.  The JSON data is used to populate the content/copy for page and its components
