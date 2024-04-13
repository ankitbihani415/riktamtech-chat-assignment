/* eslint-disable no-console */
/* eslint-disable no-undef */
import { testDB, disconnectDB } from '../src/db';
import { listSeedUser } from '../seed/user.seeder';
import request from 'supertest';
import { server } from '../src';

describe('Testing the chat assignment route', () => {
  let adminDetails;
  let seedUsers;
  let userDetails_1;
  let group;
  let messages = [];
  let userDetails = {
    phone: '9174133785',
    password: '12345678',
  }
  beforeAll(async () => {
    await testDB();
    seedUsers = await listSeedUser();
  });
  afterAll(async () => {
    await disconnectDB();
    await server.close();
  });

  describe('Login route', () => {
    it('Login Route Validation', async () => {
      await request(server)
        .post('/api/v1/login')
        .send({})
        .then(res => {
          expect(res.status).toBe(422);
        });
    })
    it('Login Route', async () => {
      await request(server)
        .post('/api/v1/login')
        .send({ phone: '9174133789', password: '12345678' })
        .then(res => {
          expect(res.status).toBe(200);
          adminDetails = JSON.parse(res.text).data;
        });
    })
    // Login normal user
    it('1 User Login', async () => {
      await request(server)
        .post('/api/v1/login')
        .send({ phone: '9174133788', password: '12345678' })
        .then(res => {
          expect(res.status).toBe(200);
          userDetails_1 = JSON.parse(res.text).data;
        });
    })
  })
  describe('User management routes', () => {
    it('Creates user', async () => {
      await request(server)
        .post('/api/v1/user/create')
        .set('authorization', adminDetails.token)
        .send(userDetails)
        .then(res => {
          expect(res.status).toBe(201);
          userDetails = JSON.parse(res.text).data;
        });
    })
    it('Updates user', async () => {
      await request(server)
        .put(`/api/v1/user/update/${userDetails._id}`)
        .set('authorization', adminDetails.token)
        .send({ name: 'Test User' })
        .then(res => {
          expect(res.status).toBe(200);
        });
    })
    it('List user', async () => {
      await request(server)
        .get('/api/v1/user/list')
        .set('authorization', adminDetails.token)
        .then(res => {
          const list = JSON.parse(res.text)
          expect(res.status).toBe(200);
          expect(list.data.length).toBe(4);
        });
    })
  })
  describe('Group routes', () => {
    it('Group Create Validation fails', async () => {
      await request(server)
        .post('/api/v1/group/create')
        .set('authorization', userDetails_1.token)
        .send()
        .then(res => {
          expect(res.status).toBe(422);
        });
    })
    it('Group Create Success', async () => {
      await request(server)
        .post('/api/v1/group/create')
        .set('authorization', userDetails_1.token)
        .send({ name: "RiktamChat" })
        .then(res => {
          expect(res.status).toBe(201);
          group = JSON.parse(res.text).data;
        });
    })
  })
  describe('Group Members Routes', () => {
    it('Add Group Member Validation fails', async () => {
      await request(server)
        .post('/api/v1/group-member/add')
        .set('authorization', userDetails_1.token)
        .send()
        .then(res => {
          expect(res.status).toBe(422)
        })
    })
    it('Add Group Member throws error if user already added', async () => {
      await request(server)
        .post('/api/v1/group-member/add')
        .set('authorization', userDetails_1.token)
        .send({ groupId: group._id, userId: userDetails_1.user._id })
        .then(res => {
          expect(res.status).toBe(400)
        })
    })
    it('Delete Group Member', async () => {
      await request(server)
        .delete(`/api/v1/group-member/delete/${group.members[0]._id}`)
        .set('authorization', userDetails_1.token)
        .then(res => {
          expect(res.status).toBe(204)
        })
    })
    it('Add Group Member success', async () => {
      for (let user of seedUsers) {
        await request(server)
          .post('/api/v1/group-member/add')
          .set('authorization', userDetails_1.token)
          .send({ groupId: group._id, userId: user._id })
          .then(res => {
            expect(res.status).toBe(201)
          })
      }
    })
  })
  describe('Message Routes', () => {
    it('Send message validation fails', async () => {
      await request(server)
        .post('/api/v1/message/send')
        .set('authorization', userDetails_1.token)
        .send()
        .then(res => {
          expect(res.status).toBe(422)
        })
    })
    it('Send message to group', async () => {
      for (let user of seedUsers) {
        await request(server)
          .post('/api/v1/message/send')
          .set('authorization', userDetails_1.token)
          .send({ groupId: group._id, userId: user._id, message: `this is test message from user: ${user.name}` })
          .then(res => {
            expect(res.status).toBe(201)
            messages.push(JSON.parse(res.text).data);
          })
      }
    })
    it('Liked Messages', async () => {
      for (let message of messages) {
        await request(server)
          .post(`/api/v1/message/like/${message._id}`)
          .set('authorization', userDetails_1.token)
          .then(res => {
            expect(res.status).toBe(201)
          })
      }
    })
  })
  describe('Role based route access', () => {
    it('User can not accesss User Create route', async () => {
      await request(server)
        .post('/api/v1/user/create')
        .set('authorization', userDetails_1.token)
        .send(userDetails)
        .then(res => {
          expect(res.status).toBe(403);
        });
    })
    it('User can not accesss User Update route', async () => {
      await request(server)
        .put(`/api/v1/user/update/${userDetails._id}`)
        .set('authorization', userDetails_1.token)
        .send(userDetails)
        .then(res => {
          expect(res.status).toBe(403);
        });
    })
    it('User can access List user route and can see verified and unblocked users', async () => {
      await request(server)
        .get('/api/v1/user/list')
        .set('authorization', userDetails_1.token)
        .then(res => {
          const list = JSON.parse(res.text)
          expect(res.status).toBe(200);
          expect(list.data.length).toBe(2);
        });
    })
    it('Admin can not access group create routes', async () => {
      await request(server)
        .post('/api/v1/group/create')
        .set('authorization', adminDetails.token)
        .send()
        .then(res => {
          expect(res.status).toBe(403);
        });
    })
    it('Admin can not access group update routes', async () => {
      await request(server)
        .put('/api/v1/group/update/66158e18ecef2e2b389e8933')
        .set('authorization', adminDetails.token)
        .send()
        .then(res => {
          expect(res.status).toBe(403);
        });
    })
    it('Admin can not access add group-member route', async () => {
      await request(server)
        .post('/api/v1/group-member/add')
        .set('authorization', adminDetails.token)
        .send()
        .then(res => {
          expect(res.status).toBe(403)
        })
    })
    it('Admin can not access delet group-member routes', async () => {
      await request(server)
        .delete('/api/v1/group-member/delete/66158e18ecef2e2b389e8933')
        .set('authorization', adminDetails.token)
        .then(res => {
          expect(res.status).toBe(403);
        });
    })
    it('Admin can not access send message route', async () => {
      await request(server)
        .post('/api/v1/message/send')
        .set('authorization', adminDetails.token)
        .send()
        .then(res => {
          expect(res.status).toBe(403)
        })
    })
    it('Admin can not access like message route', async () => {
      await request(server)
        .post(`/api/v1/message/like/66158e18ecef2e2b389e8933`)
        .set('authorization', adminDetails.token)
        .then(res => {
          expect(res.status).toBe(403)
        })
    })
  })
});