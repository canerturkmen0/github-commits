# GitHub Commits :octocat:

## How to run

In the project directory, you should run:

### `npm install`

Installs the dependencies.

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Choices and Additional Features
- React as the JS library with hooks
- AntD as the CSS library, some styles overridden with inline styles have used due to there are not too many overridden
- Loading animations have implemented
- Commits of any public repo from an owner can be searched
- Local storage has implemented for some requests. One of the examples, if you are on the 990th page of React repo of Facebook after you close the browser then if you re-open it and search for the Facebook React, you'll directly go to the same page and it won't send a request to fetch the commits in that page again.


## What can be improved

- Implement React memo to prevent unnecessary re-renders.
- Instead of defining fetch functions in the useEffect, define a useFetch hook to manage response, data, and error from a common hook and to make more maintainable and readable code.