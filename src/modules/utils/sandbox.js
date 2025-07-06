export class Sandbox {
	constructor() {
		// ...
	}

	/**
	 * Run code.
	 * @param code
	 * @return {*}
	 */
	run(code) {
		console.log('Running code eval:', code);
		// TODO: Create sandbox iframe and run code inside it to isolate it
		try {
			return (function() {
				'use strict';
				const geval = eval;
				const result = geval(code);
				console.log('Eval result:', result);
				return result;
			})();
		} catch (e) {
			console.error('Error during eval:', e);
			return undefined;
		}
	}

	isReference(obj) {
		// Leftover from isolated-vm. False if run errored instead of returning a real value?
		return obj != null;
	}
}