import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TAG_REPOSITORY } from 'src/constants';
import { Tag } from '../entities/tag.entity';
import { TagDto } from '../dto/tag.dto';

@Injectable()
export class TagService {
  constructor(
    @Inject(TAG_REPOSITORY)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async getList(): Promise<Array<Tag>> {
    return this.tagRepository.find();
  }

  async createTag(item: TagDto): Promise<Tag> {
    const findTag = await this.tagRepository
      .createQueryBuilder()
      .where({ label: item.label })
      .getOne();
    if (findTag) {
      return findTag;
    }

    const tag = new Tag();
    tag.label = item.label;

    const entity = this.tagRepository.create(tag);
    await this.tagRepository.save(entity);
    return entity;
  }
}
