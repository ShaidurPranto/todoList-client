function Signup() {
    return (
        <div>
            <h1>Signup Page</h1>
            <form>
                <label>
                    Email:
                    <input type="text" name="email" />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <label>
                    Confirm Password:
                    <input type="password" name="confirmPassword" />
                </label>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}

export default Signup;