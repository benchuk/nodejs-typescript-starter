export default class ServerResult {
	hasError: boolean;
	constructor(public statusCode: number, public message: string, public data?: any) {
		this.statusCode = statusCode
		this.hasError = statusCode >= 400;
	}
}