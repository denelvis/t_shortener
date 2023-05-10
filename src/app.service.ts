import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as shortid from 'shortid';

import { CreateUrlDto } from './create-url.dto';
import { Url } from './url.interface';

@Injectable()
export class AppService {
  constructor(@InjectModel('Url') private readonly urlModel: Model<Url>) {}

  async createShortUrl(createUrlDto: CreateUrlDto): Promise<string> {
    const url = new this.urlModel(createUrlDto);
    url.primaryUrl = createUrlDto.url;
    url.shortUrl = shortid.generate();
    await url.save();
    return url.shortUrl;
  }

  async getLongUrl(shortUrl: string): Promise<string> {
    const url = await this.urlModel.findOne({ shortUrl }).exec();
    if (!url) {
      throw new Error('Url not found');
    }
    return url.primaryUrl;
  }
}
