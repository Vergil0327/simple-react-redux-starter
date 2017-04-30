export const HELLO_REDUX = 'HELLO_REDUX';

export const helloRedux = () => {
	return {
		type: HELLO_REDUX,
		payload: {
			text: 'Hello Redux',
		},
	};
};
