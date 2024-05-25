import JobCard from "@/components/shared/JobCard";

function JobSection() {

    const job = {
     _id: "xyz",
     title: "intern-Software Engineer",
     type: "Full-Time",
     location: "Remote"
    }

    return ( 
        <section className="py-8">
            <h2>Available Jobs</h2>
            <div className="mt-4 flex flex-col gap-y-8">
            <JobCard 
                title={job.title}
                type = {job.type}
                location = {job.location}
                _id = {job._id}
                isAdmin={false}
            />
            </div>
        </section>
     );
}

export default JobSection;