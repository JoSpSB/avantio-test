import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const middleWares = [
  morgan('tiny'),
  helmet(),
  cors(),
];

export default middleWares;
