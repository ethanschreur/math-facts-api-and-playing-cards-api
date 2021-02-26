let submit = document.querySelector('#enter');
$(submit).click((evt) => {
	let num = $(evt.target).prev().val();
	axios
		.get(`http://numbersapi.com/${num}?json`)
		.then((resp) => displayMessage(resp.data.text))
		.catch((err) => displayMessage(err));
});

function displayMessage(msg) {
	$('#message').empty();
	$('#message').append(msg);
}

let numbersList = [];
let second_submit = document.querySelector('#second-enter');
$(second_submit).click((evt) => {
	num = $(evt.target).prev().val();
	numbersList.push(num);
	$('#numbers-list').empty();
	for (let i of numbersList) {
		$('#numbers-list').append(i);
		$('#numbers-list').append(', ');
	}
});
let promises = [];
$('#enter-list').click(() => {
	promises = [];
	for (let num of numbersList) {
		promises.push(axios.get(`http://numbersapi.com/${num}?json`));
	}
	Promise.all(promises)
		.then((resp) => {
			resp.forEach((p) => displaylistfacts(p.data.text));
		})
		.catch((err) => console.log(err));
});

function displaylistfacts(msg) {
	$('#list-facts').append(msg);
}

$('#clear-list').click(() => {
	promises = [];
	numbersList = [];
	$('#list-facts').empty();
	$('#numbers-list').empty();
});

$('#third-enter').click((evt) => {
	let num = $(evt.target).prev().val();
	let promiseList = [];
	for (let i = 0; i < 4; i++) {
		promiseList.push(axios.get(`http://numbersapi.com/${num}?json`));
	}
	Promise.all(promiseList)
		.then((resp) => {
			resp.forEach((p) => displayfourofone(p.data.text));
		})
		.catch((err) => console.log(err));
});

function displayfourofone(msg) {
	$('#four-facts').append(msg);
	$('#four-facts').append('<br>');
}

$('#third-clear').click(() => {
	$('#four-facts').empty();
});

axios
	.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
	.then((resp) =>
		axios
			.get(`https://deckofcardsapi.com/api/deck/${resp.data.deck_id}/draw/?count=1`)
			.then((resp) => console.log(`${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`))
	);

let two_cards = [];
let deck_id;
axios
	.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
	.then(function(resp) {
		deck_id = resp.data.deck_id;
		return axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
	})
	.then((resp) => {
		two_cards.push(`${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`);
	})
	.then(() => {
		return axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
	})
	.then((resp) => {
		two_cards.push(`${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`);
		console.log(two_cards);
	});

let the_deck_id;

document.addEventListener('DOMContentLoaded', function() {
	axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then((resp) => {
		the_deck_id = resp.data.deck_id;
		console.log('asdfas', the_deck_id);
	});
});

$('#draw').click(() => {
	axios.get(`https://deckofcardsapi.com/api/deck/${the_deck_id}/draw/?count=1`).then((resp) => {
		$('#cards').empty();
		$('#cards').append(`<img src='${resp.data.cards[0].image}'>`);
	});
});
