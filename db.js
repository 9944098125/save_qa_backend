const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Srinivas@8",
  database: "save_qa",
});

module.exports = db;

// createConnection: This method creates a single connection to the
// MySQL database. It's suitable for applications that have low to
// moderate database traffic and do not
// require connection pooling.Each time you invoke createConnection,
// it establishes a
// new connection to the database.

// createPool: This method creates a pool of connections to the
// MySQL database.Connection pooling helps manage and reuse
// database connections, which can improve performance in
// high - traffic applications.With connection pooling, instead
// of creating a new connection each time, you acquire an
// existing connection from the pool.When you're done with
// the connection, you release it back to the pool for reuse.
// The createPool method allows you to configure the pool size,
// connection timeouts, and other related settings.

// createPoolCluster: This method is used when you have mul
// MySQL database servers and want to distribute the workload
// across them.It creates a cluster of connection pools, where each
// pool represents a separate database server.The pool cluster
// can automatically route queries to the appropriate server
// based on predefined rules, such as round - robin or
// least - connections.It provides high availability and load
// balancing capabilities for your application.

// createServer: This method is not specifically related
//  to connecting to a MySQL database.Instead, it is used to
// create a TCP / IP server that listens for incoming connections.
// You can use this method to create a server that handles
// database - related requests, such as querying the database
// and sending the results back to clients.It's important to note
// that createServer does not establish a direct connection to the
// MySQL database but rather provides the server infrastructure
// for handling client connections.
