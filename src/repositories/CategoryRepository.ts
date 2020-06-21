import { EntityRepository, Repository } from 'typeorm';

import Category from '../models/Category';

@EntityRepository(Category)
export default class CategorysRepository extends Repository<Category> {}
