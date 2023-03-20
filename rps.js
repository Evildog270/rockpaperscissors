const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]');
const yourScoreSpan = document.querySelector('[data-your-score]');
const SELECTIONS = 
[
    {
        name: 'rock',
        emoji:'✊',
        beats: 'scissors'
    },
    {
        name:'paper',
        emoji:'✋',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji:'✌️',
        beats: 'paper'
    }
]

//Click event on buttons
selectionButtons.forEach(selectionButton => {selectionButton.addEventListener('click', e =>{
    const selectionName = selectionButton.dataset.selection
    const selection = SELECTIONS.find(selection => selection.name === selectionName)
    makeSelection(selection)
    })
})

//Function to get player choice
function makeSelection(selection)
{
    const computerSelection = randomSelection();
    const yourWinner = isWinner(selection, computerSelection);
    const computerWinner = isWinner(computerSelection, selection);
    
    addSelectionResult(computerSelection, computerWinner);
    addSelectionResult(selection, yourWinner);
    if (yourWinner) incrementScore(yourScoreSpan);
    if (computerWinner) incrementScore(computerScoreSpan);
}

//Function to get random computer choice
function randomSelection()
{
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}

//Determine a winner
function isWinner(selection, opponentSelection)
{
    return selection.beats === opponentSelection.name
}

//Result history
function addSelectionResult(selection, winner)
{
    const div = document.createElement('div');
    div.innerText = selection.emoji;
    div.classList.add('results-selection')
    if (winner) div.classList.add('winner')
    finalColumn.after(div)
}

//Increment the score
function incrementScore(scoreSpan)
{
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}