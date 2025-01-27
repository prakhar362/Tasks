"use strict";
function greet(a, b) {
    return a + b;
}
function islegal(age) {
    if (age >= 18) {
        return true;
    }
    else {
        return false;
    }
}
function takes(islegal) {
    if (islegal) {
        return true;
    }
    else {
        return false;
    }
}
const greeting = (name) => `Hello, ${name}!`;
function isLegal(user) {
    if (user.age > 18) {
        return true;
    }
    else {
        return false;
    }
}
console.log(greet(2, 3)); // Output: 5
console.log(islegal(18)); // Output: true
console.log(takes(islegal(13))); // Output: false
// Test cases
const user1 = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    age: 20,
};
// Test the function and log results
console.log(`${user1.firstName} ${user1.lastName} is legal: ${isLegal(user1)}`);
function filteredUsers(users) {
    return users.filter(x => x.age >= 18);
}
console.log(filteredUsers([{
        firstName: "harkirat",
        lastName: "Singh",
        age: 21
    }, {
        firstName: "Raman",
        lastName: "Singh",
        age: 16
    },]));
