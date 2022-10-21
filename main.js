// function for if he wrote his name of not and remove the btn to start the game
document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("What is your name?");
    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = "Guest";
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
};

let duration = 1000; //the time
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children); //array of the cards
// let orderRange = [...Array(blocks.length).keys()]; //make an array contains the number of the blocks array and i want the keys to make the shuffle and ... to extract every key
let orderRange = Array.from(Array(blocks.length).keys()); //the same line code above but with another way

// console.log(orderRange) //here its still organized
shuffle(orderRange);
// console.log(orderRange) // here it became random


//add "Order Css Property" to game blocks
blocks.forEach((block, index) => { //block is every card, index every index of card
    block.style.order = orderRange[index]; //get the index of the orderrange array
    // Add click event
    block.addEventListener('click', function () {
        // Trigger the flip block function
        flipBlock(block);
    });
});

//Flip Block Function
function flipBlock(selectedBlock) {
    //Add class is-flipped
    selectedBlock.classList.add('is-flipped');
    // collect all flip cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    // if theres two selected blocks
    if (allFlippedBlocks.length === 2) {
        //stop clicking function
        stopClicking();
        //check matched block function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

//stopClicking function
function stopClicking() {
    // add class no clicking on main container
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {
        // remove class no cliking after the duration
    blocksContainer.classList.remove('no-clicking');
    }, duration);
}

// Check matched block
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector(".tries span");

    if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");

        document.getElementById("success").play();

    }else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration)

        document.getElementById("fail").play();
    }
}

//Shuffle Function
function shuffle(array) {
    //Setting Vars
    let current = array.length,
        temp,
        random;

    while (current > 0) {
        // Get Random Number
        random = Math.floor(Math.random() * current);
        // Decrease Length By One
        current--;

        //[1] save current element in stash
        temp = array[current];
        //[2] current Element = random element
        array[current] = array[random];
        //[3] random element = get element from stash
        array[random] = temp;
    }
    return array;
}
// current array [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
// new array [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
/*
الفكرة وما فيها اني باخد عنصر في الاستاش بحفظه معايا يعني وبعدين بياخد عنصر تاني عشوائي يحطه مكانه طيب بالنسبة للرقم اللي معاي في الاستاش ده هيتحط مكان العنصر العشوائي اللي جه
بمعني عندي اراي مترتبة من 0 ل9 وعندي اراي الجديدة برضو مترتبة من 0 ل 9
هو بيمشي واحده واحده يجي عند الصفر ويخزنه وياخد رقم راندوم يحطه مكانه وليكن 6 مثلا فكده مكان ال 6 بقا فاضي فهنحط العنصر اللي متخزن معانا اللي هي ال 0
يعني بيعملو سوابينج مع بعض اكنهم بيبدلو الاماكن مع بعض
*/
