const db = require('../models');

module.exports = function (app) {
  app.get('/view-wishes', (req, res) => {
    db.Wish.findAll().then((data) => {
      const hbsObject = {
        wishes: data.map((val) => {
          currentObj = val.dataValues;
          currentObj.item = JSON.parse(currentObj.item);
          if (currentObj.item.length == 0) {
            currentObj.item.push('What do I want...???');
          }

          return currentObj;
        }),
      };
      console.log(hbsObject);
      res.render('view-wishlist', hbsObject);
    });
  });

  app.post('/api/wishlist', (req, res) => {
    db.Wish.create({
      wish_name: req.body.wishName,
      item: req.body.item,
    }).then(() => {
      res.json({ success: true });
    });
  });

  app.get('/api/wishlist/:id', (req, res) => {
    db.Wish.findOne({
      where: {
        id: req.params.id,
      },
    }).then((data) => {
      console.log(data);
      const hbsObject = {
        wish: data.dataValues,
      };
      res.render('wishlist', hbsObject);
      console.log(data);
    });
  });

  app.put('/api/wishlist/', (req, res) => {
    // console.log(body);
    console.log(req.body);
    db.Wish.update({
      // wish_name: req.body.wishName,
      item: req.body.item,
    },
    {
      where: {
        id: req.body.id,
      },
    }).then(() => {
      res.json({ success: true });
    });
  });
};