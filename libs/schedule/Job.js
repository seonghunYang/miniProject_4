const schedule = require('node-schedule');

class Job {

    constructor() {
        this.rule = new schedule.RecurrenceRule();
        this.job;
    	this.callback;
	}

    setRule(hour, minute){
        this.rule.hour = hour;
        this.rule.minute = minute;
    }
	
	setCallback(callback){
		this.callback = callback;
	}

    reschedule(hour, minute){
        this.setRule(hour, minute);
        this.job.reschedule(this.rule);
    }

    changeJob(callback){
        this.job.cancel();
        this.job = schedule.scheduleJob(this.rule, callback);
    }
	
	start(){
		this.job = schedule.scheduleJob(this.rule, this.callback);
	}

    cancel(){
        this.job.cancel();
    }
}

module.exports = Job;