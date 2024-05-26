import { Briefcase, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

function JobPage() {

    const job = {
        title: "Intern-Software Engineer",
        type: "Full-Time",
        location: "Remote",
        description:"we are seeking a motivated and enthus ",
        questions: [
            "share your academic details ?",
            "Describe your professional development?",
            "Discuss notable projects in your programmin experience. what challenges face"
        ],
    };

    const {id} = useParams();

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
            <form className="py-8">
                <div>
                    <h3>Full Name</h3>
                    <Input
                        className = "mt-2"
                        name = "fullName"
                        //value = {formData.fullName}
                        //onChange = {handleChange}
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
                                }
                                onChange={handleChange}*/
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