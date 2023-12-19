// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

async function getLineNumber() {
	let lineNumberInput = await vscode.window.showInputBox({
		prompt: 'Enter line number:',
		placeHolder: 'e.g., 10'
	});

	if (!lineNumberInput || isNaN(parseInt(lineNumberInput))) {
		vscode.window.showErrorMessage('Please enter a valid line number.');
		return;
	}
	
	return parseInt(lineNumberInput);
}

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('select-till-line.select', async () => {
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No active text editor
		}

		let lineNumber = await getLineNumber();
		if(!lineNumber){
			return; // User inserted a NaN
		}

		//define positions
		const currentCursorPos = new vscode.Position(
			editor.selection.active.line,
			editor.selection.active.character
		);
		const nextCursorPos = new vscode.Position(
			lineNumber - 1,
			0
		);
		const selection = [
			new vscode.Selection(
				currentCursorPos,
				nextCursorPos
			)
		];

		// Select till the desired line
		editor.selections = selection;
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
