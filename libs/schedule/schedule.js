const schedule = require('node-schedule');

class Job {

    constructor(hour, minute, callback) {
        this.rule = new schedule.RecurrenceRule();
        this.setRule(hour, minute);
        this.job = schedule.scheduleJob(this.rule, callback);
    }

    setRule = (hour, minute) => {
        this.rule.hour = hour;
        this.rule.minute = minute;
    }

    reschedule = (hour, minute) => {
        this.setRule(hour, minute);
        this.job.reschedule(this.rule);
    }

    cancle = () => {
        this.job.cancel();
    }
}

module.exports = Job;