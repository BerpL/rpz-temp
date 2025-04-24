import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthService, AccountService, TicketService } from 'servicesV2';
import history from 'utils/history';
import classNames from 'classnames';
import logo from 'images/Logo AA.png';
import bannerImage from './bg.png';
import option1 from './02.jpg';
import option2 from './03.jpg';
import option3 from './04.jpg';
import './styles.css'

const saveFirstEntry = (ticketService) => {
  const currentDate = new Date();
  ticketService.addRecord({
    fechahoraingreso: currentDate.toJSON(),
    fechahorasalida: currentDate.toJSON(),
    tiempointerface: 0,
  });
}

const Login = () => {
  const [auth] = useState(new AuthService());
  const [account] = useState(new AccountService());
  const [ticketService] = useState(new TicketService());
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [errorOnSubmit, setErrorOnSubmit] = useState(false);

  const onSubmit = async data => {
    try {
      setLoading(true);

      await auth.signIn(data);

      saveFirstEntry(ticketService);

      await account.access();

      if (account.allowInterfaceView()) {
        history.push('/');
      } else {
        history.push(account.firstAdminRoute());
      }
    } catch (error) {
      setErrorOnSubmit(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClassesUsername = classNames('input input-q', {
    'is-danger': errors.username && errors.username.type === 'required',
  });

  const inputClassesPassword = classNames('input input-q', {
    'is-danger': errors.password && errors.password.type === 'required',
  });

  const messageClassesUsername = classNames('help', 'is-danger', {
    'is-hidden': !(errors.username && errors.username.type === 'required'),
  });

  const messageClassesPassword = classNames('help', 'is-danger', {
    'is-hidden': !(errors.password && errors.password.type === 'required'),
  });

  const errorClassesMessage = classNames('help', 'is-danger', {
    'is-hidden': !errorOnSubmit,
  });

  const buttonClassesSubmit = classNames(
    'button',
    'is-white',
    'is-medium',
    'is-fullwidth',
    {
      'is-loading': isLoading,
    },
  );

  return (
    <div className="layout-default">
      <section
        className="hero is-fullheight is-medium is-bold background-q"
        style={{ background: `url(${option2})`, width: '100vw',
        height: '100vh',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat', }}
      >
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-half">
                <article className="card is-rounded">
                  <div
                    className="card-content is-flex is-column"
                    style={{ flexDirection: 'column' }}
                  >
                    <img
                      src={logo}
                      alt="Logo"
                      width="150"
                      style={{ margin: '10px auto' }}
                    />
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="field">
                        <label className="label" htmlFor="username">
                          Username
                        </label>
                        <div className="control has-icons-left is-danger">
                          <input
                            type="text"
                            style={{ outlineColor: "#009640" }}
                            className={inputClassesUsername}
                            autoComplete="off"
                            name="username"
                            id="username"
                            ref={register({ required: true })}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-user" />
                          </span>

                          <p className={messageClassesUsername}>
                            Username is required
                          </p>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label" htmlFor="password">
                          Password
                        </label>
                        <div className="control has-icons-left ">
                          <input
                            className={inputClassesPassword}
                            type="password"
                            name="password"
                            id="password"
                            ref={register({ required: true })}
                          />
                          <span className="icon is-small is-left is-danger">
                            <i className="fas fa-lock" />
                          </span>
                        </div>

                        <p className={messageClassesPassword}>
                          Password is required
                        </p>
                      </div>

                      <p className="control">
                        <button type="submit" style={{ background: "#009640", color: "#fff" }} className={buttonClassesSubmit}>
                          <span>Login</span>
                        </button>
                      </p>
                    </form>
                    <p className={errorClassesMessage}>
                      Incorrect username or password
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
