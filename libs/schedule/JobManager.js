const Job = require('./Job');

class JobManager {

    constructor() {
        this.jobs = {};
    }

    addJob = (userId, hour, minute, callback) => {
        this.jobs[userId] = new Job(hour, minute, callback);
    }

    rescheduleJob = (userId, hour, minute) => {
        this.jobs[userId].reschedule(hour, minute);
    }

    changeJob = (userId, callback) => {
        this.jobs[userId].changeJob(callback);
    }

    cancelJob = (userId) => {
        this.jobs[userId].cancel();
    }

}

module.exports = new JobManager();