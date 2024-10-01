import { app } from './serve';
import {env} from './env'
//routes register

 import { router as catalagoBeca } from './routes/catalogoBeca';
import { router as SolicitudBeca } from './routes/SolicitudBeca';



app.use('/api/catalagoBeca',catalagoBeca);
app.use('/api/SolicitudBeca', SolicitudBeca);

app.listen(env.PORT, () => {
    console.log(`API-USER  started on port ${env.PORT}`);
})