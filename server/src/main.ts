import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {ValidationPipe} from './pipes/validation.pipe'

async function start() {
    try {
        const PORT = process.env.PORT || 5000
        const app = await NestFactory.create(AppModule)

        app.enableCors()
        app.useGlobalPipes(new ValidationPipe())

        await app.listen(PORT, () => console.log(`Server has been started on PORT ${PORT}`))
    } catch (e) {
        console.log(e)
    }

}

start()
