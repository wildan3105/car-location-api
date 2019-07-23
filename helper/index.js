const isObjectEmpty = (obj) => {
	return Object.keys(obj).length === 0;
}

const isJson = (string) => {
	try {
		let json = JSON.parse(string);
		return (typeof json == 'object');
	} catch(e) {
		return false;
	}
}

module.exports = {
	isObjectEmpty,
	isJson
};