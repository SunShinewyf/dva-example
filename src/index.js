import dva from 'dva';
import './index.css';
import UserModel from './models/user';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(UserModel);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
