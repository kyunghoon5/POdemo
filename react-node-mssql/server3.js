const sql = require("mssql");
let mssql = require('./mssql-pool-management.js')

let exampleDBConfigA = {
    user: 'test',
    password: 'password,
    server: 'SqlServerA', 
    database: 'DatabaseA'
};
let exampleDBConfigB = {
    user: 'test',
    password: 'password,
    server: 'SqlServerB', 
    database: 'DatabaseB'
};

...

// Request 1
try {
    let sqlPool = await mssql.GetCreateIfNotExistPool(exampleDBConfigA)
    let request = new sql.Request(sqlPool)

    // query code
}
catch(error) {
    //error handling
}

...

// Request 2
try {
    let sqlPool = await mssql.GetCreateIfNotExistPool(exampleDBConfigB)
    let request = new sql.Request(sqlPool)

    // query code
}
catch(error) {
    //error handling
}