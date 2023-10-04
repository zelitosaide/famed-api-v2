import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // await app.listen(3001);

  const configService = app.get(ConfigService);
  const port = configService.get("port");
  const connectionUrl = configService.get("connectionUrl")

  await app.listen(port, function() {
    console.log(port, connectionUrl);
  });
}
bootstrap();
