require('dotenv').config();
module.exports = {
    // "development": {
    //     "username": process.env.DB_USERNAME || 'postgres',
    //     "password": process.env.DB_PASSWORD || 'root',
    //     "database": process.env.DB_NAME || "user_service_development",
    //     "host": process.env.DB_HOST || "127.0.0.1",
    //     "dialect": process.env.DB_DRIVER || 'postgres',
    //     "logging": false

    "development": {
        "username": process.env.DB_USERNAME || 'mmrt',
        "password": process.env.DB_PASSWORD || 'CW5_Mul2Gx6RPu9BJzsszQ',
        "database": process.env.DB_NAME || "test",
        "host": process.env.DB_HOST || "superb-bear-5556.7tc.cockroachlabs.cloud",
        "dialect": process.env.DB_DRIVER || 'postgresql',
        "port": process.env.DB_PORT || '26257',
        "logging": false,

        "dialectOptions": {
            "ssl": {
                require: true,
                rejectUnauthorized: false
            }
         },
        
        
    },
    "test": {
        "username": process.env.DB_USERNAME || 'postgres',
        "password": process.env.DB_PASSWORD || '',
        "database": process.env.DB_NAME || "user_service_test",
        "host": process.env.DB_HOST || "127.0.0.1",
        "dialect": process.env.DB_DRIVER || 'postgres',
        "logging": false
    },
    "production": {
        "username": process.env.DB_USERNAME || 'postgres',
        "password": process.env.DB_PASSWORD || '',
        "database": process.env.DB_NAME || "user_service_production",
        "host": process.env.DB_HOST || "127.0.0.1",
        "dialect": process.env.DB_DRIVER || 'postgres',
        "logging": false

    }
};
