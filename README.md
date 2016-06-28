![CF](https://i.imgur.com/7v5ASc8.png)  Lab 07: Functional Programming
=======
[![Build Status](https://travis-ci.org/codefellows-seattle-301d4/07-functional-programming.svg?branch=master)](https://travis-ci.org/codefellows-seattle-301d4/07-functional-programming) [![GitHub issues](https://img.shields.io/badge/Stuck%3F-Ask%20for%20Help!-orange.svg)](https://github.com/codefellows/seattle-301d7/issues/new)

## Firebase Tutorial!

### Steps

1. Log in to Google.
2. Navigate to https://console.firebase.google.com/
3. Setup a web project with a given name.
4. Install the command line tools (CLI) via `npm install -g firebase-tools`
5. `firebase login`
6. `firebase init` from root of project.
7. Leave both options selected for database and hosting.
8. Select 'your-project-name'
9. Select the default database file (database.rules.json)
10. Your public directory in this case should be 'starter-code'
11. Answer 'N' to Configure as a single-page app.
12. Do NOT overwrite your existing index.html - answer 'N'
13. cd into starter-code and `touch firebaseInit.js` 
14. Back to console.firebase.google.com, select your project name from the home page.
15. Now select the maroon-colored circle with the code block in it.
16. A modal pops up! Copy the first script tag and paste it within your vendor files at the bottom of your index.html
17. Copy the contents of the second script tag in this modal and paste the contents into the new firebaseInit.js file you created.
18. Reference this firebaseInit.js file underneath your first firebase script tag in index.html
19. Save all, and head back to the terminal.
19. Type `firebase deploy` and hit enter.
20. Once complete, head to the URL specified.
21. Append: ```js
// Get a reference to the database service
var database = firebase.database();
```
to your `firebaseInit.js` file
