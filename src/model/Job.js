let data = [
    {
        id: 1,
        name: "Pizzaria Gulosa",
        "daily-hours": 2,
        "total-hours": 1,
        created_at: Date.now()
    },
    {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 3,
        "total-hours": 47,
        created_at: Date.now()
    }]

module.exports = {
    get() {
        return data
    },
    update(jobsUpdated) {
        data = jobsUpdated
    },
    delete(Id) {
        data = data.filter(x => Number(x.id) !== Number(Id))
    }
}