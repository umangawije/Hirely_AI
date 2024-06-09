import { Briefcase, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Job } from "@/types/job";
import { useUser } from "@clerk/clerk-react";

function JobPage() {
    const [job, setJob] = useState<Job | null>(null);
    const [isLoading, setIsLoading ] = useState(true);

    const user = useUser();
    console.log(user);

    const {id} = useParams();
    console.log(id);

    const [formData, setFormData] = useState({
        fullName:"",
        a1: "",
        a2: "",
        a3: "",
    });

    useEffect(()=>{
        const fetchJob = async() => {
            const res = await fetch(`http://localhost:8000/jobs/${id}`,{
                method: "GET",
            });
            const data:Job = await res.json();
            return data;
        }

        fetchJob().then((data) => {
            setJob(data);
            setIsLoading(false);
        });
    }, [id]);


    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>{
        setFormData({...formData, [event.target.name]:event.target.value});

    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        console.log(formData)

        const res = await fetch("http://localhost:8000/jobApplications",{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: user.user?.id,
                fullName: formData.fullName,
                job: id,
                answers: [formData.a1,formData.a2,formData.a3],
            })
        });
        console.log(res);
    };

    if (isLoading || job === null){
        return(
            <div>
                <h2>Loading....</h2>
            </div>
        );
    }

    return (
        <div>
            <div>
                <h2>{job?.title}</h2>
                <div className="flex items-center gap-x-4 mt-4">
                    <div className="flex items-center gap-x-2">
                        <Briefcase/>
                        <span>{job?.type}</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <MapPin/>
                        <span>{job?.location}</span>
                    </div>
                </div>
            </div>
            <div className="mt-4 py-4">
                <p>{job?.description}</p>
            </div>
            <Separator/>
            <form className="py-8" onSubmit={handleSubmit}>
                <div>
                    <h3>Full Name</h3>
                    <Input
                        className = "mt-2"
                        name = "fullName"
                        value = {formData.fullName}
                        onChange = {handleChange}
                        required
                    />
                </div>

                {job?.questions.map((question,i)=>{
                    return(
                        <div key={i} className="mt-4">
                            <h3>{question}</h3>
                            <Textarea
                                className="mt-2"
                                name={`a${i+1}`}
                                /*value={
                                    formData[
                                        `a${i+1}` as keyof omit<typeof formData, "fullName">
                                    ]
                                }*/
                                onChange={handleChange}
                                required
                            />
                        </div>
                    );
                })}
                <Button type="submit" className="mt-8 bg-card text-card-foreground">Submit</Button>
            </form>
        </div>
      );
}

export default JobPage;