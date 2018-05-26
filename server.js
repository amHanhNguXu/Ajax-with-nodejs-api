const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var products = [
   {
      id: 1,
      name: 'laptop'
   }, 
   {
      id: 2,
      name: 'microware'
   }
];

var currentId = 2;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/products', (req, res) => {
   res.send({ products: products });
});

app.post('/products', (req, res) => {
   var productName = req.body.name;
   currentId++;

   products.push({
      id: currentId,
      name: productName
   });

   res.send('Successfully created product');
});


app.put('/products/:id', (req, res) => {
   var id = req.params.id;
   var newName = req.body.newName;

   var found = false;

   products.forEach((product, index) => {
      if (!found && product.id === Number(id)) {
         product.name = newName;
      }
   })

   res.send('Successfully updated product');
});

app.delete('/products/:id', (req, res) => {
   var id = req.params.id;

   var found = false;

   products.forEach((product, index) => {
      if (!found && product.id === Number(id)) {
         products.splice(index, 1);
      }
   });

   res.send('Successfully delete product');
})

app.listen('3333', () => {
   console.log('server listening on port 3333');
})