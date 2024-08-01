const { faker } = require('@faker-js/faker');
class UserService {
  constructor() {
    this.users = [];
    this.generate();
  }
  generate() {
    const limit = 20;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email()
      });
    }
  }
  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users);
      }, 2000);
    });
  }

  findOne(id){
    const user = this.users.find(user => user.id === id)
    if (!user) {
      throw new Error('user not found');
    }
    return user
  }

  async create(data) {
    const newUser = { id: faker.string.uuid(), ...data };
    this.users.push(newUser);
    return newUser;
  }

  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('user not found');
    }
    const user = this.users[index];
    this.users[index] = { ...user, ...changes };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('user not found');
    }
    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = UserService
