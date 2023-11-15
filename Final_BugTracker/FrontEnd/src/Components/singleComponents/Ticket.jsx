import PropTypes from 'prop-types'

export default function Ticket({userTicks}) {
    return(
        <div className="post-container">
        {userTicks?.map((t, i) =>{ //? means that if the data id there display it, if not it wont show up.
          return(
      <div key={i} className="card" style={{width: '18rem;'}}>
        <h3>{t.title}</h3>
        <p>{t.description}</p>
      </div>
          )
    })}
    </div>
    )

}

Ticket.propTypes = {
    userTicks: PropTypes.string.isRequired,
  };