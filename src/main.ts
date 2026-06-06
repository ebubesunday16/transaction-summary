import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);



//   Create a backend app that implements a wallet system. 

// •⁠  ⁠User should be able to create a wallet
// •⁠  ⁠⁠User should be able to fund a wallet/update its balance
// •⁠  ⁠⁠User should be able to delete a wallet
// •⁠  ⁠⁠User should be able to see the wallet balance
// •⁠  ⁠⁠User can have many wallets

// User can see currency rates for Naira to (USD,KES,GHS,GBP,AUD,CAD) from an external rates provider eg xe.com … this is to test how you consume external apis
}
bootstrap();
