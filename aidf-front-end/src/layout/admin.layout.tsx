import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

function AdminMainLayout() {
    return ( 
        <div>
            <div className="flex justify-end gap-x-4 items-center py-4">
                <Link to="/admin/jobs">Job Post</Link>
                <Button className="bg-card" asChild>
                    <Link to="/admin/job/create">Post a Job</Link>
                </Button>
            </div>
            <Outlet/>
        </div>
     );
}

export default AdminMainLayout;
