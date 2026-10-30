import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProduitModule } from './produit/produit.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ProduitModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
