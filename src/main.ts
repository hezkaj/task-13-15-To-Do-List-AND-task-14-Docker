import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import env = require('../env_config') ;
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function start() {
  const port=env.SERVER_PORT || 5000
  const app = await NestFactory.create(AppModule)
  const config= new DocumentBuilder()
    .setTitle('To Do app')
    .setDescription('like Trello')
    .setVersion('1.0.0')
    .addTag('my tag')
    .build()
  const document= SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('/api/docs', app, document)
  await app.listen(port, ()=>{console.log(`Server run on port ${port}`)})
}
start()