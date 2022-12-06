import {Link} from "react-router-dom";

const ErrorLoading = ()=>{


        return(<>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">404</h1>
                    <p className="fs-3"> <span className="text-danger">Opps!</span> Something went Wrong.</p>
                    <p className="lead">
                        You Tried To Make an invalid request to the servers.<br />
                        Check Your Connection and Try Again.
                    </p>
                    <Link to="/" className="btn btn-primary">Go Home</Link>
                </div>
            </div>
        </>)
}
export default ErrorLoading;