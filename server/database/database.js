const fs = require("fs");

//loads csv files or file by providing 1 region

const getData = (region) => new Promise((resolve, reject) => {
  fs.readFile(`./csv/${region}videos.csv`, "utf8", (err, data) => {
    if (err) return reject(err);
    return resolve(parseData(err, data));
  }
  );
});

const parseData = (err, data) => {
  finalArr = { videos: [] };
  if (err) {
    console.log(err);
    return;
  }
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

  let num_comments = 0;
  let num_likes = 0;
  let num_dislikes = 0;
  let num_views = 0;

  let video_count = 0;

  for (let i = 0; i < entries.length; i++) {
    if (entries[i][0].length < 1) continue;
    entries[i].forEach((item, index) => {
      values[`${properties[index]}`] = item;
      if (typeof (values.publish_time) == 'string' && typeof (values.trending_date) == 'string' && typeof (values.comment_count) == 'string' &&
          typeof (values.likes) == 'string' && typeof (values.dislikes) == 'string' && typeof (values.views) == 'string') {
        values.pub_date = values.publish_time.split(/[-:T.]/);
        values.pub_date = values.pub_date.splice(0, 3);
        values.pub_date = array_move(values.pub_date, -3, -1);
        values.pub_date = values.pub_date.join('/');

        values.pub_time = values.publish_time.split(/[-:T.]/);
        values.pub_time.splice(0, 3);
        values.pub_time.splice(2,);
        values.pub_time = values.pub_time.join(':');

        values.trend_date = '20' + values.trending_date
        values.trend_date = values.trend_date.split(/[.]/);
        values.trend_date = array_move(values.trend_date, -3, -1);
        values.trend_date = array_move(values.trend_date, -2, -3);
        values.trend_date = values.trend_date.join('/');

        var p_date = new Date(values.pub_date);
        var t_date = new Date(values.trend_date);
        values.pub_to_trend = (Math.abs(p_date.getTime() - t_date.getTime())) / (1000 * 3600 * 24)
        values.pub_to_trend = values.pub_to_trend.toString();

        values.pub_date = values.pub_date.split('/').join('-')
        values.trend_date = values.trend_date.split('/').join('-')

        num_comments = num_comments + parseInt(values.comment_count)
        num_likes = num_likes + parseInt(values.likes)
        num_dislikes = num_dislikes + parseInt(values.dislikes)
        num_views = num_views + parseInt(values.views)

        video_count = video_count + 1
      }

      else {
        values.pub_date = null;
        values.pub_time = null;
        values.trend_date = null;
        values.pub_to_trend = null;
      }

      values.views_to_likes = Math.floor(values.views / values.likes).toString(); // rounded to floor
    });

    finalArr.avg_comments =  Math.floor(num_comments / video_count).toString(); // rounded to floor
    finalArr.avg_likes = Math.floor(num_likes / video_count).toString(); // rounded to floor
    finalArr.avg_dislikes = Math.floor(num_dislikes / video_count).toString(); // rounded to floor
    finalArr.avg_views = Math.floor(num_views / video_count).toString(); // rounded to floor
    finalArr.num_videos = video_count;

    finalArr.videos.push(values);
    values = {};
  }
  return finalArr;
};
module.exports = { getData };
