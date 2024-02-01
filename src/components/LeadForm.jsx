import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'

const required = { required: true };
const displayCss = { display: 'block' };
const server = 'http://95.111.230.5:5000/';
//const server = "http://127.0.0.1:5000/"
const apiUrl = `${server}api/lead`

function App() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const token = localStorage.getItem('tokenAwsCognito');
        const headers = { 'Authorization': token }
        try {
            const response = await axios.post(apiUrl, data, { headers });
            alert(`Lead created: ${JSON.stringify(response.data).status}`);
            reset();
        } catch (excetpion) {
            alert('not able to create the led')
            console.log(excetpion)
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" >
            <div className="form-row">
                <div className="col-md-4">
                    <label for="firstName" className="form-label">First name</label>
                    <input {...register("firstName", required)} class="form-control" defaultValue="Mark" />
                    <div class="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-4">
                    <label for="lastName" className="form-label">Last name</label>
                    <input {...register("lastName", required)} className="form-control" defaultValue="Otto" />
                    <div className="valid-feedback"> Looks good!</div>
                </div>
                <div className="col-md-4">
                    <label for="username" className="form-label">Username</label>
                    <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input {...register("username", required)} className="form-control" aria-describedby="inputGroupPrepend" />
                        {errors.username && <div style={displayCss} className="invalid-feedback">Please choose a username.</div>}
                    </div>
                </div>
                <div className="col-md-6">
                    <label for="city" className="form-label">City</label>
                    <input {...register("city", required)} className="form-control" />
                    {errors.city && <div style={displayCss} className="invalid-feedback"> Please provide a valid city.</div>}
                </div>
                <div className="col-md-3">
                    <label for="state" className="form-label">State</label>
                    <input {...register("state", required)} class="form-control" id="state" placeholder="State" />
                    {errors.state && <div style={displayCss} class="invalid-feedback"> Please select a valid state. </div>}
                </div>
                <div className="col-md-3">
                    <label for="zipCode" className="form-label">Zip</label>
                    <input {...register("zipCode", required)} className="form-control" />
                    {errors.zipCode && <div style={displayCss} className="invalid-feedback">Please provide a valid zip.</div>}
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input {...register("agree", required)} className="form-check-input" type="checkbox" defaultValue="" />
                        <label className="form-check-label" for="agree">Agree to terms and conditions</label>
                        {errors.agree && <div style={displayCss} className="invalid-feedback"> You must agree before submitting.</div>}
                    </div>
                </div>
            </div>

            <input className="btn btn-primary" type="submit" />

        </form>
    );
}
export default App;