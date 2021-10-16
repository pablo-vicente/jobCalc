const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    create(req, res) {
        return res.render("job")
    },
    async save(req, res) {

        await Job.create({
            name: req.body.name,
            avatar: req.body.avatar,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now() // Atribuindo data hoje
        })

        return res.redirect("/")
    },
    async show(req, res) {

        const jobId = req.params.id
        const jobs = await Job.get()
        const profile = await Profile.get()
        const job = jobs.find(x => Number(x.id) === Number(jobId))
        if (!job)
            return res.send("Job not foud!")

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", { job })
    },
    async update(req, res) {
        const jobId = req.params.id

        const updatedJob = {
            id: jobId,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body['daily-hours'],
        }
        await Job.update(updatedJob)

        return res.redirect("/job/" + jobId)
    },
    async delete(req, res) {
        const jobId = req.params.id
        await Job.delete(jobId)

        return res.redirect("/")
    }
}