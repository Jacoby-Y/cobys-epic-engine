
type Jobs = {
    all_jobs: Job[]

    add(time: number, callback: JobCallback): void
    runJobs(delta_time: number): void
}

type Job = {
    wait_time: number
    callback: JobCallback
}

type JobCallback = ()=> (void | number);

const jobs: Jobs = {
    all_jobs: [],

    /** Add a job to the stack */
    add(wait_time, callback) {
        this.all_jobs.push({
            wait_time,
            callback,
        });
    },
    /** Check through all jobs and run those that need to be run */
    runJobs(delta_time) {
        for (let i = this.all_jobs.length - 1; i >= 0; i--) {
            const job = this.all_jobs[i];

            job.wait_time -= delta_time;

            if (job.wait_time <= 0) {
                const res = job.callback();

                if (typeof res == "number") job.wait_time = res;
                else this.all_jobs.splice(i, 1);
            }
        }
    },
}

export default jobs;
