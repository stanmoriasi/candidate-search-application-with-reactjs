// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    id: number;
    name: string;
    email: string;
    phone: string;
    location: string;
    skills: string[];
    experience: number;
    education: string;
    resume: string;
}

export default Candidate;