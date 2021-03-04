# Blockchain approach in typescript

This is a simple blockchain implementation written in typescript. I am not an expert in blockchain technology, therefore everything you see here could be poorly implemented or not safe for production environments.

My motivation 💪 for writing this code is to learn about this technology and its different ways of implementing it in other products.

## Testing on local json database

By default this code uses a local repository based on json objects. If you want to store data in the blockchain run this:

```bash
yarn start -m "Your message to store"

# Using NPM
npm start -m "Your message to store"
```

The blockchain will be stored in __./database/blockchain.json__

## Testing on CouchDB database

If you want to test on a CouchDB database, yo have to provide the database settings in the __.env__ file:

### **`REPOSITORY`**
This variable needs to be **couchdb** in order to use this database repository

### **`COUCH_DB_HOST`**
This is mandatory. Host address or IP of the database server

### **`COUCH_DB_PROTOCOL`**
This is mandatory. Only allowed **http** or **https**

### **`COUCH_DB_PORT`**
This is mandatory. Database listening port

### **`COUCH_DB_USER`**
This is optional. Only required if authentication is enabled

### **`COUCH_DB_PASS`**
This is optional. Only required if authentication is enabled

### **`COUCH_DB_DATABASE`**
This is mandatory. The name of the database. If not exists in the server, it will be created.

### ⚠ Use this code at your own risk. ⚠
