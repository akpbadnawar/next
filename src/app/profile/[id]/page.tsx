export default function UserProfile({params}:any) {
    
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="py-4 text-5xl">Profile</h1>
            <hr/>
            <p className="text-3xl" >Profile Page
                <span className="p-2 ml-2 rounded bg-orange-500" >{params.id}</span>
            </p>
        </div>
    )
}