import { openDB } from "idb";
import { async } from "regenerator-runtime";
import "regenerator-runtime/runtime";

// async crud
// - creates the contact_db database in indexDB
export const initdb = async () => {
  // creates a new database named 'contact_db' which will be using version 1 of the database.
  openDB("contact_db", 1, {
    // Adds database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains("contacts")) {
        console.log("contacts store already exists");
        return;
      }
      // Creates a new object store for the data and give it a key name of 'id' which will increment automatically
      db.createObjectStore("contacts", { keyPath: "id", autoIncrement: true });
      console.log("contacts store created");
    },
  });
};

// - read | get contact_db database
export const getDb = async () => {
  // console.log('GET database');
  // indexDB database connection with specified version
  const contactDb = await openDB("contact_db", 1);
  // transaction with specified store & data privileges (readme | getting privileges)
  const tx = contactDb.transaction("contacts", "readonly");
  // specified object store to be opened up
  const store = tx.objectStore("contacts");
  // get request object to get all the specified data above from the database
  const request = store.getAll();
  // request result
  const result = await request;

  console.log("get | contacts from indexb database", result);
  return result;
};

// - post
export const postDb = async (name, email, phone, profile) => {
  const contactDb = await openDB("contact_db", 1);
  // readwrite | posting privileges
  const tx = contactDb.transaction("contacts", "readwrite");
  const store = tx.objectStore("contacts");
  // post request object w/ specified key values
  const request = store.add({
    name: name,
    email: email,
    phone: phone,
    profile: profile,
  });
  const result = await request;

  console.log("post | saved contact to indexdb database", result);
};
