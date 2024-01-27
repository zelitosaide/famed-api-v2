import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  // await app.listen(3001);

  // const configService = app.get(ConfigService);
  // const port = configService.get("port");
  // const connectionUrl = configService.get("connectionUrl");

  await app.listen(3001, function () {
    // await app.listen(port, function () {
    // console.log(port, connectionUrl);
  });
}
bootstrap();
