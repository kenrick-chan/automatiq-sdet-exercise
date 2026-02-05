# automatiq-sdet-exercise

## How to run
1. On the repo page, click on the 'Actions' tab
2. Under the Actions sidebar, look for the 'Manual workflow' job and click
3. Once you're taken to the Manual workflow job page, in the table there is a dropdown to 'Run workflow'. Click that
4. Use: 
    a. Use workflow from: `branch: main`
    b. Google API Key: `your-google-api-key`
    c. Enter City: `city-of-your-choice` (not tested to use a city outside of the US nor invalid inputs)
5. Click 'Run workflow' to create the job and run the Github action
6. Refresh the page the get the new job to show up
7. Click on the job to view the run
8. Expand `Run k6` task
9. City, Lat, and Lng is console.log()'d above the TOTAL RESULTS line

## Checklist of tasks:
- [x] Create a basic k6 API Testing Framework in Typescript
- [x] Create a test named sdet_geocode_api_test.ts
- [x] Create a GitHub README that explains how to execute the test
- [x] Write the code to make the test interact with the Google Geocode API: https://maps.googleapis.com/maps/api/geocode/json
- [x] The test must interact with the GET HTTP request method
- [x] Enable the test to retrieve the Geocode longitude and latitude for any specified city, for example: Los Angeles
- [x] Use a k6 check to determine that the request responded with a 200 result status
- [x] Extract the longitude and latitude data from the response
- [x] Print the results in the following example format: City: Los Angeles Longitude: -118.2436849 Latitude: 34.0522342
- [x] Utilize k6 scenario's to make the test run for 1 iteration on 1 vu
- [x] Create a GitHub workflow_dispatch Action to execute the test, with prompts for a Google Geocode API auth token as well as a city to get the coordinates of
- [x] Your newly created test should be able to be ran locally as well as through the created GitHub Action
- [x] Create a public GitHub repository named automatiq-sdet-exercise and push your newly created framework to the repository
- [x] Once finished, email your GitHub repository link to your recruiter
- [x] Sit back, relax, and have a great day! We will review your exercise and respond with our feedback and potential nextsteps as soon as we possibly can!

