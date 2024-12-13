const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs')
const port = 3000;
const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.use(express.urlencoded({ extended: true }));
// This is required to handle urlencoded data
app.use(express.json()); 
// This to handle jsoan data coming from requests mainly post1

// app.get('/', (req, res) => {
//   res.status(200).send('Hello From server side anjay');
// });
// app.post('/', (req, res) => {
//     res.send('u cann also use method post!')
// })

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});


app.post('/api/v1/tours', (req, res) => {
  console.log(req.body)

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
            tour: newTour,
        },
      }); 
    }
  );
});

app.get('/api/v1/tours/:id', (req, res) => {


  console.log(req.params, '***ini params')
  const newId = req.params.id * 1

  const tour = tours.find((el) => el?.id === newId )

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
})

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
