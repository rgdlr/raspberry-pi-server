export function useUid() {
	const head = Date.now().toString(36);
	const tail = Math.random().toString(36).substring(2);
	const uid = head + tail;

	return uid;
}
