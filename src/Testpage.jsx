export default function TestPage() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    return (
        <div>
            <h1>Welcome, {userDetails.firstName} {userDetails.lastName}</h1>
            <p>Email: {userDetails.email}</p>
        </div>
    );
}
