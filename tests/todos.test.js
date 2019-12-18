const supertest = require('supertest');
const app = require('../app');
const Users = require('../src/database/models/users');
const Todo = require('../src/database/models/todo');

class Helper {
  constructor() {
    this.apiServer = supertest(app);
  }
}

describe('Todo Model Test', () => {
  const helper = new Helper();
  let userID;
  const testuser = 'TEST USER';
  const testpass = '123456';
  let myToken;
  let itemID;

  afterAll(async () => {
    Users.collection.drop();
    Todo.collection.drop();
    await helper.apiServer.close();
  });

  it('Registration', async () => {
    const { body } = await helper.apiServer
      .post('/register')
      .send({
        login: testuser,
        password: testpass,
        passwordReplay: testpass,
      });
    userID = body._id;
    expect(body.login).toBe('TEST USER');
  });

  it('Login user', async () => {
    const { body } = await helper.apiServer
      .post('/login')
      .send({
        login: testuser,
        password: testpass,
      });
    myToken = body.token.toString();

    expect(body.token.length).not.toBe(0);
  });

  it('Create item', async () => {
    const { body } = await helper.apiServer
      .post('/api/item')
      .send({
        description: 'example test',
      }).set('Authorization', `bearer ${myToken}`);
    itemID = body._id;
    expect(body.description).toBe('example test');
  });

  it('Get Items', async () => {
    const { body } = await helper.apiServer
      .get('/api/items')
      .set('Authorization', myToken);
    expect(body.length).not.toBe(0);
  });

  it('Get Item By Id', async () => {
    const { body } = await helper.apiServer
      .get(`/api/item/${itemID}`)
      .set('Authorization', `bearer ${myToken}`);
    expect(body.length).toBe(1);
  });

  it('Update Item By Id', async () => {
    const { body } = await helper.apiServer
      .put(`/api/item/${itemID}`)
      .send({
        description: 'example test',
        complete: true,
      }).set('Authorization', `bearer ${myToken}`);
    expect(body.complete).toBe(true);
    expect(body.description).toBe('example test');
  });

  it('Delete Completed', async () => {
    const { body } = await helper.apiServer
      .delete('/api/items/deleteCompleted')
      .set('Authorization', `bearer ${myToken}`);
    expect(body.status).toBe(200);
  });

  it('Delete Item By Id', async () => {
    let { body } = await helper.apiServer
      .post('/api/item')
      .send({
        description: 'example test',
      }).set('Authorization', `bearer ${myToken}`);
    itemID = body._id;
    body = await helper.apiServer
      .delete(`/api/item/${itemID}`)
      .set('Authorization', `bearer ${myToken}`);
    expect(body.status).toBe(200);
  });
});
