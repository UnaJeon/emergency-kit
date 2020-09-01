require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "productId", "name", "price", "image", "shortDescription"
  from "products"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = Number(req.params.productId);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: '"gradeId" must be a positive integer'
    });
  }
  const sql = `
  select *
  from "products"
  where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        next(new ClientError(`cannot find with "productId" with ${productId}`, 404));
      } else {
        res.json(product);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  const cartId = req.session.cartId;
  if (!req.session.cartId) {
    return res.json([]);
  } else {
    const sql = `
  select "c"."cartItemId",
       "c"."price",
       "p"."productId",
       "p"."image",
       "p"."name",
       "p"."shortDescription"
  from "cartItems" as "c"
  join "products" as "p" using ("productId")
 where "c"."cartId" = $1
  `;
    const params = [cartId];
    db.query(sql, params)
      .then(result => res.json(result.rows))
      .catch(err => next(err));
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = Number(req.body.productId);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({ error: '"productId" must be a postive integer' });
  }
  const sql = `
  select "price"
  from "products"
  where "productId" = $1
`;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        throw (new ClientError(`Product with productId ${productId} cannot be found`, 400));
      }
      const price = result.rows[0].price;
      if (req.session.cartId) {
        return {
          cartId: req.session.cartId,
          price: price
        };
      } else {
        const sql = `
        insert into "carts" ("cartId", "createdAt")
        values (default, default)
        returning "cartId"
        `;
        return db.query(sql)
          .then(result => {
            const cartId = result.rows[0];
            return {
              cartId: cartId.cartId,
              price: price
            };
          });
      }
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const sql = `
      insert into "cartItems" ("cartId", "productId", "price")
        values ($1, $2, $3)
        returning "cartItemId"
      `;
      const params = [result.cartId, productId, result.price];
      return db.query(sql, params)
        .then(result => {
          const cartItem = result.rows[0];
          return cartItem.cartItemId;
        });
    })
    .then(result => {
      const cartItemId = result;
      const sql = `
      select "c"."cartItemId",
      "c"."price",
      "p"."productId",
      "p"."image",
      "p"."name",
      "p"."shortDescription"
  from "cartItems" as "c"
  join "products" as "p" using ("productId")
where "c"."cartItemId" = $1
      `;
      const params = [cartItemId];
      return db.query(sql, params)
        .then(result => {
          const cart = result.rows[0];
          res.status(201).json(cart);
        });
    })
    .catch(err => next(err));
});
app.post('/api/orders', (req, res, next) => {
  const cartId = req.session.cartId;
  const lastName = req.body.lastName;
  const firstName = req.body.firstName;
  const shippingAddress = req.body.shippingAddress;
  const creditCard = req.body.creditCard;
  if (!cartId) {
    return res.status(400).json({ error: '"cartId" not found' });
  }
  if (!creditCard || !lastName || !shippingAddress || !firstName) {
    return res.status(400).json({ error: 'some of order information is missing' });
  } else if (creditCard && name && shippingAddress) {
    const sql = `
  insert into "orders" ("cartId", "lastName","firstName", "shippingAddress", "creditCard")
  values ($1,$2,$3,$4)
  returning "orderId","createdAt", "lastName","firstName", "creditCard", "shippingAddress"
  `;
    const params = [cartId, lastName, firstName, shippingAddress, creditCard];
    return db.query(sql, params)
      .then(result => {
        const order = result.rows[0];
        delete req.session.cartId;
        return res.status(201).json(order);
      })
      .catch(err => next(err));
  }
});
app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
