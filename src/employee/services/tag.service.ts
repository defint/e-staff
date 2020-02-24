import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TAG_REPOSITORY } from 'src/constants';
import { Tag } from '../entities/tag.entity';
import { TagDto } from '../dto/tag.dto';
import { StatItemDto } from '../dto/stat.dto';

@Injectable()
export class TagService {
  constructor(
    @Inject(TAG_REPOSITORY)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async getList(): Promise<Array<Tag>> {
    return this.tagRepository.find();
  }

  async getOne(id: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne(id);

    if (!tag) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Tag does not exist.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return tag;
  }

  async findOrCreateTag(item: TagDto): Promise<Tag> {
    const findTag = await this.tagRepository.findOne({
      where: { label: item.label },
    });
    if (findTag) {
      return findTag;
    }

    const tag = new Tag();
    tag.label = item.label;

    const entity = this.tagRepository.create(tag);
    await this.tagRepository.save(entity);
    return entity;
  }

  async getStat(): Promise<Array<StatItemDto>> {
    const tags = await this.tagRepository.find({ relations: ['employees'] });

    return tags.map(tag => {
      const item = new StatItemDto();
      item.title = tag.label;
      item.total = tag.employees.length;

      return item;
    });
  }
}
