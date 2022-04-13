const fs = require("fs");

const tempHolder = {};

//loads csv files or file (can input an array or string)
const getData = (regions) => {
  if (typeof regions !== "string") {
    regions.forEach((region) => {
      fs.readFile(`./csv/${region}videos.csv`, "utf8", (err, data) =>
        handleData(region, err, data)
      );
    });
  } else {
    fs.readFile(`./csv/${region}videos.csv`, "utf8", (err, data) =>
      handleData(regions, err, data)
    );
  }
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
  for (let i = 0; i < entries.length; i++) {
    if (entries[i][0].length < 1) continue;
    entries[i].forEach((item, index) => {
      values[`${properties[index]}`] = item;
    });
    tempHolder[region].push(values);
    values = {};
  }
  console.log(tempHolder);
};

module.exports = { getData, tempHolder };

