const Person = ({name, age, hobbies}) => {
    let message = "";
    if (age > 18) {
        message = "Please go vote!";
    } else {
        message = "You must be 18."
    }

    if (name.length > 8) {
        name = name.substr(0,8);
    }

    return (
        <div>
            <p>Learn some information about this person</p>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Hobbies:</p>
            <ul>
                    {hobbies.map(h => (
                        <li key={h.id}>
                            {h.hobby}
                        </li>
                    ))}
            </ul>
            <h3>{message}</h3>
        </div>
    )
};