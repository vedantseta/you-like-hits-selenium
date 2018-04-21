var webdriver = require("selenium-webdriver");
const { Builder, By, Key, until } = require("selenium-webdriver");
var request = require("sync-request");
const userName = process.env.userName;
const  password = process.env.password;

console.log("Process started with " + userName + " " + password);
var driver = new webdriver.Builder().forBrowser("phantomjs").build();
var hits = 0;
setTimeout(function(){driver.quit();console.log("Exists after 30 mins");throw new Error('exists after 30 mins');},2500000);


driver.get("https://youlikehits.com/");
driver.sleep(30000);
try {
	driver.findElement({ id: "username" }).sendKeys(userName);
	driver.findElement({ id: "password" }).sendKeys(password);
	driver.findElement(By.css("input[value=Login]")).click();
	driver.sleep(15000).then(function(){
		driver.get("https://youlikehits.com/stats.php");
		driver.sleep(10000);
		hits = driver.findElement(By.css("#bodybg > table.mainbodyloggedin > tbody > tr > td > table:nth-child(1) > tbody > tr > td > table > tbody > tr > td > table:nth-child(6) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > center > font")).getText();
		hits.then(function(text){
			if(parseInt(text) > 100) {
				driver.sleep(3600000)
			
			}
		);
	});
} catch(e) {
	console.log(e);
	console.log("Cannot do anything");
}


function start() {
try {
var counter = 0;
driver.get("https://youlikehits.com/youtubenew2.php").then(function() {
  CaptchaSolver();
  loop();
});
} catch(e) {
console.log(e);
 console.log("Can do nothing");
}
}
function loop() {
  driver
    .executeScript('return document.querySelector("a[class=followbutton]")')
    .then(function(elements) {
	console.log(elements);
      if (elements !== null) {
        driver.findElement(By.css("a[class=followbutton]")).click();
		console.log(counter + "Video view started ...waiting 63 sec");
		driver.sleep(65000);
		counter++;		
		console.log("Video watched");		
      } else {
	counter++;
	console.log("Captcha solver");
        CaptchaSolver();
      }
      if(counter == 35) {
	driver.quit();
	throw new Error('after 35 counter');
	}	
      loop();
    });
}

async function CaptchaSolver() {
  driver.executeScript("return document.cookie").then(function(cookies) {
    var answer = 0;
    while (answer <= 81) {
      console.log(answer);
      try {
        var res = request("POST", "https://youlikehits.com/youtubenew2.php", {
          headers: {
            Cookie: cookies,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: "answer=" + answer + "&submit=Submit"
        });
        var body = res.getBody("utf8");
      } catch (e) {
        console.log(e);
      }

      if (
        body.indexOf("Failed. You did not successfully solve the problem.") ===
        -1
      ) {
        driver.get("https://youlikehits.com/youtubenew2.php");
        return true;
        break;
      }
      answer++;
    }
  });
}
