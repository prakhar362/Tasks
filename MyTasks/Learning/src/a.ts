function greet(a: number, b: number): number {
    return a + b;
  }
  
  function islegal(age: number): boolean {
    if (age >= 18) {
      return true;
    } else {
      return false;
    }
  }
  
  function takes(islegal: boolean): boolean {
    if (islegal) {
      return true;
    } else {
      return false;
    }
  }
  
  const greeting = (name: string) => `Hello, ${name}!`;
  
  interface User {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
  }
  
  function isLegal(user: User): boolean {
    if (user.age > 18) {
      return true;
    } else {
      return false;
    }
  }
  
  console.log(greet(2, 3)); // Output: 5
  console.log(islegal(18)); // Output: true
  console.log(takes(islegal(13))); // Output: false
  
  // Test cases
  const user1: User = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    age: 20,
  };
  
  // Test the function and log results
  console.log(`${user1.firstName} ${user1.lastName} is legal: ${isLegal(user1)}`);

  interface UserModel {
	firstName: string;
	lastName: string;
	age: number;
}

function filteredUsers(users: UserModel[]) {
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
}, ]));
  