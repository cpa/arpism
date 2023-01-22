const path = require('path');

module.exports = {
    entry: './index.js',  // path to our input file
    output: {
	filename: 'bundle.js',  // output bundle file name
	path: path.resolve(__dirname, './static'),  // path to our Django static directory
        library: {
	    name: 'arp',
	    type: 'var',
	},
    },
};
