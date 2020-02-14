// global variables
var delayTime = 1000;
// time (in milliseconds) cards are exposed
var deck = new Array(
	"2c", "2d", "2h", "2s", "3c", "3d", "3h", "3s", "4c", "4d", "4h", "4s", 
	"5c", "5d", "5h", "5s", "6c", "6d", "6h", "6s", "7c", "7d", "7h", "7s", 
	"8c", "8d", "8h", "8s", "9c", "9d", "9h", "9s", "tc", "td", "th", "ts", 
	"jc", "jd", "jh", "js", "qc", "qd", "qh", "qs", "kc", "kd", "kh", "ks");
// 0..47
var currentPlayer;
// values: 0,1 (displayed as 1,2)
var scores = new Array(3);
// scores[i] == score of player i
var cardsFlipped;
// # cards flipped by curr player; values: 0,1,2
var flipped = new Array(3);
// indexes of cards flipped by curr player
var matched = new Array(48);
// matched[i] == (deck[i] has been matched)

// update() refreshes values displayed in textboxes
function update() {
	document.f.player.value = currentPlayer + 1;
	document.f.score1.value = scores[0];
	document.f.score2.value = scores[1];
	document.f.score3.value = scores[2];
}

// newGame() does all initializations required for starting a new game
function newGame() {
	// initialize global variables and images
	currentPlayer = 0;
	scores[0] = scores[1] = scores[2]= 0;
	cardsFlipped = 0;
	for (var i = 0; i < 48; i++) {
		matched[i] = false;
		 document.images[i].src = "http://mulan.csufresno.edu/~twilson/memory/cards/b.gif";
	}

	// shuffle deck
	for (var i = 47; i > 0; i--) {
		var rand = Math.floor(Math.random() * (i + 1));
		var temp = deck[rand];
		deck[rand] = deck[i];
		deck[i] = temp;
	}

	// initialize textfields
	update();
}

// click(n) handles the clicking of card n
function clck(n) {
	if (matched[n] || cardsFlipped == 2 || (cardsFlipped == 1 && flipped[0] == n))
		return;

	flipped[cardsFlipped] = n;
	 document.images[n].src = "http://mulan.csufresno.edu/~twilson/memory/cards/" + deck[n] + ".gif";
	cardsFlipped++;
	if (cardsFlipped == 2)
		setTimeout("checkMatch()", delayTime);
}

// checkMatch() checks to see if flipped cards match, updates scores,
// and flips cards accordingly (jokers if they match, backs otherwise)
function checkMatch() {
	var f = flipped[0], s = flipped[1];
	if (deck[f].charAt(0) == deck[s].charAt(0)) {
		 document.images[f].src = "http://mulan.csufresno.edu/~twilson/memory/cards/j.gif";
		 document.images[s].src = "http://mulan.csufresno.edu/~twilson/memory/cards/j.gif";
		matched[f] = matched[s] = true;
		scores[currentPlayer]++;
		update();
		if (scores[0] + scores[1] + scores[2]== 24) {
			// game is over, determine winner
			if (scores[0] > scores[1] && scores[0] > scores[2])
				alert("Player 1 has won!");
			else if (scores[0] < scores[1] && scores[1] > scores[2])
				alert("Player 2 has won!");
			else if (scores[0] < scores[2] && scores[2] > scores[1])
				alert("Player 3 has won!");
			else
				alert("Players 1 and 2 and 3 have tied!");
		}
	} else {
		 document.images[f].src = "http://mulan.csufresno.edu/~twilson/memory/cards/b.gif";
		 document.images[s].src = "http://mulan.csufresno.edu/~twilson/memory/cards/b.gif";
		currentPlayer = 1 + currentPlayer;
		if (currentPlayer >= 3) currentPlayer = 0
		update();
	}
	cardsFlipped = 0;
	// note: this enables further clicks, which we do last
}

function table() {

	table ='<table border="1" style = "text-align:right;">';
		c = 0;
	for (var x = 0; x < 6; x++) {
		table +='<tr>';
		for (var i = 0; i < 8; i++) {
			
			table +='<td><a href="" onClick="clck('+ c +'); return false"> <img SRC="http://mulan.csufresno.edu/~twilson/memory/cards/b.gif" WIDTH="73" HEIGHT="97"></a></td>';
			c += 1;
			
		}
		
		table +='</tr>';
	}
	table +='</table>';
	document.getElementById('cards').innerHTML = table;

}



