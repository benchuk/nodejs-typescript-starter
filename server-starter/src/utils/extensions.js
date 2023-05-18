import http from 'http';
import loggerService from '../services/loggerService';
import ServerResult from './data/ServerResult';
import _ from './extensions-interfaces';

export function initExtensions() {
	loggerService.debug('init Extensions');
	http.ServerResponse.prototype.Res200 = function(msg, data) {
		return this.status(200).json(new ServerResult(200, `${msg}`, data));
	};
	http.ServerResponse.prototype.Res400 = function(msg) {
		return this.status(400).json(
			new ServerResult(
				400,
				msg.length > 0 ? `Bad Request: ${msg}` : `Bad Request`
			)
		);
	};
	http.ServerResponse.prototype.Res401 = function(msg) {
		return this.status(401).json(
			new ServerResult(
				401,
				msg.length > 0 ? `Unauthorized: ${msg}` : `Unauthorized`
			)
		);
	};
	http.ServerResponse.prototype.Res404 = function(msg) {
		return this.status(404).json(
			new ServerResult(404, msg.length > 0 ? `NotFound: ${msg}` : `NotFound`)
		);
	};
	http.ServerResponse.prototype.Res500 = function(msg) {
		return this.status(500).json(
			new ServerResult(
				500,
				msg.length > 0
					? `Internal Server Error: ${msg}`
					: `Internal Server Error`
			)
		);
	};
}
