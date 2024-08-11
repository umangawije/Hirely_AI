import { Separator } from "@/components/ui/separator";
import { Briefcase, MapPin } from "lucide-react";
import JobApplicationCard from "./componenet/JobApplicationCard";
import { useEffect, useState } from "react";
import { JobDetails } from "@/types/job";
import { JobApplication } from "@/types/jobApplication";
import { useParams } from "react-router-dom";
import { getJobById } from "@/lib/services/api/jobs";
import { getJobApllicationsForJob } from "@/lib/services/api/jobApplications";


function JobPage() {
  const [job, setJob] = useState<JobDetails | null>(null);
  const [isJobLoading, setIsJobLoading] = useState(true);
  const [jobApplications, setJobApplications] = useState<Array<JobApplication>>(
    []
  );
  const [isJobApplicationsLoading, setIsjobApplicationsLoading] = 
    useState(true);
  const {id} = useParams();

  useEffect(() => {
    if(!id){
      return;
    }

    getJobById(id)
    .then((data) => {
      setJob(data as JobDetails);
      setIsJobLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setIsJobLoading(false);
    });

    getJobApllicationsForJob(id)
    .then((data) => {
      setJobApplications(data);
      setIsjobApplicationsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setIsjobApplicationsLoading(false);
    });
  },[id]);

  if(isJobLoading || isJobApplicationsLoading){
    return null;
  }
  

  return (
    <div>
      <div>
        <h2>{job?.title}</h2>
        <div className="flex items-center gap-x-4 mt-4">
          <div className="flex items-center gap-x-2">
            <Briefcase />
            <span>{job?.type}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPin />
            <span>{job?.location}</span>
          </div>
        </div>
        {/* <div className="gap-x-4 flex items-center mt-4">
          <Badge>NodeJS</Badge>
          <Badge>ReactJS</Badge>
          <Badge>AWS</Badge>
        </div> */}
      </div>
      <div className="mt-4 py-4">
        <p>{job?.description}</p>
      </div>
      <Separator />
      <div className="py-8">
        <h2>Job Applications</h2>
        <div className="mt-4 flex flex-col gap-y-4">
          {jobApplications.map((application) => (
            <JobApplicationCard
              key={application._id}
              fullName={application.fullName}
              _id={application._id}
              jobId={id!}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobPage;
