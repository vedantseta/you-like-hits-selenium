# we like hits
youlikehits, so do I. This project will automate your manual stuff of running youlikehits.com 

## Important

Change 
[`YOUR_USER_NAME_HERE`](https://github.com/vedantseta/you-like-hits-selenium/blob/db80f0a6922dab4c9e58cb6b21fa01af6ecad190/index.js#L9) & 
[`YOUR_PASSWORD_HERE`](https://github.com/vedantseta/you-like-hits-selenium/blob/db80f0a6922dab4c9e58cb6b21fa01af6ecad190/index.js#L10) text to your youlikehits username and password respectively.

### Setup

```sh
$ npm install
```

You need latest [Chrome Driver](https://sites.google.com/a/chromium.org/chromedriver/downloads) which you have to place in current project folder for linux and mac platforms. Windows user can confirm the installation and update the README for others to help.  


### Run

```sh
$ node index.js
```

## Deploy this project on Heroku

- Add this in buildpack `https://github.com/stomita/heroku-buildpack-phantomjs`
- Add your username & password as specified above
- Change [chrome](https://github.com/vedantseta/you-like-hits-selenium/blob/4ec1532652feca1b250aa8391ad0d146bc014014/index.js#L5) to phantomjs

### Further Updates (Looking for Contribution)
- Headless Browser
- Windows support confirmation
