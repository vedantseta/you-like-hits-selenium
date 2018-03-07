var webdriver = require("selenium-webdriver");
const { Builder, By, Key, until } = require("selenium-webdriver");
var request = require("sync-request");

var driver = new webdriver.Builder().forBrowser("chrome").build();

driver.get("https://youlikehits.com/");
driver.sleep(1000);
driver.findElement({ id: "username" }).sendKeys("YOUR_USER_NAME_HERE");
driver.findElement({ id: "password" }).sendKeys("YOUR_PASSWORD_HERE");
driver.findElement(By.css("input[value=Login]")).click();
driver.sleep(5000);

driver.get("https://youlikehits.com/youtubenew2.php").then(function() {
  CaptchaSolver();
  loop();
});

function loop() {
  driver
    .executeScript('return document.querySelector("a[class=followbutton]")')
    .then(function(elements) {
      if (elements !== null) {
        driver.findElement(By.css("a[class=followbutton]")).click();
        driver.sleep(63000);
      } else {
        CaptchaSolver();
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