import React from "react";
import { useForm } from "react-hook-form";

const required = { required: true };
const displayCss = { display: 'block' };



function Auth(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => props.login(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)} class="form-inline needs-validation">
            <div class="input-group mb-2 mr-sm-2">
                <label class="visually-hidden" for="username">Username</label>
                <input {...register("username", required)} class="form-control" placeholder="Username" />
                {errors.username && <div style={displayCss} class="invalid-feedback">Set a username</div>}
            </div>
            <div class="input-group mb-2 mr-sm-2">
                <label class="visually-hidden" for="inlineFormPwd">Password</label>
                <input {...register("password", required)} type="password" class="form-control" id="inlineFormPwd" placeholder="Password" />
                {errors.password && <div style={displayCss} class="invalid-feedback">Set a password</div>}
            </div>

            <div class="input-group mb-2 mr-sm-2">
                <input type="submit" class="btn btn-primary" />
            </div>
        </form>
    )
}
export default Auth;