const Job = require('./Job');

class JobManager {

    constructor() {
        this.jobs = {};
    }
	
	getHour(userId){
		return this.jobs[userId].getHour();
	}
	
	getMinute(userId){
		return this.jobs[userId].getMinute();
	}

    createJob(userId){
        this.jobs[userId] = new Job();
    }
	
	startJob(userId){
		this.jobs[userId].start();
	}
	
	setJobRule(userId, hour, minute){
		this.jobs[userId].setRule(hour, minute);
	}
	
	setJobCallback(userId, callback){
		this.jobs[userId].setCallback(callback);
	}

    rescheduleJob(userId, hour, minute){
        this.jobs[userId].reschedule(hour, minute);
    }

    changeJob(userId, callback){
        this.jobs[userId].changeJob(callback);
    }

    cancelJob(userId){
        this.jobs[userId].cancel();
    }

}

module.exports = new JobManager();