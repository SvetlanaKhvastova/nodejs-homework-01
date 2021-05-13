const fs = require("fs");
const path = require("path");
const { v4: id } = require("uuid");

const IdContact = id();

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, content) => {
    if (err) {
      throw err;
    }

    console.table(JSON.parse(content));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, content) => {
    if (err) {
      throw err;
    }

    const data = JSON.parse(content);
    const contact = data.find((el) => el.id === contactId);

    console.table(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, content) => {
    if (err) {
      throw err;
    }

    const data = JSON.parse(content);
    data.filter((el) => {
      el.id !== contactId;
    });
    const contact = JSON.stringify(data);

    fs.writeFile(contactsPath, contact, (err) => {
      if (err) {
        throw err;
      }
      console.table(JSON.parse(contact));
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, content) => {
    if (err) {
      throw err;
    }

    const data = JSON.parse(content);
    data.push({ id: IdContact, name, email, phone });
    const contact = JSON.stringify(data);

    fs.writeFile(contactsPath, contact, (err) => {
      if (err) {
        throw err;
      }
      console.table(JSON.parse(contact));
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
