const fs = require("fs");

let tempHolder = {};
let finalArr = [];

//loads csv files or file (can input an array or string)
const getData = (regions) => {
  if (typeof regions !== "string") {
    regions.forEach((region) => {
      fs.readFile(`./csv/${region}videos.csv`, "utf8", (err, data) =>
        finalArr.push(handleData(region, err, data))
      );
    });
  } else {
    fs.readFile(`./csv/${regions}videos.csv`, "utf8", (err, data) =>
      handleData(regions, err, data)
    );
  }
  return finalArr;
};

const handleData = (region, err, data) => {
  tempHolder[region] = [];
  if (err) {
    console.log(err);
    return;
  }
  console.log("Loading CSV data for", region, "...");
  const lines = data.split(/[\n\r]/);
  const entries = lines.map((line) => {
    if (line.indexOf('"') < 0) return line.split(",");
    let newLine = [],
      curr = "",
      quote = false;
    //if we have a quote parse through each line
    for (let i = 0; i < line.length; i++) {
      char = line[i];
      if (char == '"' && line[i + 1] == '"') {
        curr += char;
        i++;
      } else if (char == '"') {
        quote = !quote;
      } else if (!quote && char == ",") {
        newLine.push(curr);
        curr = "";
      } else {
        curr += char;
      }
      if (i == line.length - 1 && curr) {
        newLine.push(curr);
      }
    }
    return newLine;
  });
  const properties = entries[0];
  entries.splice(0, 1);
  // accumulate data in groups of known properties
  let values = {};

  // moving elements around inside the array, month and days are varied
  function array_move(arr, old_index, new_index) {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
  }

  for (let i = 0; i < entries.length; i++) {
    if (entries[i][0].length < 1) continue;
    entries[i].forEach((item, index) => {
      values[`${properties[index]}`] = item;
      values.trend_date = null;
      values.views_to_likes = null;
      values.pub_to_trend = null;
    });
    finalArr.push(values);
    values = {};
  }
  const tempHold = Object.entries(tempHolder[region]);
  for (let i = 0; i < tempHolder[region].length; i++) {
    //Go through each row
    const objToString = Object.entries(tempHold[i][1]); //convert the object elements into a smaller object to parse through
    for (let j = 0; j < 10; j++) {
      //go through each column
      const stringPush = objToString[j][0] + ": " + objToString[j][1]; //add each string into the temp string one by one
      finalArr[i][j] = stringPush; //push the temp string into the array
    }
    // view to likes
    const numViews = finalArr[i][6].split(": ");
    const numLikes = finalArr[i][7].split(": ");
    const viewToLike =
      "views_to_likes: " +
      Math.floor(parseInt(numViews[1]) / parseInt(numLikes[1])); // rounded to floor
    finalArr[i].push(viewToLike);
    // publish time to trending date
    let trendDate = finalArr[i][1].split(/[: .]/);
    trendDate = array_move(trendDate, -1, -2);
    trendDate = array_move(trendDate, -3, -1);
    trendDate.splice(0, 2);
    trendDate[2] = "20" + trendDate[2];
    trendDate = trendDate.join("/");
    const newTrendDate = "trend_date: " + trendDate;
    finalArr[i].trend_date = newTrendDate;

    // keep a copy before writing over it
    let all_pub_time = finalArr[i][5].split(/[:T.]/);

    let pubTime = finalArr[i][5].split(/[:T.]/);
    pubTime.splice(0, 2);
    pubTime.pop();
    pubTime = pubTime.join(":");
    const actualPubTime = "pub_time: " + pubTime;
    finalArr[i].splice(5, 1, actualPubTime);

    let pubDate = all_pub_time;
    pubDate.splice(2, 5);
    pubDate.shift();
    pubDate = pubDate.toString().slice(1);
    pubDate = pubDate.split("-");
    pubDate = array_move(pubDate, -3, -1);
    pubDate = pubDate.join("/");
    const actualPubDate = "pub_date: " + pubDate;
    finalArr[i].pub_date = actualPubDate;

    let realPubDate = new Date(pubDate);
    let realTrendDate = new Date(trendDate);
    var pub_to_trend =
      "pub_to_trend: " +
      Math.abs(realPubDate - realTrendDate) / (1000 * 3600 * 24);
    finalArr[i].pub_to_trend = pub_to_trend;
  }
  return finalArr;
};

module.exports = { getData };
