const person = {
  name: 'Thomas',
  age: 30,
  location: {
    city: 'York',
    temp: 31
  }
};

console.log(`${person.name} is ${person.age}.`);

// const name = person.name;
// const age = person.age;
const { name, age } = person;

console.log(`${name} is ${age}.`);

//-----------------------------------------------------------------//

const { nameTwo = 'Anonymous', age: ageTwo = '5' } = person;

console.log(`${nameTwo} is ${ageTwo}.`);

//-----------------------------------------------------------------//
//-----------------------------------------------------------------//

console.log(`It's ${person.location.temp} in ${person.location.city}.`)

// const temp = person.location.temp;
// const city = person.location.city;
const { city, temp } = person.location;

console.log(`It's ${temp} in ${city}.`)

//-----------------------------------------------------------------//

const { temp: temperature, city: cityLocation } = person.location;

console.log(`It's ${temperature} in ${cityLocation}.`)

//-----------------------------------------------------------------//

const book = {
  title: 'Ego is the enemy',
  author: 'Ryan Holiday',
  publisher: {
    name: 'Penguin'
  }
};

const { name: publisherName = 'Self-Published' } = book.publisher;

console.log(publisherName); // Penguin, Self-Published

//-----------------------------------------------------------------//


const address = ['Finkle Street', 'York', 'North Yorkshire', 'YO15JP'];

console.log(`You are in ${address[1]} ${address[2]}.`);

// const [street, cityA, county, postcode] = address;
const [, cityA, county] = address;

const [, , countyAnon = 'New York'] = address;

console.log(`You are in ${cityA} ${county}.`);

console.log(`You are in ${cityA} ${countyAnon}.`);

//-----------------------------------------------------------------//
//----------------------------Challenge----------------------------//

const item = ['Coffee (hot)', '£2.00', '£2.50', '£2.75'];

const [drink, , medium] = item;

console.log(`A medium ${drink} costs ${medium}.`);
console.log(`A medium Coffee (hot) costs $2.50.`);