# Blockchain approach in typescript

[![CodeFactor](https://www.codefactor.io/repository/github/d4nicoder/blockchain-ts/badge)](https://www.codefactor.io/repository/github/d4nicoder/blockchain-ts) [![Build](https://github.com/d4nicoder/blockchain-ts/actions/workflows/build.js.yml/badge.svg)](https://github.com/d4nicoder/blockchain-ts/actions/workflows/build.js.yml) [![Unit tests](https://github.com/d4nicoder/blockchain-ts/actions/workflows/test.js.yml/badge.svg)](https://github.com/d4nicoder/blockchain-ts/actions/workflows/test.js.yml)

This is a simple blockchain implementation written in typescript. I am not an expert in blockchain technology, therefore everything you see here could be poorly implemented or not safe for production environments.

My motivation 💪 for writing this code is to learn about this technology and its different ways of implementing it in other products.

## Testing on local json database

By default this code uses a local repository based on json objects. If you want to store data in the blockchain run this:

```bash
yarn start -m "Your message to store"

# Using NPM
npm start -m "Your message to store"
```

The blockchain will be stored in **./database/blockchain.json**

## Testing on CouchDB database

If you want to test on a CouchDB database, yo have to provide the database settings in the **.env** file:

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

You can run a CouchDB server using docker-compose

```bash
docker-compose up -d
```

Feel free to modify **docker-compose.yaml** to match your preferences.

## License

View LICENSE file for the software contained in this image.

As with all npm packages, these likely also contain other software which may be under other licenses (such as crypto-js, jest, etc from the base distribution, along with any direct or indirect dependencies of the primary software being contained).

It is the user's responsibility to ensure that any use of this package complies with any relevant licenses for all software contained within.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
