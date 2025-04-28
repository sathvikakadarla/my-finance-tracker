// src/global.d.ts
declare global {
    namespace NodeJS {
      interface Global {
        _mongoClientPromise?: Promise<any>; // Declaring _mongoClientPromise as a property of type Promise<any>
      }
    }
  }
  
  export {}; // To ensure this is treated as a module
  