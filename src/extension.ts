// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import api from './api';
import * as superagent from 'superagent';
import cheerioModule = require('cheerio');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	class QueryClass {
		client: string;
		gz: number;
		d: object;
		is_encrypted: number;
		platform: string;
		sign: string;
		constructor() {
			this.d = {};
			this.client = 'web';
			this.gz = 0;
			this.is_encrypted = 0;
			this.platform = 'pc';
			this.sign = '';
		}
	}
	let info = {
		username: '',
		password: ''
	};
	let security_key = '';
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cwmExt" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('cwmExt.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello VS Code from cwmExt!');
		// cheerioModule.html();
		let query1 = new QueryClass();
		query1.d = { "username": "d41276650@163.com", "password": "912Z085s" };
		superagent.post('https://www.lightnovel.us/proxy/api/user/login')
			.set('Content-Type', 'application/json')
			.send(JSON.stringify(query1))
			.end(function (err, res) {
				if (err) {
					console.log("err", err);
				} else {
					console.log("res", res.text);
					let ress = JSON.parse(res.text);
					let dict = {
						class: 1,
						page: 1,
						type: 1,
						uid: "1153978",
						security_key: ress.data.security_key
					};
					let query2 = new QueryClass();
					query2.d = dict;
					console.log("query2", query2);
					superagent.post('https://www.lightnovel.us/proxy/api/history/get-collections')
						.set('Content-Type', 'application/json')
						.send(JSON.stringify(query2))
						.end(function (err, res) {
							if (err) {
								console.log("err", err);
							} else { console.log("res", JSON.parse(res.text)); }
						});
				}
			});
		// let params = JSON.parse('{"is_encrypted":0,"platform":"pc","client":"web","sign":"","gz":0,"d":{"class":3,"security_key":"283136d17ca682bd72ad269bcb4564e7:1153977:0"}}');
		// console.log(params);
		// superagent.post('https://www.lightnovel.us/cn/history/article')
		// 	.set('Content-Type', 'application/json')
		// 	.send('{"is_encrypted":0,"platform":"pc","client":"web","sign":"","gz":0,"d":{"class":3,"security_key":"283136d17ca682bd72ad269bcb4564e7:1153977:0"}}')
		// 	.end(function (err, res) {
		// 		if (err) {
		// 			console.log("err", err);
		// 		} else { console.log("res", res.text); }
		// 	});
	});
	let getCollections=vscode.commands.registerCommand('cwmExt.getCollections', () => {
		if(security_key!==''&&security_key!==undefined){
			let dict = {
				class: 1,
				page: 1,
				type: 1,
				uid: "1153978",
				security_key: security_key
			};
			let query2 = new QueryClass();
			query2.d = dict;
			console.log("query2", query2);
			superagent.post('https://www.lightnovel.us/proxy/api/history/get-collections')
				.set('Content-Type', 'application/json')
				.send(JSON.stringify(query2))
				.end(function (err, res) {
					if (err) {
						console.log("err", err);
					} else { console.log("res", JSON.parse(res.text)); }
				});
		}else{
			vscode.window.showErrorMessage("请先登录");
		}
	});
	let login = vscode.commands.registerCommand('cwmExt.login', () => {
		vscode.window.showInputBox(
			{ // 这个对象中所有参数都是可选参数
				password: false, // 输入内容是否是密码
				ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
				placeHolder: '用户名', // 在输入框内的提示信息
				validateInput: function (text) {
					if (text === undefined) { return '请输入用户名'; }
					if (text === '') { return '请输入用户名'; }
				} // 对输入内容进行验证并返回
			}).then(msg => {
				console.log("用户输入：" + msg);
				if (msg !== undefined) {
					info.username = msg;
					vscode.window.showInputBox(
						{ // 这个对象中所有参数都是可选参数
							password: false, // 输入内容是否是密码
							ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
							placeHolder: '密码', // 在输入框内的提示信息
							validateInput: function (text) {
								if (text === undefined) { return '请输入密码'; }
								if (text === '') { return '请输入密码'; }
							} // 对输入内容进行验证并返回
						}).then(msg => {
							console.log("用户输入：" + msg);
							if (msg !== undefined) {
								info.password = msg;
								let query = new QueryClass();
								
								// query.d = { "username": "d41276650@163.com", "password": "912Z085s" };
								query.d=info;
								console.log("query",query);
								superagent.post('https://www.lightnovel.us/proxy/api/user/login')
									.set('Content-Type', 'application/json')
									.send(JSON.stringify(query))
									.end(function (err, res) {
										if (err) {
											console.log("err", err);
										} else {
											console.log("res", res);
											let ress = JSON.parse(res.text);
											// if(ress.data.security_key)
											console.log("ress",ress);
											console.log("ress.data",ress.data);
											console.log("ress.data.security_key",ress.data.security_key);
											if(ress.data.security_key!==undefined){
												console.log("security_key",security_key);
												security_key= ress.data.security_key;
											}else{
												vscode.window.showErrorMessage(JSON.stringify(ress.data));
											}
										}
									});
							}
						});
				}
			});
	});
	context.subscriptions.push(disposable);
	context.subscriptions.push(login);
	context.subscriptions.push(getCollections);
}

// this method is called when your extension is deactivated
export function deactivate() { }

export default async function news() {
	const news = await api();
	return news;
}
