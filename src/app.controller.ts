import { Controller, Get, Post, Body, Param, Redirect, HttpCode } from '@nestjs/common';

import { AppService } from './app.service';
import { CreateUrlDto } from './create-url.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('shorten')
  async createShortUrl(@Body() createUrlDto: CreateUrlDto): Promise<{ shortUrl: string }> {
    const shortUrl = await this.appService.createShortUrl(createUrlDto);
    return { shortUrl };
  }

  @Get(':id')
  async redirectToLongUrl(@Param('id') id: string): Promise<{ url: string }> {
    const longUrl = await this.appService.getLongUrl(id);
    return { url: longUrl };
  }
}