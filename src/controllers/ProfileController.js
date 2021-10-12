const Profile = require('../model/Profile')


module.exports = {
    index(req, res) {
        return res.render("profile", {
            profile: Profile.get()
        })
    },

    update(req, res) {

        const data = req.body

        const weeksPerYear = 52
        const weekPerMoth = (weeksPerYear - data["vacation-per-year"]) / 12
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        const mothlyTotalHours = weekTotalHours * weekPerMoth
        const valueHour = data["monthly-budget"] / mothlyTotalHours

        Profile.update({
            ...Profile.get(),
            ...req.body,
            "value-hour": valueHour
        })

        return res.redirect("/profile")
    }
}