const Database = require('../db/config')

// let data = [
//     {
//         id: 1,
//         name: "Pizzaria Gulosa",
//         "daily-hours": 2,
//         "total-hours": 1,
//         created_at: Date.now()
//     },
//     {
//         id: 2,
//         name: "OneTwo Project",
//         "daily-hours": 3,
//         "total-hours": 47,
//         created_at: Date.now()
//     }]

module.exports = {
    async get() {

        const db = await Database()

        const jobs = await db.all(`SELECT * FROM jobs`)

        await db.close()

        const data = jobs.map(job => (
            {
                id: job.id,
                name: job.name,
                "daily-hours": job.daily_hours,
                "total-hours": job.total_hours,
                created_at: job.created_at
            }
        ))

        return data
    },
    async update(jobsUpdated) {

        const db = await Database()

        await db.run(`
            UPDATE jobs SET
                name = "${jobsUpdated.name}",
                daily_hours = ${jobsUpdated['daily-hours']},
                total_hours = ${jobsUpdated['total-hours']}
            WHERE id = ${jobsUpdated.id}
        `)

        await db.close()
    },
    async delete(Id) {
        const db = await Database()
        await db.run(`DELETE FROM jobs WHERE id = ${Id}`)
        await db.close()
    },
    async create(newJob) {

        const db = await Database()

        await db.run(`
            INSERT INTO jobs(name, daily_hours, total_hours, created_at)
            VALUES  ("${newJob.name}", ${newJob['daily-hours']}, ${newJob['total-hours']}, ${newJob['created_at']});
        `)

        await db.close()
    }
}