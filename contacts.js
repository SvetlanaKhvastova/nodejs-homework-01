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
    const contact = data.find((el) => {
      // variant 1
      // return el.id == contactId;

      // variant 2
      return String(el.id) === String(contactId);
    });

    console.table(contact);
  });
}

function removeContact(contactId) {
  let data;

  fs.readFile(contactsPath, (err, content) => {
    if (err) {
      throw err;
    }

    data = JSON.parse(content);

    const contactFilter = data.filter(
      (el) => String(el.id) !== String(contactId)
    );

    const contacts = JSON.stringify(contactFilter);

    fs.writeFile(contactsPath, contacts, (err) => {
      if (err) {
        throw err;
      }
      console.table(JSON.parse(contacts));
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
