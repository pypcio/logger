export type Message = {
	topic: string;
	qos: 0 | 1 | 2;
	payload: JSON;
};
