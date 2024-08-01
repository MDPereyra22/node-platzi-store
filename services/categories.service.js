const { faker } = require('@faker-js/faker');
class CategoryService {
  constructor() {
    this.categories = [];
    this.generate();
  }
  generate() {
    const limit = 20;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.string.uuid(),
        name: faker.commerce.department(),
      });
    }
  }
  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.categories);
      }, 2000);
    });
  }

  findOne(id){
    const category = this.categories.find(category => category.id === id)
    if (!category) {
      throw new Error('category not found');
    }
    return category
  }

  async create(data) {
    const newCategory = { id: faker.string.uuid(), ...data };
    this.categories.push(newCategory);
    return newCategory;
  }

  async update(id, changes) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('category not found');
    }
    const category = this.categories[index];
    this.categories[index] = { ...category, ...changes };
    return this.categories[index];
  }

  async delete(id) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('category not found');
    }
    this.categories.splice(index, 1);
    return { id };
  }
}

module.exports = CategoryService
