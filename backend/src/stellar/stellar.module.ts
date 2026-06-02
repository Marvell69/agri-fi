import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StellarService } from './stellar.service';
import { StellarController } from './stellar.controller';
import { TransactionLog } from './entities/transaction-log.entity';
import { StellarHistory } from './entities/stellar-history.entity';
import { StellarArchiverService } from './stellar-archiver.service';
import { StellarMonitorService } from './stellar-monitor.service';

@Global()
@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TransactionLog, StellarHistory])],
  controllers: [StellarController],
  providers: [StellarService, StellarArchiverService, StellarMonitorService],
  exports: [StellarService],
})
export class StellarModule {}
