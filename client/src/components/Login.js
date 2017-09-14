class Login extends React.Component {
  state = { email: '', password: '' }

  handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = this.state;
    axios.post('/auth/sign_in', { email, password })
      .then( res => {
        login(res.data.data.id, res.headers, this.props.loginUser)
      })
  }

  //REMOVE checkPasswords function
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Email"
            type="email"
            name="email"
            onChange={this.handleChange}
            required
          />
         <Form.Input
           label="Password"
           type="password"
           name="password"
           onChange={this.handleChange}
           required
         />
         <Form.Button>
           Submit
         </Form.Button>
       </Form>
     </div>
   )