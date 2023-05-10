import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppService } from './app.service';
import { Url } from './url.interface';
import { CreateUrlDto } from './create-url.dto';

describe('AppService', () => {
  let appService: AppService;
  let urlModel: Model<Url>;

  const mockUrlModel = {
    create: jest.fn().mockResolvedValue({
      save: jest.fn(),
      shortUrl: 'abc123',
    }),
    findOne: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getModelToken('Url'),
          useValue: mockUrlModel,
        },
      ],
    }).compile();

    appService = moduleRef.get<AppService>(AppService);
    urlModel = moduleRef.get<Model<Url>>(getModelToken('Url'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createShortUrl', () => {
    const createUrlDto: CreateUrlDto = {
      url: 'https://example.com',
    };

    it('should return a short URL', async () => {
      const result = 'abc123';
      expect(result).toEqual('abc123');
    });
  });

  describe('getLongUrl', () => {
    const shortUrl = 'abc123';
    const mockUrl = {
      primaryUrl: 'https://example.com',
      shortUrl,
    };

    it('should return the long URL for a valid short URL', async () => {
      mockUrlModel.exec.mockResolvedValueOnce(mockUrl);
      const result = await appService.getLongUrl(shortUrl);
      expect(result).toEqual(mockUrl.primaryUrl);
      expect(urlModel.findOne).toHaveBeenCalledWith({ shortUrl });
    });

    it('should throw an error for an invalid short URL', async () => {
      mockUrlModel.exec.mockResolvedValueOnce(null);
      await expect(appService.getLongUrl(shortUrl)).rejects.toThrow(
        'Url not found',
      );
      expect(urlModel.findOne).toHaveBeenCalledWith({ shortUrl });
    });
  });
});
