const {app, BrowserWindow} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, //是否完整的支持 node. 默认值为true
      nodeIntegrationInWorker: true, // 是否在Web工作器中启用了Node集成
      enableRemoteModule: true, //是否启用Remote 模块
      preload: path.join(__dirname, './untils.js') // 但预加载的 js 文件内仍可以使用 Nodejs 的 API
    }
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './build/index.html')}`);
  isDev && mainWindow.webContents.openDevTools();
  isDev && require('devtron').install();
  // win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// const {app, BrowserWindow, ipcMain} = require('electron');
// const isDev = require('electron-is-dev');
// const path = require('path');
// // const url = require('url');
// // const createTray = require('./static/tray.js');
// // const crashed = require('./static/crashed.js');
// // const quit = require('./static/quit.js');
// // const electronUpdata = require('./static/updata.js');
// let mainWindow;
// const gotTheLock = app.requestSingleInstanceLock();
// function createWindow() {
//   mainWindow = new BrowserWindow({
//     //生成窗口
//     width: 1000,
//     height: 800,
//     title: 'hello electron',
//     webPreferences: {
//       javascript: true,
//       plugins: true,
//       nodeIntegration: true, // 是否集成 Nodejs
//       webSecurity: false
//     }
//   });
//   // global.mainWindowId = mainWindow.id;
//   // 加载应用--- 通过环境判断
//   mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './build/index.html')}`);
//   isDev && mainWindow.webContents.openDevTools();
//   isDev && require('devtron').install();

//   //菜单
//   // require('./static/menu.js');
//   // createTray();
//   // crashed();
//   // quit();
//   //更新
//   // ipcMain.on('electron-updata', (event, data) => {
//   //   electronUpdata();
//   // });

//   // mainWindow.on('close', event => {
//   //   //隐藏窗口
//   //   mainWindow.hide();
//   //   console.log('close');
//   //   event.preventDefault();
//   // });

//   // mainWindow.on('closed', (event)=>{
//   //    // 退出
//   //   console.log('closed')
//   //   mainWindow = null;
//   //   //app.exit(0);//不询问直接退出
//   //   // app.quit(); //尝试关闭所有窗口
//   // });
// }

// //一次打开一个窗口
// if (!gotTheLock) {
//   app.quit();
// } else {
//   app.on('second-instance', (event, commandLine, workingDirectory) => {
//     if (mainWindow) {
//       if (mainWindow.isMinimized()) mainWindow.restore();
//       mainWindow.focus();
//     }
//   });
//   app.on('ready', createWindow);
// }

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });

// app.on('activate', () => {
//   if (mainWindow === null) createWindow();
// });
