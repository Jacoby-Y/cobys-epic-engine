const jobs = {
    all_jobs: [],
    /** Add a job to the stack */
    add(time, callback) {
        this.all_jobs.push({
            call_time: performance.now() + time,
            callback
        });
    },
    /** Check through all jobs and run those that need to be run */
    runJobs(delta_time) {
        for (let i = this.all_jobs.length - 1; i >= 0; i--) {
            const job = this.all_jobs[i];
            job.call_time -= delta_time;
            if (job.call_time <= 0) {
                const res = job.callback();
                if (typeof res == "number")
                    job.call_time = res;
                else
                    this.all_jobs.splice(i, 1);
            }
        }
    },
};
export default jobs;
