const express = require('express');
const csvParser = require('csv-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 

app.get('/api/fetch-data', (req, res) => {
  const { startDate, endDate } = req.query;
  let startDateTimestamp = getPreviousDayTimestamp();
  let endDateTimestamp = new Date().toISOString();

  if (startDate) {
    startDateTimestamp = new Date(startDate).toISOString();
  }

  if (endDate) {
    endDateTimestamp = new Date(endDate).toISOString();
  }
  const data = [];
  fs.createReadStream('./data/demoPumpDayData.csv')
    .pipe(csvParser())
    .on('data', (row) => {
      const fromts = new Date(parseFloat(row.fromts)).toISOString();
      const tots = new Date(parseFloat(row.tots)).toISOString();
      row.metrics = JSON.parse(row.metrics);
      row.metrics.Psum.avgvalue = parseFloat(row.metrics.Psum.avgvalue);
      if (fromts >= startDateTimestamp && tots <= endDateTimestamp) {
        row.fromts = fromts;
        row.tots = tots;
        data.push(row);
      }
    })
    .on('end', () => {
      data.sort((a, b) => b.metrics.Psum.avgvalue - a.metrics.Psum.avgvalue);

      const top10PsumValues = data.slice(0, 10);
      const operatingLoad = top10PsumValues.reduce((acc, cur) => acc + cur.metrics.Psum.avgvalue, 0) / (top10PsumValues.length || 1);

      data.forEach(row => {
        row.operatingLoad = operatingLoad;
      });

      res.json(data);
    })
    .on('error', (error) => {
      console.error('Error reading CSV file:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function getPreviousDayTimestamp() {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString();
}
