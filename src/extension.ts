// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import api from './api';
import * as superagent from 'superagent';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

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
		const newsany = news();
		console.log(newsany);
		superagent.get('https://www.lightnovel.us/cn/')
			.end(function (err, res) {
				if (err) {
					console.log("err", err);
				} else { console.log("res", res.text); }
			});
		vscode.window.showInformationMessage(newsany.toString());
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

export default async function news() {
	const news = await api();
	return news;
}
