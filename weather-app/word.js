const request = require('request');

const options = {
  method: 'GET',
  url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
  qs: {term: 'Tiffany'},
  headers: {
    'x-rapidapi-key': 'b40b818955msh5f855d8b2591c0ap1520dejsn2799c0844049',
    'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com',
    useQueryString: true
  }
};

request(options, function (error, response) {
	if (error) throw new Error(error);

	console.log(response.body);
});