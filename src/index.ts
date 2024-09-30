import { app } from './serve';
import {env} from './env'
//routes register

 import { router as catalagoBeca } from './routes/catalogoBeca';



app.use('/api/catalagoBeca',catalagoBeca);


app.listen(env.PORT, () => {
    console.log(`API-USER  started on port ${env.PORT}`);
})