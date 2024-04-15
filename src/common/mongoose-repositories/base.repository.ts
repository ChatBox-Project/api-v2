import { Model, Document, Types } from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async create(createDto: any): Promise<T> {
    const createdEntity = new this.model(createDto);
    return createdEntity.save();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<T> {
    return this.model.findById(id).exec();
  }
  async findOneAndUpdate(id: string, updateDto: any): Promise<T> {
    return this.model.findByIdAndUpdate(id, updateDto, { new: true });
  }
  async remove(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id);
  }
  async update(id: string, updateDto: any): Promise<T> {
    return this.model.findByIdAndUpdate(id, updateDto, { new: true });
  }
  async delete(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id);
  }
}
