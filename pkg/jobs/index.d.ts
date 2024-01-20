type Jobs = {
    all_jobs: Job[];
    add(time: number, callback: JobCallback): void;
    runJobs(delta_time: number): void;
};
type Job = {
    wait_time: number;
    callback: JobCallback;
};
type JobCallback = () => (void | number);
declare const jobs: Jobs;
export default jobs;
