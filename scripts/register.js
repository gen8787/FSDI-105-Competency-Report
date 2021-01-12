// S A L O N   I N F O
var salon = {
    name: "The Fashion Pet",
    address: {
        street: "845 Las Vegas Blvd",
        city: "Las Vegas",
        state: "NV",
        zip: "89119"
    },
    hours: {
        open: "9:00 AM",
        close: "5:00 PM"
    },
    nextPetId: 7,
    pets: [],
    prices: {
        wash: 25,
        groom: 30,
        fullService: 50
    }
}


// D E S T R U C T U R E
var { name, address: { street, city, state, zip }, hours: { open, close }, nextPetId, pets, prices: { wash, groom, fullService } } = salon;


// C R E A T E   P E T S
function createPets() {
    var scooby = new Pet(1, "Scooby", 50, "Male", "Dog", "Dane", "Full Service", "Shaggy", "555-555-1212", "email@email.com", 50);
    pets.push(scooby);

    var honey = new Pet(2, "Honey", 3, "Female", "Dog", "Boxer", "Wash", "Mom", "777-333-5432", "email@email.com", 25);
    pets.push(honey);

    var yogi = new Pet(3, "Yogi", 10, "Male", "Dog", "Mutt", "Groom", "Eddie", "999-867-5309", "email@email.com", 30);
    pets.push(yogi);

    var zoe = new Pet(4, "Zoe", 7, "Female", "Cat", "Meow", "Full Service", "Carrie", "999-867-5309", "email@email.com", 50);
    pets.push(zoe);

    var garfield = new Pet(5, "Garfield", 17, "Male", "Cat", "Meow", "Groom", "Eddie", "999-867-5309", "email@email.com", 30);
    pets.push(garfield);

    var smokey = new Pet(6, "Smokey", 10, "Male", "Dog", "Collie", "Wash", "Eddie", "999-867-5309", "email@email.com", 25);
    pets.push(smokey);
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// R E G I S T E R   A   P E T
function register() {
    var petId = nextPetId;
    var inputName = document.getElementById("petName").value;
    var inputAge = document.getElementById("petAge").value;
    var inputGender = document.getElementById("petGender").value;
    var inputType = document.getElementById("petType").value;
    var inputBreed = document.getElementById("petBreed").value;
    var inputService = document.getElementById("petService").value;
    var inputOwner = document.getElementById("petOwner").value;
    var inputPhone = document.getElementById("petPhone").value;
    var inputEmail = document.getElementById("petEmail").value;

    var price;
    if (inputService === "Wash") {
        price = salon.prices.wash;
    } else if (inputService === "Groom") {
        price = salon.prices.groom;
    } else if (inputService === "Full Service") {
        price = salon.prices.fullService;
    }

    var newPet = new Pet(petId, inputName, inputAge, inputGender, inputType, inputBreed, inputService, inputOwner, inputPhone, inputEmail, price);

    pets.push(newPet);
    nextPetId ++;

    $(".form-control").val("");
    $(".form-select").val("");

    totalNumPets();
    oldestPet();
    youngestPet();
    totalPrice();
    petsByType();
    displayPets();
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// #   O F   P E T S   R E G I S T E R E D
function totalNumPets() {
    var totalNumPets = pets.length;
    document.getElementById("number-pets").innerHTML = `
    <p>
        Total Pets Registered: <b>${totalNumPets}</b>
    </p>`;
}


// O L D E S T
function oldestPet() {
    var oldestPet = Math.max(...pets.map(age => age.age));
    document.getElementById("oldest-pet").innerHTML = `
    <p>
    Oldest Pet: <b>${oldestPet}</b>
    </p>`;
}


// Y O U N G E S T
function youngestPet() {
    var youngestPet = Math.min(...pets.map(age => age.age));
    document.getElementById("youngest-pet").innerHTML = `
    <p>
    Youngest Pet: <b>${youngestPet}</b>
    </p>`;
}


// T O T A L   P R I C E
function totalPrice() {
    var totalPrice = 0;
    for (var i = 0; i < pets.length; i++) {
        totalPrice += pets[i].price;
    }

    document.getElementById("total-price").innerHTML = `
    <p>
    Total Cost: <b>$${totalPrice}.00
    </p>`;
}


// P E T S   B Y   T Y P E
function petsByType() {
    let dogs = 0, cats = 0;

    for (var i = 0; i < pets.length; i ++) {
        switch(pets[i].anType) {
            case "Dog" :
                dogs ++;
                break;
            case "Cat" :
                cats ++;
                break;
        }
    }

    document.getElementById("dog-count").innerHTML=`<b>${dogs}</b>`;
    document.getElementById("cat-count").innerHTML=`<b>${cats}</b>`;
}


// S E A R C H   F O R   P E T
function searchPet() {
    var searchText = document.getElementById("search-text").value

    document.getElementById("pets").innerHTML="";

    for (var i = 0; i < pets.length; i ++) {
        var pet = pets[i];

        if (
            pet.name.toLowerCase().includes(searchText.toLowerCase()) ||
            pet.owner.toLowerCase().includes(searchText.toLowerCase()) ||
            pet.phone.includes(searchText)
        
        ) {
            displayPet(pet);
        }
    }
}


// S E A R C H   B Y   T Y P E
function searchByType(anType) {
    document.getElementById("pets").innerHTML="";

    for (var i = 0; i < pets.length; i ++) {
        var pet = pets[i];

        if (pet.anType === anType) {
            displayPet(pet);
        }
    }
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// D I S P L A Y   P E T
function displayPet(pet) {
        var icon = '';
        if (pet.anType === "Dog") {
            icon = '<i class="fas fa-dog"></i>';
        }
        if (pet.anType === "Cat") {
            icon = '<i class="fas fa-cat"></i>';
        }

        var card = `
            <div id="" class="card shadow m-3" style="width: 15rem;">
                <div class-"card-body">
                    <h5 class="card-title text-center py-3">
                        ${pet.name}
                    </h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><b>Service:</b> ${pet.service}</li>
                        <li class="list-group-item"><b>Price:</b> $${pet.price}.00</li>
                        <li class="list-group-item"><b>Owner:</b> ${pet.owner}</li>
                        <li class="list-group-item"><b>Phone:</b> ${pet.phone}</li>
                        <li class="list-group-item">${icon}</li>
                        <button class="my-2 mx-5 btn btn-sm btn-outline-danger" onclick="deletePet(${pet.petId})">Remove Pet</button>
                    </ul>
                    </div>
            </div>
        `

        var newCard = document.createElement("div");
        newCard.innerHTML = card;
        document.getElementById("pets").appendChild(newCard);
}


// D I S P L A Y   P E T S
function displayPets() {
    document.getElementById("pets").innerHTML = "";
    document.getElementById("search-text").value="";

    for (var i = 0; i < pets.length; i++) {
        displayPet(pets[i]);
    }
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// D E L E T E   P E T
function deletePet(petId) {
    for (var i = 0; i < pets.length; i ++) {
        var deletePet = pets[i];

        if (deletePet.petId === petId) {
            pets.splice(i, 1);
        }
    }

    displayPets();

    totalNumPets();
    oldestPet();
    youngestPet();
    totalPrice();
    petsByType();
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// F O O T E R   I N F O
function displayOfficeInfo() {
    document.getElementById('footer-info').innerHTML = `
        <p>
            Hours: <br>
            ${open} - ${close}, Monday to Friday <br>
            <br>
            Address: <br>
            ${street} <br>
            ${city} ${state}, ${zip}
        </p>`;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// I N I T
function init() {
    console.log("Document Ready");

    createPets();
    totalNumPets();
    oldestPet();
    youngestPet();
    totalPrice();
    petsByType();
    displayPets();
    displayOfficeInfo();
}

window.onload = init;