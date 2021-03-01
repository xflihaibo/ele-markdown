import './App.css';
import './assets/less/style.less';
import Router from './router/index';
import {getPath} from './untils/shell.js';
console.log(getPath());
function App() {
    return (
        <div className="App">
            <Router />
        </div>
    );
}

export default App;
