# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Unit #4 Project: MERN Stack
# ingredients scanner

https://ingredients-check.herokuapp.com

** A mobile responsive web app that will scan an image of ingredients list and identify anything found on a watch list that is maintained by the user **

* Users can register and login

<a href="https://imgur.com/06Mt9Td"><img src="https://i.imgur.com/06Mt9Td.png" title="source: imgur.com" /></a>

* Users can edit a watch list of ingredient items they wish to be searched form
* Users can take a photo or upload an existing photo image file of a list of ingredient to be scanned

<a href="https://imgur.com/XCYlr2P"><img src="https://i.imgur.com/XCYlr2P.png" title="source: imgur.com" /></a>

* The AWS rekognition API is then used to find and display all the words found in the image file
* Any matches are then identified and a warning is shown on the screen and audio warning is played

<a href="https://imgur.com/bt5LBOX"><img src="https://i.imgur.com/bt5LBOX.png" title="source: imgur.com" /></a>

* The scanning technology depends on the API and the quality of the picture
* run 'yarn test:client' and 'yarn test:server' to run tests
* run 'yarn start:client' and 'yarn start:server' to run the front and backend components on ports 8000 and 4000 respectively
---

### Technical Requirements

* **Build a full-stack application** by making your own backend and your own front-end
* **Use an Express API** to serve your data from a Mongo database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers.
* **Be deployed online** so it's publicly accessible.
* **Have automated tests** for _at least_ one RESTful resource on the back-end, and _at least_ one classical and one functional component on the front-end. Improve your employability by demonstrating a good understanding of testing principals.

---

### Necessary Deliverables

* A **working app** hosted on the internet
* A **link to your hosted working app** in the URL section of your Github repo
* A **git repository hosted on Github**, with a link to your hosted project, and frequent commits dating back to the _very beginning_ of the project
