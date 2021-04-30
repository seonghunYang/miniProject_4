const schedule = require('node-schedule-tz');

class Job {

    constructor() {
        this.rule = new schedule.RecurrenceRule();
        this.job;
    	this.callback;
	}
	
	getHour(){
		return this.rule.hour;
	}
	
	getMinute(){
		return this.rule.minute;
	}

	setRule(hour, minute){
		this.rule.hour = hour;
		this.rule.minute = minute;
		this.rule.tz='Asia/Seoul';
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
		if(this.job !== undefined){
			return;
		}
		const rule = new schedule.RecurrenceRule();
		rule.hour = this.rule.hour-9;
		rule.minute = this.rule.minute;
		this.job = schedule.scheduleJob(rule, this.callback);
		console.log(this.job);
		console.log(rule);
	}

    cancel(){
        this.job.cancel();
    }
}

module.exports = Job;