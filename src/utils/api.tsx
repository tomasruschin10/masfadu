import { API_URL } from "./env";
import Axios from "axios";
import * as AxiosLogger from "axios-logger";
import { updatetoken } from '../redux/actions/token';
import { store } from "../redux/store";
import { updateUserdata } from '../redux/actions/user';
import * as RootNavigation from "../navigation/RootNavigation";
import { updateMessage } from '../redux/actions/message';
import { FORGET_NOTICE, forgetNotice } from "../redux/actions/notice";

export const baseApi = Axios.create({
	baseURL: API_URL,
});

const instances = [baseApi];

instances.forEach(async (instance) => {
	instance.defaults.headers["Accept"] = "application/json";
	instance.defaults.headers["Content-Type"] = "application/json";


	instance.interceptors.request.use((request) => {
		const op = request.url?.includes("?") ? "&" : "?";
		return request;
	});
	instance.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error) {
			const errorResponse = error?.response;
			if (errorResponse) {
				console.log("🚀 ~ file: api.tsx ~ line 33 ~ instances.forEach ~ errorResponse.url", errorResponse.url)
                if(errorResponse.status === 401 && errorResponse?.config?.url !== '/auth/login') {
                    store.dispatch(updateMessage({body: "Tú sesión expiró, volvé a iniciar sesión para continuar", type: "danger",open: true}));
					store.dispatch(forgetNotice({ type: FORGET_NOTICE, value: false }))
                    store.dispatch(updatetoken(''));
                    store.dispatch(updateUserdata({}));
                    RootNavigation.reset('SplashScreen')
                }	
				 /* console.log(errorResponse); */
			}
			return Promise.reject(error);
		}
	);

	if (!__DEV__) {
		instance.interceptors.request.use(
			AxiosLogger.requestLogger,
			AxiosLogger.errorLogger
		);

		instance.interceptors.response.use(
			AxiosLogger.responseLogger,
			AxiosLogger.errorLogger
		);
	}
});
