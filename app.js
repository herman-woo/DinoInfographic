//let dinodata = require('./dino.json');
let dinodata = {
        "Dinos": [
            {
                "species": "Triceratops",
                "weight": 13000,
                "height": 114,
                "diet": "herbavor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "First discovered in 1889 by Othniel Charles Marsh"
            },
            {
                "species": "Tyrannosaurus Rex",
                "weight": 11905,
                "height": 144,
                "diet": "carnivor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "The largest known skull measures in at 5 feet long."
            },
            {
                "species": "Anklyosaurus",
                "weight": 10500,
                "height": 55,
                "diet": "herbavor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "Anklyosaurus survived for approximately 135 million years."
            },
            {
                "species": "Brachiosaurus",
                "weight": 70000,
                "height": 372,
                "diet": "herbavor",
                "where": "North America",
                "when": "Late Jurasic",
                "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
            },
            {
                "species": "Stegosaurus",
                "weight": 11600,
                "height": 79,
                "diet": "herbavor",
                "where": "North America, Europe, Asia",
                "when": "Late Jurasic to Early Cretaceous",
                "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
            },
            {
                "species": "Elasmosaurus",
                "weight": 16000,
                "height": 59,
                "diet": "carnivor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
            },
            {
                "species": "Pteranodon",
                "weight": 44,
                "height": 20,
                "diet": "carnivor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
            },
            {
                "species": "Pigeon",
                "weight": 0.5,
                "height": 9,
                "diet": "herbavor",
                "where": "World Wide",
                "when": "Holocene",
                "fact": "All birds are living dinosaurs."
            }
        ]
    }
    
// Creating the Dino constructor function
function Dino(spe,wgt,hgt,diet,where,when,fact){
    this.species = spe;
    this.weight = wgt;
    this.height = hgt;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
}

// Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    Dino.prototype.factOne = function(humanW){
        let fact = '';
        let diff = this.weight - humanW;
        if (diff > 0){
            fact = `The ${this.species} weighs ${Math.abs(diff)} pounds more than you.`
        }
        else if(diff < 0){
            fact = `The ${this.species} weighs ${Math.abs(diff)} pounds less than you.`
        }
        else{
            fact = `The ${this.species} weighs the same as you. Wow!!`
        }
        return fact;

    }
    
// Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Dino.prototype.factTwo = function(humanH){
        let fact = '';
        let diff = this.height - humanH;
        if (diff > 0){
            fact = `The ${this.species} is ${Math.abs(diff)} inches taller than you.`
        }
        else if(diff < 0){
            fact = `The ${this.species} is ${Math.abs(diff)} inches shorter than you.`
        }
        else{
            fact = `The ${this.species} is the same height as you!!`
        }
        return fact;
    }
// Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Dino.prototype.factThree = function(humanD){
        let fact = '';
        if (humanD.toLowerCase() === this.diet.toLowerCase()){
            fact = `The ${this.species} was also a ${this.diet}.`;
        }
        else {fact = `The ${this.species} was a ${this.diet}.`}
        return fact;
    }



    // Create Dino Objects
    let dinoObjects = dinodata.Dinos.map((dinoDataPoint) => {
            let dinoObject = new Dino(
                dinoDataPoint.species,
                dinoDataPoint.weight,
                dinoDataPoint.height,
                dinoDataPoint.diet,
                dinoDataPoint.where,
                dinoDataPoint.when,
                dinoDataPoint.fact
            )
            return dinoObject
        }
    )    
//creating a function that takes an array and returns an array with its values scrambled
    function randomizeArray(array){
        let oldArray = array;
        let newArray = [];
        let count = array.length
        while(count > 0){
            let randomObject = oldArray[Math.floor(Math.random()*oldArray.length)];
            newArray.push(randomObject);
            oldArray = oldArray.filter(item => item != randomObject);
            count--;
        }
        return newArray;
    }

    // Create Human Object
    // Use IIFE to get human data from form

    let getHumanData = () => {
        let human = {
            species: 'human'  
        }
        human.name = document.getElementById('name').value;
        human.weight = document.getElementById('weight').value;
        let feet = document.getElementById('feet').value;
        let inches = document.getElementById('inches').value;
        human.height = parseInt(feet*12) + parseInt(inches);
        human.diet = document.getElementById('diet').value;
        return human;
    };

//This function takes the randomized array, the human object and returns a combined array so that all tiles can be generated from 1 array

    let allObjects = function(){
        let dinos = randomizeArray(dinoObjects);
        let array = []
        for (let i = 0; i < 9; i++){
            if (i === 4){
                array[i] = getHumanData();
            }
            else if (i < 4){
                array[i] = dinos[i];
            }
            else if (i > 4){
                array[i] = dinos[i - 1];
            }
        }
        return array
    }
    function getFunction(){
        let n = Math.ceil(Math.random()*3);
        return n;
    }

// Generate Tiles for each Object in the given Array
function createTiles(parent, objects, compare){
    for (object of objects){
        let tile = document.createElement("div");
        tile.classList.add("grid-item");
            //generating info for dino
            //species = h3
            let species = document.createElement("h3");
            species.textContent = 
                (object.species === 'human' ? object.name : object.species);
            tile.appendChild(species);
            //picture = img
            let picture = document.createElement("img");
            picture.setAttribute("src", `./images/${object.species.toLowerCase()}.png`);
            tile.appendChild(picture);
            if (object.species != 'human' ){
                let fact = document.createElement('p');
                if (object.species === 'Pigeon' ){
                    fact.textContent = object.fact;
                }
                else {
                    if (compare === 1){ fact.textContent = object.factOne(objects[4].weight);}
                    else if(compare === 2){ fact.textContent = object.factTwo(objects[4].height);}
                    else { fact.textContent = object.factThree(objects[4].diet);}
                }
                tile.appendChild(fact);
            }
        parent.appendChild(tile);
    }
}

// Remove form from screen
function removeElement(element){
    element.remove();
}

// On button click, prepare and display infographic
function compareMe(){
    let form = document.getElementById('dino-compare');
    let grid = document.getElementById('grid');
    createTiles(grid, allObjects(), getFunction());
    removeElement(form);
}
