const Database = require('./config')

const initdb = {
    async init() {
        const bd = await Database()

        await bd.exec(`
        CREATE TABLE profile(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT
        )
    `)

        await bd.exec(`
        CREATE TABLE jobs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )
    `)

        await bd.run(`
        INSERT INTO profile(name, avatar, monthly_budget, days_per_week, hours_per_day, vacation_per_year, value_hour)
        VALUES ("Pablo Vicente","https://github.com/pablo-vicente.png", 3000, 5, 5, 4, 75);
    `)

        await bd.run(`
        INSERT INTO jobs(name, daily_hours, total_hours, created_at)
        VALUES  ("Pizzaria Gulosa", 2, 1, 1617514376018),
                ("OneTwo Project", 3, 47, 1617514376018);
    `)

        await bd.close()
    }
}


initdb.init()