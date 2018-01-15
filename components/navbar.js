import Button from '../components/button';
import ButtonLink from '../components/button-link';

export default function Navbar(props) {
  return (
    <div className='nav'>
        <div className="logo">
          <img className="mw-logo" src='../static/mentor-weekly-logo.svg' width="100%" alt="wocintech stock photo" />
        </div>
        <div className="right">
          { props.loggedin ? <ButtonLink linkTo={(props.user.role === "mentor") ? "/mentor-dashboard" : "/mentee-dashboard"} size="small" color="#303030" backgroundColor="white" text="dashboard" border="none" role={props.user.role} /> : null}
          {(props.loggedin && props.user.role === "mentor") ? <Button size="small" color="#303030" backgroundColor="white" text="pick a mentee" border="none" /> : null}
          { props.loggedin ? null : <Button size="small" color="#303030" backgroundColor="white" text="log in" onClick={props.onClick} border="none"/>}
          { props.loggedin ? <ButtonLink linkTo="/help" size="small" color="#303030" backgroundColor="white" text="help" border="none" /> : null }
          { props.loggedin ? <ButtonLink linkTo="/" size="small" color="Turquoise" backgroundColor="white" text="log out"/> : <ButtonLink linkTo="#signup" size="small" color="Turquoise" backgroundColor="white" text="sign up" /> }
        </div>

      <style jsx>{`
        .nav {
          background-color: white;
          border-bottom: 1px solid lightgray;
          height: 65px;
          font: "Helvetica Neue", "Segoe UI", Helvetica, sans-serif;
          position: relative;
          top: 0px;
          right: 0px;
          left: 0px;
        }
        .right{
          position: absolute;
          right:0;
          padding: 13px;
        }
        .logo{
          position: absolute;
          left: 30px;
          top: 15px;
        }
        .mw-logo{
          height: 40px;
        }
      `}</style>
    </div>
  );
}
