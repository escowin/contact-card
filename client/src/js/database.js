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

// - read | get contacts from the database
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

// - post | a contact to the database w/ specified paramter values
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

// - delete | a contact from the database by its id
export const deleteDb = async (id) => {
  console.log('contact to be deleted', id);

  // connection to the contact_db database version 1
  const contactDb = await openDB('contact_db', 1);
  // transaction with specified store & data privileges (readme | getting privileges)
  const tx = contactDb.transaction('contacts', 'readwrite');
  // specified object store
  const store = tx.objectStore('contacts');
  // delete request
  const request = store.delete(id);

  // request result
  const result = await request;
  console.log('delete | removed contact from database', result);
  return result?.value;
}