import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StellarService } from './stellar.service';
import { StellarController } from './stellar.controller';
import { TransactionLog } from './entities/transaction-log.entity';
import { PricesService, PRICE_REDIS_CLIENT } from './prices.service';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TransactionLog])],
  controllers: [StellarController],
  providers: [
    StellarService,
    PricesService,
    {
      provide: PRICE_REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const redisUrl = config.get<string>('REDIS_URL', '').trim();

        if (!redisUrl) {
          return null;
        }

        return createClient({ url: redisUrl });
      },
    },
  ],
  exports: [StellarService, PricesService],
})
export class StellarModule {}
